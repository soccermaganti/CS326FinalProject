document.getElementById("loginScreenbutton").addEventListener("click", function(event) {
    window.location.replace("Login.html");
});


document.getElementById("submit").addEventListener("click", async function(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const requestData = {username: username, password: password};
    try {
        const response = await fetch('/addLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (data.error) {
            console.log('Login failed:', data.error);
            alert("Invalid Login Info");
        } else {
            console.log('Login successful:', data.message);
            window.location.replace("Login.html");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("Invalid Login Info")
    } 
});

