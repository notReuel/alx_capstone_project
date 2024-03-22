const leaderBoard = document.getElementById('leaderBoard');

//retrive highscores from local storage
const quizScores = JSON.parse(localStorage.getItem('quizScores'));

leaderBoard.innerHTML = quizScores.map(score => {
     return`<tr><td>${score.name}</td><td>${score.score}</td></tr>`;
}).join("");