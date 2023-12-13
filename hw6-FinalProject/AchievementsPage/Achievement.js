document.addEventListener('DOMContentLoaded', function () {
    const achievementsList = document.getElementById('achievements-list');

    const achievementsData = [
        { title: 'Task Master', image: 'Cover_of_Avengers-196.jpg' },
        { title: 'Trophy Collector', image: 'Super_Bowl_trophy.jpg' },
        { title: 'Monkey', image: 'oqsdgp8y6y.jpg' },
        { title: 'Munchy Boy', image: 'vY-rCxvs_400x400.jpg' },
        { title: 'Pirate King', image: 'Anime_OnePiece_MonkeyDLuffy_Wallpaper_Smiling_HD.jpg' },
    ];

    achievementsData.forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.classList.add('achievement');

        const title = document.createElement('h3');
        title.innerText = achievement.title;

        const image = document.createElement('img');
        image.src = achievement.image;
        image.alt = achievement.title;

        achievementDiv.appendChild(title);
        achievementDiv.appendChild(image);

        achievementsList.appendChild(achievementDiv);
    });
});

document.getElementById("home").addEventListener("click", function(event){
    window.location.replace("../HomePage/index.html")
});

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});
