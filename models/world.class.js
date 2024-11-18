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
     this.collectingCoinSound = new Audio("audio/collect-coin.mp3");
     this.collectingBottlesSound = new Audio("audio/collectBottles.mp3");
     this.bottleThrowSound = new Audio("audio/throwing-sound.mp3");
     this.backGroundMusic = new Audio("audio/backgroundmusic.mp3");
     this.winSound = new Audio("audio/winning.mp3");
     this.loseSound = new Audio("audio/losing.mp3");
     this.hurtSound = new Audio("audio/hurt.mp3");
     this.extraLifeSound = new Audio("audio/extra-live.mp3")
     this.extraLifeSound.volume = 0.2;
     this.hurtSound.volume = 0.2;
     this.winSound.volume = 0.1;
     this.loseSound.volume = 0.1;
     this.backGroundMusic.volume = 0.05;
     this.collectingCoinSound.volume = 0.2;
     this.collectingBottlesSound.volume = 0.1;
     this.backGroundMusic.play();
     this.bottleThrowSound.volume = 0.1;
     allSounds.push(this.collectingBottlesSound,  this.collectingCoinSound, this.bottleThrowSound, this.bottleBreakSound,   this.backGroundMusic
      ,  this.winSound ,  this.loseSound, this.hurtSound,
     );
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
      setTimeout(()=>{
        winScreen.classList.remove("display-None");
        this.clearAllIntervals();
        this.backGroundMusic.pause();
        this.winSound.play();
      },500)
    
    }
  }

 /*  cloneLevel(level) {
    return new Level(
      [...level.enemies],
      [...level.clouds],
      [...level.backdrops],
      [...level.Coin],
      [...level.Bottle]
    );
  }

  restartGame() {
    this.clearAllIntervals();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    world = new World(this.canvas, this.keyboard);
    world.level = this.cloneLevel(level1);

    document.getElementById("youWin-screen").classList.add("display-None");
    document.getElementById("youLose-screen").classList.add("display-None");
  } */

    /*  restartGame() {
      cancelAnimationFrame(world.animationFrameId);
      clearAllIntervals();
      clearAllTimeouts();
      initLevel();
      world = new World();
      world.level = 
      world.run();
      document.getElementById('end-game-buttons').style.display = 'none';
  } */

  clearAllIntervals() {
    /*  clearInterval(this.intervalId);
    this.intervalId = null; */
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.hurtSound.play();
        this.character.hitDetection();
        this.healthBar.setPercentage(this.character.health);
        console.log("character got hit by chicken");
      }
    });
  }

  checkCollisionBoss() {
    if (this.character.isColliding(this.endBoss)) {
      this.character.hitDetection();
      this.hurtSound.play();
      this.healthBar.setPercentage(this.character.health);
      console.log("character got hit by endboss");
    }
    this.throwableChicken.forEach((chicken) => {
      if (this.character.isColliding(chicken)) {
        this.character.hitDetection();
        this.healthBar.setPercentage(this.character.health);
        console.log("Character got hit by thrown chicken");
      }
    });
  }

  checkBossHit() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this.endBoss)) {
        this.endBoss.registerHit();

        this.endBoss.health -= 20;

        this.bossBar.setPercentage(this.endBoss.health);
        this.throwableObjects.splice(bottleIndex, 1);
        console.log("Boss got hit by bottle");
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
          console.log("Enemy got hit by bottle");
          enemy.ChickenHealth -= 1;
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
      console.log("Removing used bottle");
      setTimeout(() => {
        this.throwableObjects.splice(bottleIndex, 1);
      }, 500);
    });

    deadEnemies.reverse().forEach((enemyIndex) => {
      console.log("Removing dead enemy");
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
      if(this.coinBar.collectedCoins.length == 10){
        this.extraLifeSound.play();
        this.character.health += 25; 
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.backdrops);
    this.addToMap(this.healthBar); // elemnte werden zum canvis hinzugefügt
    this.addToMap(this.bottleBar); // reihenfolge bestimmt den z-index
    this.addToMap(this.coinBar);
    this.addToMap(this.bossBar);

    this.addToMap(this.character);
    this.addToMap(this.endBoss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.Bottle);
    this.addObjectsToMap(this.level.Coin);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.throwableChicken);
    this.ctx.translate(-this.camera_x, 0); // Draw() wird immer aufgerufen .this kann nicht in dieser funktion verwendet
    this.setStatusbar();

    // werden darum wird this in eine varibale geschpeichert
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
    }, 100);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // mo = map Object
  addToMap(mo) {
    this.ctx.save(); // speichert den aktuellen Zustand des Zeichenkontexts

    /*  mo.colisionOutline(this.ctx); */

    if (mo.otherDirection) {
      this.flipImage(mo, this.ctx);
    } else {
      mo.draw(this.ctx); // zeichne den Charakter ohne Spiegelung
    }

    this.ctx.restore(); // stelle den Zeichenkontext wieder her
  }

  flipImage(mo, ctx) {
    this.ctx.translate(mo.x + mo.width, 0); // verschiebe den Zeichenkontext auf die Position des Charakters
    this.ctx.scale(-1, 1); // spiegelt das bild
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height); // zeichne den Charakter an der korrekten Position
  }
}
