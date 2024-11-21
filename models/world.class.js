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

  bottleBar = new statusBarBottles();
  healthBar = new StatusbarHealth();

  coinBar = new StatusbarCoin();
  bossBar = new statusBarBossHealth();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // um den canvas zu bearbeiten
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getAudio();
    this.animationFrameId = null;
  }

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
    this.enemyDeadSound.volume = 0.2;
    this.extraLifeSound.volume = 0.2;
    this.hurtSound.volume = 0.2;
    this.winSound.volume = 0.1;
    this.loseSound.volume = 0.1;
    this.backGroundMusic.volume = 0.05;
    this.collectingCoinSound.volume = 0.2;
    this.collectingBottlesSound.volume = 0.1;
    this.backGroundMusic.play();
    this.bottleThrowSound.volume = 0.1;

    this.bottleBreakSound = new Audio("audio/bottle-breaking.mp3");
    this.bottleBreakSound.volume = 0.1;

    this.pushSoundsToArray();
  }

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

  stopAllSounds() {
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

  restartGame() {
    cancelAnimationFrame(world.animationFrameId);
    this.clearAllIntervals();
    this.clearAllTimeouts();
    world = null;
    initLevel();
    init();
    this.stopAllSounds();
    this.resetEndScreen();
    this.backGroundMusic.pause();
  }

  resetEndScreen() {
    let winScreen = document.getElementById("youWin-screen");
    let loseScreen = document.getElementById("youLose-screen");
    loseScreen.classList.add("display-None");
    winScreen.classList.add("display-None");
  }

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

  CheckGameOver() {
    let winScreen = document.getElementById("youWin-screen");
    let loseScreen = document.getElementById("youLose-screen");
    if (this.character.health == 0) {
      setTimeout(() => {
        loseScreen.classList.remove("display-None");
        this.clearAllIntervals();
        this.backGroundMusic.pause();
        this.loseSound.play();
      }, 500);
    } else if (this.endBoss.health == 0) {
      setTimeout(() => {
        winScreen.classList.remove("display-None");
        this.clearAllIntervals();
        this.backGroundMusic.pause();
        this.winSound.play();
      }, 500);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.intervalId = setInterval(() => {
      this.checkCollision();
      this.checkthrowables();
      this.checkCollisionCoin();
      this.checkCollisionBottles();
      this.checkEnemyHit();
      this.checkCollisionBoss();
      this.checkBossHit();
      this.CheckGameOver();
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAbove(enemy)) {
          
          enemy.isAlreadyDead = true;
          enemy.enemyHitDetection();
          this.enemyDeadSound.play();
          enemy.ChickenHealth -= 1;
          this.character.jumpAfterStomp();
          this.enemyDefeated(enemy);
        } else {
       
          this.hurtSound.play();
          this.character.hitDetection();
          this.healthBar.setPercentage(this.character.health);
        }
      }
    });
  }

  enemyDefeated(enemy) {
    console.log('enemy get removed');
  setTimeout(() => {
    const enemyIndex = this.level.enemies.indexOf(enemy); 
    if (enemyIndex !== -1) {
      this.level.enemies.splice(enemyIndex, 1); 
    }
  }, 500);
      
    
 
   
  }

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

  checkBossHit() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.endBoss)) {
        setTimeout(() => {
          this.throwableObjects.splice(bottleIndex, 1);
        }, 310);
        this.endBoss.registerHit();
        this.endBoss.health -= 10;
        this.bottleBreakSound.play();
        bottle.breakBottle();
        this.bossBar.setPercentage(this.endBoss.health);
      }
    });
  }

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
      });
    });
    this.removeDeadEnemies(deadEnemies, usedBottles);
  }

  removeDeadEnemies(deadEnemies, usedBottles) {
    usedBottles.reverse().forEach((bottleIndex) => {
      setTimeout(() => {
        this.throwableObjects.splice(bottleIndex, 1);
      }, 500);
    });
    deadEnemies.reverse().forEach((enemyIndex) => {
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1);
      }, 200);
    });
  }

  checkCollisionCoin() {
    this.level.Coin.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coinBar.collectedCoins.push(coin); // Verwende `coinBar` statt `StatusbarCoin`
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

  checkCollisionBottles() {
    this.level.Bottle.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottleBar.collectedBottles.push(bottle);
        this.bottleBar.setBottleStat(this.bottleBar.collectedBottles.length);
        this.collectingBottlesSound.play();
        this.level.Bottle.splice(index, 1);
      }
    });
  }

  checkthrowables() {
    if (this.keyboard.F && this.bottleBar.collectedBottles.length > 0) {
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
      this.bottleBar.setBottleStat(this.bottleBar.collectedBottles.length);
    }
  }

  draw() {
    /* this.animationFrameId = requestAnimationFrame(() => this.draw()); */
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backdrops);
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bossBar);
    this.addToMap(this.character);
    this.addToMap(this.endBoss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.Bottle);
    this.addObjectsToMap(this.level.Coin);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.throwableChicken);
    this.ctx.translate(-this.camera_x, 0);
    this.setStatusbar();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setStatusbar() {
    setInterval(() => {
      this.healthBar.x = this.character.x - 100;
      this.coinBar.x = this.character.x - 100;
      this.coinBar.y = +35;
      this.bottleBar.x = this.character.x - 100;
      this.bottleBar.y = +70;
      this.bossBar.x = this.endBoss.x;
    }, 1000/60);
  }

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

  flipImage(mo, ctx) {
    this.ctx.translate(mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
  }
}
