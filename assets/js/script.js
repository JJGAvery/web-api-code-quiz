console.log(window)

var startBtn = document.querySelector("#start");

function startQuiz() {
  // hide start screen
  var homeScreenEl = document.getElementById("home");
  homeScreenEl.setAttribute("class", "hide");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

// start quiz
startBtn.onclick = startQuiz;
