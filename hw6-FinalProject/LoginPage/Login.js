const newAccount = document.getElementById("newAccount")
newAccount.addEventListener("click", function(event) {
    window.location.replace("createAccount.html")
});




document.getElementById("loginButton").addEventListener("click", function(event){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const requestData = {
        username: username,
        password: password
    };

    fetch('/checkLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data.message);
            localStorage.setItem("curUser", username);
            window.location.replace("../HomePage/index.html")
        } else {
            console.log('Login failed:', data.message);
            alert("Invalid Login Info");
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
});







