
function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskMonthInput = document.getElementById('taskMonth');
    let taskDayInput = document.getElementById('taskDay');
    let taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        let task = {
            text: taskInput.value,
            month: parseInt(taskMonthInput.value) || 0,
            day: parseInt(taskDayInput.value) || 0,
            completed: false
        };

        if (task.month > 12 || task.month <= 0 || task.day < 0 || task.day > 31) {
            alert("Invalid Month or day. Please type in valid dates");
            return;
        }

        fetch('/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem("curUser")}`
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
            loadTasks();
            taskInput.value = "";
            taskMonthInput.value = "";
            taskDayInput.value = "";
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
        
    }
}

function loadTasks() {
    let taskList = document.getElementById('taskList');

    taskList.innerHTML = '';

    fetch('/loadTasks', {
        headers: {
            'Authorization': `${localStorage.getItem("curUser")}`
        },
    }).then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                let li = document.createElement('li');
                li.className = 'task';

                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', function () {
                    task.completed = checkbox.checked;

                    fetch(`/updateTask/${task.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(task)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Task updated:', data);
                    })
                    .catch(error => {
                        console.error('Error updating task:', error);
                    });
                });

                let taskText = document.createTextNode(`${task.text}. Complete by ${task.month}/${task.day}`);

                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'Delete';
                deleteButton.onclick = function () {
                    fetch(`/deleteTask/${task.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `${localStorage.getItem("curUser")}`
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Task deleted:', data);
                    })
                    .catch(error => {
                        console.error('Error deleting task:', error);
                    });

                    taskList.removeChild(li);
                };

                li.appendChild(checkbox);
                li.appendChild(taskText);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
}


document.addEventListener('DOMContentLoaded', loadTasks);

document.addEventListener("DOMContentLoaded", generateCalendar);

function generateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const currentDate = new Date();
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentSeconds = currentDate.getSeconds();

    const currentDateElement = document.createElement('div');
    // currentDateElement.textContent = currentDate.toDateString();
    // currentDateElement.textContent = `${currentHour}:${currentMinute}:${currentSeconds}${currentDate} on ${currentMonth+1}/${currentDay}/${currentYear}`;
    currentDateElement.textContent = `${currentDate.toLocaleTimeString()} on ${currentMonth+1}/${currentDay}/${currentYear} `
    currentDateElement.classList.add('current-date');

    calendarContainer.appendChild(currentDateElement);
}

const apiKey = 'c5167e88bd20cce8b85e3b2d975e8693';
const city = 'Boston,US';
const weatherContainer = document.getElementById('weather-container');

const fetchWeather = () => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const lat = 42.3601;
    const lon = -71.0589;
    

    fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const fahrenheit = Math.floor(((data.main.temp - 273.15) * 9/5) + 32);
            weatherContainer.innerHTML = `
                <p>City: Boston, Massachusetts<p>
                <p>Temperature: ${fahrenheit} Fº</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
};

// For the post feed
document.addEventListener("DOMContentLoaded", function () {
    const feedContainer = document.querySelector('.content');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const newPostBtn = document.getElementById("newPost");
    const commentInput = document.getElementById('commentInput');
    const newCommentBtn = document.getElementById("addCommentBtn");

    let currentIndex = 0;
    const posts = [];

    function fetchPosts() {
        fetch('/getPosts', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                posts.length = 0;
                posts.push(...data.posts);
                renderPost(currentIndex);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    function renderPost(index) {
        feedContainer.innerHTML = ''
        const currentPost = posts[index];
        if (currentPost) {
            feedContainer.innerHTML += `<p>${currentPost.content}</p>`;
            feedContainer.innerHTML += '<h3>Comments for this post<h3>';
            let index = 1;
            currentPost.comments.forEach((value) => {
                feedContainer.innerHTML += `<p>${index}) ${value}</p>`;
                index++;
            })
        }
    }

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + posts.length) % posts.length;
        renderPost(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % posts.length;
        renderPost(currentIndex);
    });

    newPostBtn.addEventListener('click', async function () {
        const content = commentInput.value;
        const comments = [];

        if (content.length == 0){
            return;
        }
    
        try {
            const response = await fetch('/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, comments }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const newPost = data.post;
                console.log(posts);
                posts.push(newPost);
                
                currentIndex = posts.length - 1;
                console.log(posts);
                renderPost(currentIndex);
                commentInput.value = ''; 
            } else {
                console.error('Error adding post:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding post:', error);
        }
    });
    fetchPosts();
});



//Add this back towards end of project. This loads the weather station
document.addEventListener('DOMContentLoaded', fetchWeather);

document.getElementById("friends").addEventListener("click", function(event){
    window.location.replace("../FriendsPage/friends.html")
});

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});

document.getElementById("profile").addEventListener("click", function(event) {
    window.location.replace("../ProfilePage/profile.html")
});

document.getElementById("bonus").addEventListener("click", function(event) {
    window.location.replace("../BonusEventsPage/Bonus.html")
});

document.getElementById("Notifications").addEventListener("click", function(event){
    window.location.replace("../NotificationsPage/Notifications.html")
});

document.getElementById("achievements").addEventListener("click", function(event){
    window.location.replace("../AchievementsPage/Achievement.html");
});
