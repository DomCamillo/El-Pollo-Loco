function openStory() {
  let legalContainer = document.getElementById("legal-container");
  let optionContainer = document.getElementById("option-container");
  let storyContainer = document.getElementById("story-container");
  storyContainer.classList.toggle("display-None");
  optionContainer.classList.add("display-None");
  legalContainer.classList.add("display-None");
}
function openControls() {
  let legalContainer = document.getElementById("legal-container");
  let storyContainer = document.getElementById("story-container");
  let optionContainer = document.getElementById("option-container");
  optionContainer.classList.toggle("display-None");
  storyContainer.classList.add("display-None");
  legalContainer.classList.add("display-None");
}
function openLegal() {
  let optionContainer = document.getElementById("option-container");
  let storyContainer = document.getElementById("story-container");
  let legalContainer = document.getElementById("legal-container");
  legalContainer.classList.toggle("display-None");
  storyContainer.classList.add("display-None");
  optionContainer.classList.add("display-None");
}

function closePage() {
  let optionContainer = document.getElementById("option-container");
  let storyContainer = document.getElementById("story-container");
  let legalContainer = document.getElementById("legal-container");
  legalContainer.classList.add("display-None");
  storyContainer.classList.add("display-None");
  optionContainer.classList.add("display-None");
}

function initializeGame() {
  gameIsStarted = true;
  let titleImg = document.getElementById("title-img");
  titleImg.classList.add("display-None");
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
  applyMuteStatus();
}

function startGame() {
  initializeGame();
  document.getElementById("btn").disabled = true;
 /*  let optionContainer = document.getElementById("option-container");
  let storyContainer = document.getElementById("story-container");
  let legalContainer = document.getElementById("legal-container"); */
  let backToTitleBtn = document.getElementById("back-to-title-btn");
  
  /* legalContainer.classList.add("display-None");
  storyContainer.classList.add("display-None");
  optionContainer.classList.add("display-None"); */
  backToTitleBtn.classList.remove("display-None");
}





/* function restartGame() {
  window.location.reload();
}
 */