class World {
  character = new Character();
  level = level1;
  world;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  throwableChicken = [];
  throwableObjects = [new Bottle()];
  endBoss = new Endboss(this.character, this);
  intervalId;
  lastThrowTime = 0;

  bottleBar = new statusBarBottles();
  healthBar = new StatusbarHealth();

  coinBar = new StatusbarCoin();
  bossBar = new statusBarBossHealth();

  restartBTN = document.getElementById("restart-btn");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getAudio();
    this.animationFrameId = null;
  }
  /**
   * saves all the sounds in variables
   */
  getAudio() {
    this.collectingCoinSound = new Audio("audio/collect-coin.mp3");
    this.collectingBottlesSound = new Audio("audio/collectBottles.mp3");
    this.bottleThrowSound = new Audio("audio/throwing-sound.mp3");
    this.backGroundMusic = new Audio("audio/backgroundmusic.mp3");
    this.winSound = new Audio("audio/winning.mp3");
    this.loseSound = new Audio("audio/losing.mp3");
    this.hurtSound = new Audio("audio/hurt.mp3");
    this.extraLifeSound = new Audio("audio/extra-live.mp3");
    this.enemyDeadSound = new Audio("audio/enemie-dead-sound.mp3");
    this.bottleBreakSound = new Audio("audio/bottle-breaking.mp3");
    this.pushSoundsToArray();
    this.manageSoundVolume();
    applyMuteStatus();
  }

  /**
   * manageSoundVolume() sets the volume of all sounds in the game
   */
  manageSoundVolume() {
    this.enemyDeadSound.volume = 0.2;
    this.extraLifeSound.volume = 0.2;
    this.hurtSound.volume = 0.2;
    this.winSound.volume = 0.1;
    this.loseSound.volume = 0.1;
    this.backGroundMusic.volume = 0.05;
    this.collectingCoinSound.volume = 0.2;
    this.collectingBottlesSound.volume = 0.1;
    this.bottleThrowSound.volume = 0.1;
    this.bottleBreakSound.volume = 0.1;
    this.backGroundMusic.play();
  }
  /**
   * pushes all the sounds into a array to mute it when the button is pressd
   */
  pushSoundsToArray() {
    allSounds.push(
      this.collectingBottlesSound,
      this.collectingCoinSound,
      this.bottleThrowSound,
      this.bottleBreakSound,
      this.backGroundMusic,
      this.winSound,
      this.loseSound,
      this.hurtSound,
      this.enemyDeadSound,
      this.extraLifeSound,
      this.bottleBreakSound
    );
  }

  /**
   * stops all sounds when the world has been set
   * and the sounds loaded in
   */
  stopAllSounds() {
    this.backGroundMusic.pause();
    if (this.allSounds) {
      this.allSounds.forEach((sound) => {
        if (sound.pause) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    }
    this.allSounds = [];
  }

  /**
   * the restartGame() function handles the restart of game
   * delets the old world and sets an new one
   */
  restartGame() {
    this.restartBTN.classList.add("display-None");
    cancelAnimationFrame(world.animationFrameId);
    this.clearAllIntervals();
    this.clearAllTimeouts();
    world = null;
    initLevel();
    init();
    this.stopAllSounds();
    this.resetEndScreen();
    applyMuteStatus();
  }

  resetEndScreen() {
    let winScreen = document.getElementById("youWin-screen");
    let loseScreen = document.getElementById("youLose-screen");
    loseScreen.classList.add("display-None");
    winScreen.classList.add("display-None");
  }

  /**
   * this 2 functions clear all the timouts and intervals
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }

  clearAllTimeouts() {
    for (let i = 1; i < 9999; i++) {
      window.clearTimeout(i);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  /**
   * The run() function is a central control function of the game.
   *  It is invoked at regular time intervals (every 100 milliseconds) and performs various checks to control gameplay
   */
  run() {
    this.intervalId = setInterval(() => {
      this.CheckGameOver();
      this.checkCollisionWithEnemy();
      this.checkthrowables();
      this.checkCollisionCoin();
      this.checkCollisionBottles();
      this.checkEnemyHit();
      this.checkCollisionBoss();
      this.checkBossHit();
      this.character.updateFallingState();
    }, 100);
  }

  /**
   * CheckGameOver() is resposible for handling the game over screen if the chacarter or the boss is defetead
   */
  CheckGameOver() {
    if (this.character.health == 0) {
      this.displayLoseScreen();
    } else if (this.endBoss.health == 0) {
      this.displayWinScreen();
    }
  }

  /**
   * shows the winning endscreen if the boss is dead
   */
  displayWinScreen() {
    let winScreen = document.getElementById("youWin-screen");
    this.restartBTN.classList.remove("display-None");
    setTimeout(() => {
      winScreen.classList.remove("display-None");
      this.clearAllIntervals();
      this.backGroundMusic.pause();
      this.winSound.play();
    }, 500);
  }
  /**
   * shows the losing endscreen if the character is dead
   */
  displayLoseScreen() {
    let loseScreen = document.getElementById("youLose-screen");
    this.restartBTN.classList.remove("display-None");
    setTimeout(() => {
      loseScreen.classList.remove("display-None");
      this.clearAllIntervals();
      this.backGroundMusic.pause();
      this.loseSound.play();
    }, 500);
  }
  /**
   * checkCollisionWithEnemy()
   * checks if character has collided with an enemy, and if the character has jumped on a enemy
   */
  checkCollisionWithEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy, 10, 10)) {
        if (this.character.isAbove(enemy) && this.character.isFalling) {
          enemy.isAlreadyDead = true;
          enemy.enemyHitDetection();
          this.enemyDeadSound.play();
          enemy.ChickenHealth -= 1;
          this.character.jumpAfterStomp();
          this.enemyDefeated(enemy);
        } else if (!this.character.isAbove(enemy)) {
          this.hurtSound.play();
          this.character.hitDetection();
          this.healthBar.setPercentage(this.character.health);
        }
      }});}
      
  /**
   *
   * @param  enemy removes dead enemies from the world
   */
  enemyDefeated(enemy) {
    setTimeout(() => {
      const enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex !== -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 500);
  }

  /**
   * checks if boss has hit the character
   */
  checkCollisionBoss() {
    if (this.character.isColliding(this.endBoss)) {
      this.character.hitDetection();
      this.hurtSound.play();
      this.healthBar.setPercentage(this.character.health);
    }
    this.throwableChicken.forEach((chicken) => {
      if (this.character.isColliding(chicken)) {
        this.character.hitDetection();
        this.healthBar.setPercentage(this.character.health);
      }
    });
  }

  /**
   *  checkBossHit() check if boss was hit with a bottle
   */
  checkBossHit() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.endBoss, 40, 40)) {
        setTimeout(() => {
          this.throwableObjects.splice(bottleIndex, 1);
        }, 310);
        this.endBoss.registerHit();
        this.endBoss.health -= 5;
        this.bottleBreakSound.play();
        bottle.breakBottle();
        this.bossBar.setPercentage(this.endBoss.health);
      }
    });
  }

  /**
   *checkEnemyHit() checks if an enemy got hit by a bottle
   */
  checkEnemyHit() {
    const deadEnemies = [];
    const usedBottles = [];
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy) && !enemy.isAlreadyDead) {
          enemy.isAlreadyDead = true;
          enemy.enemyHitDetection();
          this.enemyDeadSound.play();
          enemy.ChickenHealth -= 1;
          this.bottleBreakSound.play();
          bottle.breakBottle();
          deadEnemies.push(enemyIndex);
          usedBottles.push(bottleIndex);
        }
      });});this.removeDeadEnemies(deadEnemies, usedBottles);
  }

  /**
   * removes dead enemys and throwen bottles from the canvas
   * @param {*} deadEnemies
   * @param {*} usedBottles
   */
  removeDeadEnemies(deadEnemies, usedBottles) {
    usedBottles.reverse().forEach((bottleIndex) => {
      setTimeout(() => {
        this.throwableObjects.splice(bottleIndex, 1);
      }, 500);
    });
    deadEnemies.reverse().forEach((enemyIndex) => {
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 150);
    });
  }

  /**
   * checks if the character collided with a coin
   */
  checkCollisionCoin() {
    this.level.Coin.forEach((coin, index) => {
      if (this.character.isColliding(coin, 40, 40)) {
        this.coinBar.collectedCoins.push(coin);
        this.coinBar.setCoinStats(this.coinBar.collectedCoins.length);
        this.collectingCoinSound.play();
        this.level.Coin.splice(index, 1);
      }
      if (this.coinBar.collectedCoins.length == 10) {
        this.extraLifeSound.play();
        this.character.health += 25;
        this.healthBar.setPercentage(this.character.health);
      }
    });
  }
  /**
   * checks if the character collided with a bottle
   */
  checkCollisionBottles() {
    this.level.Bottle.forEach((bottle, index) => {
      if (this.character.isColliding(bottle, 40, 40)) {
        this.bottleBar.collectedBottles.push(bottle);
        this.bottleBar.setBottleStat(this.bottleBar.collectedBottles.length);
        this.collectingBottlesSound.play();
        this.level.Bottle.splice(index, 1);
      }
    });
  }

  /**
   * checks if the character has any bottles to throw and hadles the keypress
   */
  checkthrowables() {
    const currentTime = Date.now();
    if (this.canThrowBottle(currentTime)) {
      this.throwBottle();
      this.updateBottleStatus();
    }
  }

  canThrowBottle(currentTime) {
    return (
      this.keyboard.F &&
      this.bottleBar.collectedBottles.length > 0 &&
      currentTime - this.lastThrowTime >= 250
    );
  }
  /**
   * handles the bottle throw
   */

  throwBottle() {
    let direction = this.character.otherDirection ? -1 : 1;
    let bottle = new Bottle(
      this.character.x + 40 * direction + 10,
      this.character.y + 100,
      direction
    );
    this.throwableObjects.push(bottle);
    this.bottleBar.collectedBottles.pop();
    bottle.throw();
    this.bottleThrowSound.play();
    this.character.isThrowingBottle = true;
    setTimeout(() => {
      this.character.isThrowingBottle = false;
    }, 600);
  }

  updateBottleStatus() {
    this.bottleBar.setBottleStat(this.bottleBar.collectedBottles.length);
    this.lastThrowTime = Date.now();
  }

  /**
   * The draw() function is responsible for rendering the current game state in a 2D canvas element
   * this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   * This line clears the contents of the canvas, removing the previous frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackdrop();
    this.drawStatusbars();
    this.addToMap(this.character);
    this.addToMap(this.endBoss);
    this.drawLevelObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.setStatusbar();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawBackdrop() {
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backdrops);
  }

  drawStatusbars() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bossBar);
  }

  drawLevelObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.Bottle);
    this.addObjectsToMap(this.level.Coin);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.throwableChicken);
  }

  /**
   * handles the postion of the statusbars
   */
  setStatusbar() {
    setInterval(() => {
      this.healthBar.x = this.character.x - 100;
      this.coinBar.x = this.character.x - 100;
      this.coinBar.y = +35;
      this.bottleBar.x = this.character.x - 100;
      this.bottleBar.y = +70;
      this.bossBar.x = this.endBoss.x;
    }, 1000 / 60);
  }
  /**
   * adds elements to the canvas
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.save();
    if (mo.otherDirection) {
      this.flipImage(mo, this.ctx);
    } else {
      mo.draw(this.ctx);
    }

    this.ctx.restore();
  }
  /**
   * flips the image of a drwan object
   */
  flipImage(mo, ctx) {
    this.ctx.translate(mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
  }
}
