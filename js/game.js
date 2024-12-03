let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
allSounds = []; // array for all sounds
let gameIsStarted = false;

/* let restartBTN = document.getElementById('restart-btn') */
/**
 * creats a new world
 */
function init() {
  gameIsStarted = true;
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function callRestartGame() {
  if (world) {
    world.restartGame();
  }
}
/**
 * fucntion to reset the game and go to title screen
 */

function backToTitleScreen() {
  gameIsStarted = false;
  if (world) {
    cancelAnimationFrame(world.animationFrameId);
    world.clearAllIntervals();
    world.clearAllTimeouts();
    world.stopAllSounds();
    world = null;
  }
  applyMuteStatus();
  resetTitlescreen();
  resetEndScreen();
}

/**
 * resets the canvas and ui elements
 */

function resetTitlescreen() {
  let restartBTN = document.getElementById("restart-btn");
  let startBTN = document.getElementById("btn");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let titleImg = document.getElementById("title-img");
  let mute = document.getElementById("muteCon");
  let backToTitleBtn = document.getElementById("back-to-title-btn");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  titleImg.classList.remove("display-None");
  startBTN.classList.remove("display-None");
  backToTitleBtn.classList.add("display-None");
  mute.classList.add("display-None");
  document.getElementById("btn").disabled = false;
  restartBTN.classList.add("display-None");
}

function resetEndScreen() {
  let winScreen = document.getElementById("youWin-screen");
  let loseScreen = document.getElementById("youLose-screen");
  loseScreen.classList.add("display-None");
  winScreen.classList.add("display-None");
}

/**
 * mutes all the sounds if the icon is pressed, changes the icon
 * save the preset in local storage
 */

function mutePage() {
  if (gameIsStarted) {
    let muteIMG = document.getElementById("mute-img");
    isMuted = muteIMG.src.includes("volume-off-solid_.png");
    muteIMG.src = isMuted
      ? "img/my_images/volume-up-solid_.png"
      : "img/my_images/volume-off-solid_.png";

    isMuted = !isMuted;

    allSounds.forEach((sound) => {
      if (sound instanceof Audio) {
        sound.muted = isMuted;
      }
    });

    localStorage.setItem("isMuted", isMuted);
  }
}

/**
 * if the page was muted bevore it will be muted after reloding the page
 */

function applyMuteStatus() {
  allSounds.forEach((sound) => {
    if (sound instanceof Audio) {
      sound.muted = isMuted;
    }
  });
  toggleMuteImg();
}

window.onload = function () {
  const storedMuteStatus = localStorage.getItem("isMuted");
  isMuted = storedMuteStatus === "true";
  applyMuteStatus();
};

 function toggleMuteImg(){
  let muteIMG = document.getElementById("mute-img");
  muteIMG.src = isMuted
    ? "img/my_images/volume-off-solid_.png"
    : "img/my_images/volume-up-solid_.png";
}

/**
 * if a certain key is pressed the key will be true
 * used for movement of the charatcer
 */

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 68) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 87) {
    keyboard.UP = true;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 16) {
    keyboard.SHIFT = true;
  }
  if (e.keyCode == 70) {
    keyboard.F = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 68) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 87) {
    keyboard.UP = false;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 16) {
    keyboard.SHIFT = false;
  }
  if (e.keyCode == 70) {
    keyboard.F = false;
  }
});
