
/**
 * functions to toggle ui elements like options and story 
 */
let restartBTN = document.getElementById('restart-btn')

function requestFullScreen(element) {
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari und Opera
      element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
  }
}

requestFullScreen(document.documentElement);

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

/**
 * helper function to restart the game 
 */
function initializeGame() {
  world = null;
  gameIsStarted = true;
  let titleImg = document.getElementById("title-img");
  titleImg.classList.add("display-None");
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
  let mute = document.getElementById('muteCon')
  mute.classList.remove('display-None')
  
}

/**
 * starts the game 
 */
function startGame() {
  initializeGame();
  let startBTN = document.getElementById('btn')
  startBTN.classList.add('display-None')
  let backToTitleBtn = document.getElementById("back-to-title-btn");
  backToTitleBtn.classList.remove("display-None");
  
}





