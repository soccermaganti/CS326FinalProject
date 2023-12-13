document.addEventListener('DOMContentLoaded', async function() {
    try {
        const username = localStorage.getItem('curUser') || 'Default';

        const response = await fetch('/loadTasks', {
            headers: {
                'Authorization': `${localStorage.getItem("curUser")}`
            },
        });

        if (!response.ok) {
            alert("failure");
        }

        const taskDB = await response.json();

        const tasks = taskDB.sort((a, b) => {
            if (a.month !== b.month) {
                return a.month - b.month;
            } else {
                return a.day - b.day;
            }
        });

        console.log(tasks);

        document.getElementById('username').innerText = username;

        const taskList = document.getElementById('taskList');
        let i = 1;

        tasks.forEach(task => {
            const li = document.createElement('li');

            if (task.completed) {
                li.classList.add('completed');
                li.textContent = `${i}) ${task.text.trim()}.`;
            } else {
                li.textContent = `${i}) ${task.text.trim()}. Need to complete by ${task.month}/${task.day}!`;
            }
            taskList.appendChild(li);
            i++;
        });
    } catch (error) {
        console.error('Error fetching or processing tasks:', error);
    }
});


document.getElementById("home").addEventListener("click", function(event){
    window.location.replace("../HomePage/index.html")
});

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});
