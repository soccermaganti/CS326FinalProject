let friends = JSON.parse(localStorage.getItem('friends')) || [];

function renderFriends() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';

    friends.forEach((friend, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${friend}
            <button onclick="deleteFriend(${index})">Delete</button>
        `;
        friendsList.appendChild(listItem);
    });

    localStorage.setItem('friends', JSON.stringify(friends));
}

function addFriend() {
    const friendNameInput = document.getElementById('friendName');
    const newFriendName = friendNameInput.value.trim();

    if (newFriendName !== '') {
        friends.push(newFriendName);
        renderFriends();
        friendNameInput.value = '';
    }
}

function deleteFriend(index) {
    if (index >= 0 && index < friends.length) {
        friends.splice(index, 1);
        renderFriends();
    }
}

renderFriends();

document.getElementById("home").addEventListener("click", function(event){
    window.location.replace("../HomePage/index.html")
});

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});
