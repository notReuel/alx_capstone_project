document.addEventListener('DOMContentLoaded', function() {
    const saveScoreBtn = document.getElementById('saveScoreBtn');
    const playerScoreResult = document.getElementById('playerScoreResult')
    const playerNameResult = document.getElementById('playerNameResult');
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    const mostRecentPlayerQ = localStorage.getItem('mostRecentPlayer')
    const lengthOfQuestions = localStorage.getItem('lengthOfQuestions');

    HIGH_SCORE_LIST = 5;
    const total_question = 10;
    const total_scores = total_question * lengthOfQuestions;

    // assign the array 'quizScores to the var quizScores, if you can't find it? initiallize it
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    // console.log(quizScores);
    
    //remove inverted comma from value gotten mostRecentPlayer stored in localStorage 
    let mostRecentPlayer = mostRecentPlayerQ.slice(1, -1);
    mostRecentPlayer = mostRecentPlayer.toUpperCase()

    // replace the text in element with the score and player name in page quizover page 
    playerScoreResult.innerText = `${mostRecentScore}/${total_scores}`;
    playerNameResult.innerText = mostRecentPlayer


    saveQuizScore = e => {
        console.log('clciked save')

        const score = {
            name: mostRecentPlayer,
            score: mostRecentScore //Math.floor(Math.random() *100) 
        };

        //append the scores grabbed from the tempoaral local storage and add the 
        //quizscore object
        quizScores.push(score);
        

        // sort through the answers for the highest scores
        quizScores.sort((a, b) => b.score - a.score)
        
        // limit names on arraylist to 10 people
        quizScores.splice(10)

        //UPDATE THE SCORES TO THE SCORES/HIGHSCORES LIST
        localStorage.setItem('quizScores', JSON.stringify(quizScores));

        window.location.assign("/quizover2.html")
        // console.log(quizScores);
    }

    // saveScoreBtn.addEventListener('click', (e) => {
        // console.log('you clicked submit')
// 
    // want to append the scores to this obj ect when the submmit button is clicked
    //     const playerName = {
    //          Name: name
                //score: score
    //     };
    
    // });
// STOPPED AT THE GOAL TO SHOW SCORE IN MODAL AND STORE IN LOCAL STORAGE

// modalForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const name = username.value;

//     const playerName = {
//         Name: name
//     };

//     console.log(playerName)
//     savePlayerName(playerName);
// });

})

 