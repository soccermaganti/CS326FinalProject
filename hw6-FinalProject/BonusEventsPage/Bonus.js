document.addEventListener("DOMContentLoaded", function () {
    const userProfile = localStorage.getItem("curUser") || "Default";
  
    const userNameElement = document.getElementById("user-name");
    userNameElement.textContent = userProfile;
  
    // const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = []
    fetch('/loadTasks', {
      headers: {
          'Authorization': `${userProfile}`
      },
  }).then(response => response.json())
      .then(tasks => {
          tasks.forEach(task => {
            taskList.push(task)
          })
          console.log(taskList);
          const tasksContainer = document.getElementById("tasks-container");
          let i = 1;
          taskList.forEach((task) => {
            const taskElement = document.createElement("div");
            taskElement.textContent = `${i}) ${task.text} (Due by ${task.month}/${task.day}:  Completed: ${task.completed})`;
            tasksContainer.appendChild(taskElement);
            i++
          });
        const day = new Date().getDay();
  
      let bonusPoints = 0;
    
      if (day % 2 == 0) {
        bonusPoints += 10;
      }
      
      let actualPoints = 0;
      const completedTasks = taskList.filter((task) => task.completed);
      actualPoints += completedTasks.length * 5;

      const bonusPointsElement = document.getElementById("bonus-points");
      bonusPointsElement.textContent = `Bonus Points: ${bonusPoints}`;

      const actualPointsElement = document.getElementById("actual-points");
      actualPointsElement.textContent = `Points collected from Tasks: ${actualPoints}`;

      //localStorage.setItem("totalPoints", localStorage.get("totalPoints") + JSON.stringify(bonusPoints + actualPoints))

      localStorage.setItem("points", JSON.stringify(bonusPoints + actualPoints));

      fetch('/addPoints', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userProfile}`
        },
        body: JSON.stringify({
            username: userProfile,
            totalPoints: localStorage.getItem("points")
        }),
    })
      .then(response => response.json())
        .then(result => {
          if (result.success){
            console.log('Points added successfully:', result);
          } else {
            console.error('Points not added', result.message);
          }
        })
    });
  });

document.getElementById("logout").addEventListener("click", function(event) {
    window.location.replace("../LoginPage/Login.html")
});

document.getElementById("home").addEventListener("click", function(event) {
    window.location.replace("../HomePage/index.html")
});
  