var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var startBtn = document.querySelector("#start");
var answerEl = document.querySelector("#answer");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");

// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hide start screen
  var homeScreenEl = document.getElementById("home");
  homeScreenEl.setAttribute("class", "hide");

  // show questions
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

// get current question
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  // update question
  var questionEl = document.getElementById("question");
  questionEl.textContent = currentQuestion.question;

  // clear old question choices
  choicesEl.innerHTML = "";

  
  currentQuestion.choices.forEach(function(choice, i) {
    // create a button for each question choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // click event listener for choices
    choiceNode.onclick = questionClick;

    // display the choices on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // if user guessed incorrectly received time penalty
  if (this.value !== questions[currentQuestionIndex].answer) {
    
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // display if answer was correct or wrong
    timerEl.textContent = time;
    answerEl.textContent = "Incorrect!";
    answerEl.style.color = "red";
    answerEl.style.fontSize = "400%";
  } else {
    answerEl.textContent = "Correct!";
    answerEl.style.color = "green";
    answerEl.style.fontSize = "400%";
  }

  
  answerEl.setAttribute("class", "answer");
  setTimeout(function() {
    answerEl.setAttribute("class", "answer hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time check
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// update time
function clockTick() {
  time--;
  timerEl.textContent = time;

  // check if time expired
  if (time <= 0) {
    quizEnd();
  }
}

// stop timer
function quizEnd() {
  clearInterval(timerId);

  // show end screen
  var finishScreenEl = document.getElementById("finish");
  finishScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // get saved scores
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}
// save score
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;