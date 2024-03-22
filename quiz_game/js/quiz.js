// === QUIZ QUESTION
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'))
const questionCounterText = document.getElementById('questionCounterText');
const scoreText = document.getElementById('scoreText');
const loader = document.getElementById('loader');
const fullContainer = document.getElementById('fullContainer');
const timer = document.getElementById('timer');
const apiHeader = { 'X-Api-Key': 'DO1fRorADHOYpY1iLguAlNH1uAoyiScOhRpLvnkm'};

let currentQuestion = {} //object
let acceptingAnswers = false //for delays between questions
let score = 0 
let questionCounter = 0 //to track the number of questions
let availableQuestions = [] //a copy of our questions, listing the unanswered ones

//INITIALIZING EMPTY ARRAY TO HOLD QUESTIONS FROM REQUEST
let questions = []

//FETCHING QUESTION FROM EXTERNAL SOURCE
fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
    // 'https://quizapi.io/api/v1/questions?apiKey=DO1fRorADHOYpY1iLguAlNH1uAoyiScOhRpLvnkm&category=code&difficulty=Easy&limit=10&tags=HTML'
  )
  .then(fetchResponse => {
    return fetchResponse.json();
  })
  .then(loadedQuestions => {
   questions = loadedQuestions.results.map( loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
            formattedQuestion.answer -1, 0, loadedQuestion.correct_answer
        );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index+1)] = choice;  
      });

      return formattedQuestion;
    }); 
    const lengthOfQuestions = (loadedQuestions.results).length
    localStorage.setItem('lengthOfQuestions', lengthOfQuestions)
    startQuiz();
  })
  .catch(err =>
    console.log(err)
  );


//CONSTANTS
const question_point = 10;
const total_question = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
  // HIDE LOADER AFTER QUESTIONS ARE LOADED
  fullContainer.classList.remove('hidden');
  loader.classList.add('hidden');
};

// to randomly pick a question
getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >+ total_question) {
        localStorage.setItem('mostRecentScore', score);
        //go to the next page if questions have been exhausted or limit reached
        return window.location.assign("/quizover.html")
    }

    // add counter by 1
    questionCounter++;
   // replace the innertext of element with attr countertext with the value of this variables 
    questionCounterText.innerText = `${questionCounter}/${total_question}`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true;

    //CALCULATE AND DISPLAY AVAILABLE TIME
    const targetTime = Date.now() + 60000;

    function updateCountdown () {
      
      const currentTime = Date.now()
      const timeDifference = targetTime - currentTime;

      const totalSeconds = Math.max(0, Math.floor(timeDifference / 1000));
      const hours =  Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      
      timer.innerText = (`${minutes}M: ${seconds}S`);

      if (totalSeconds > 0) {
        setTimeout(updateCountdown, 1000);
      } else {
        console.log('over');
        getNewQuestion();
      };
    };

    updateCountdown()

};

choices.forEach(choice => {     
    choice.addEventListener('click', e => {
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        var classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        };

        if (classToApply === 'correct') {
            updateScore(question_point);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1500);

    });
});

updateScore = num => {
    score += num;
    scoreText.innerText =  score
}

