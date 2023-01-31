// get scores 
function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort scores
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    // create numbered list for each score
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display score
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  // clear score function
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  
  printHighscores();