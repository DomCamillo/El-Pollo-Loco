let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
allSounds = []; // array für alle sounds
let gameIsStarted = false;

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

function backToTitleScreen() {
  gameIsStarted = false;
  isMuted = false;
  if (world) {
    cancelAnimationFrame(world.animationFrameId);
    world.clearAllIntervals();
    world.clearAllTimeouts();
    world.stopAllSounds();
    world = null;
  }
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let titleImg = document.getElementById("title-img");
  titleImg.classList.remove("display-None");

  let backToTitleBtn = document.getElementById("back-to-title-btn");
  backToTitleBtn.classList.add("display-None");
  document.getElementById("btn").disabled = false; 
  applyMuteStatus();
}


function mutePage() {
 if(gameIsStarted){
  
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
 }

}


function applyMuteStatus() {
  allSounds.forEach((sound) => {
    if (sound instanceof Audio) {
      sound.muted = isMuted; 
    }
  });


  let muteIMG = document.getElementById("mute-img");
  muteIMG.src = isMuted
    ? "img/my_images/volume-off-solid_.png"
    : "img/my_images/volume-up-solid_.png";
}

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
