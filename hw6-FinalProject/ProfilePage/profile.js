const nameElement = document.getElementById('name');
const bioElement = document.getElementById('bio');
const newNameInput = document.getElementById('newName');
const newBioInput = document.getElementById('newBio');
const points = document.getElementById("points");
const deleteButton = document.getElementById("delete");

async function updateProfile() {
    const newName = newNameInput.value;
    const newBio = newBioInput.value;

    if (newName) {
        try {
            const response = await fetch('/updateLogin', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newUser: newName,
                    oldUser: localStorage.getItem('curUser')
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error");
            }

            nameElement.textContent = newName;
            bioElement.textContent = newBio;

            localStorage.setItem('curUser', newName);

            newNameInput.value = '';
            newBioInput.value = '';
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    } else {
        alert('Please enter a new name');
    }
}


deleteButton.addEventListener('click', async function(event) {
    const username = document.getElementById("name").textContent;

    const requestData = {
        username: username,
    };

    try {
        const response = await fetch(`/deleteLogin/${requestData.username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (response.status === 404) {
            console.log('Login not found:', data.error);
            alert("Login not found");
        } else if (response.status === 200) {
            console.log('Login deleted successfully:', data);
            localStorage.removeItem('curUser');
            window.location.replace("../LoginPage/Login.html");
        } else {
            console.log('Error deleting login:', data.error);
            alert("Error deleting login");
        }
    } catch (error) {
        console.log(error);
        alert(`Error deleting your profile. Your error => ${error}`);
    }
});

//Ideally want to create a total Point system that keeps track of points over 
// time and not just the current amount
function loadProfile() {
    const savedProfile = localStorage.getItem('curUser');
    const curPoints = localStorage.getItem("points") || 0;
    if (savedProfile) {
        // const parsedProfile = JSON.parse(savedProfile);
        nameElement.textContent = savedProfile;
        // bioElement.textContent = parsedProfile.bio;
        bioElement.textContent = "";
        points.textContent = `Accumulated Points: ${curPoints}`;
    }
}
document.addEventListener("DOMContentLoaded", loadProfile);

document.getElementById("home").addEventListener("click", function(event){
    window.location.replace("../HomePage/index.html")
});

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});



