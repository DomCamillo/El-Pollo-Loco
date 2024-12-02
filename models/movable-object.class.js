class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 1;
  acceleration = 1.5;
  health = 100;
  lastHit = 0;
  isInvincible = false;
  ChickenHealth = 1;

/**
 * 
 * @param {*} mo 
 * @param {*} offsetX 
 * @param {*} offsetY 
 * @returns checks if 2 objects are colliding and returns true or false
 */
  isColliding(mo, offsetX = 10, offsetY = 10) {
    return (
      this.x + offsetX < mo.x + mo.width - offsetX &&
      this.x + this.width - offsetX > mo.x + offsetX &&
      this.y + offsetY < mo.y + mo.height - offsetY &&
      this.y + this.height - offsetY > mo.y + offsetY
    );
}
/**
 * checks if an ememy is dead 
 * @returns ture false 
 */

  ifEnemyIsDead() {
    if (this.ChickenHealth <= 0) {
      this.playAnimation(this.imageDead);
      this.speedY = 0;
      return true;
    }
    return false;
  }
  /**
   * handles the hit detection on the character and removes health 
   */

  hitDetection() {
    if (!this.isInvincible) {
        this.health -= 10;
        if (this.health < 0) {
            this.health = 0;
        }
        this.lastHit = new Date().getTime();
        this.setInvincibility(); 
    }
}
/**
 * checks if the character got hit and makes him invincible for 2 seconds 
 */

setInvincibility() {
  this.isInvincible = true; 
  setTimeout(() => {
      this.isInvincible = false;
  }, 2000);
}

/**
 * checks if a enemy got hit 
 */

  enemyHitDetection() {
    this.ChickenHealth -= 5;
    if (this.ChickenHealth < 0) {
      this.ChickenHealth = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.health == 0;
  }

  isBossDead() {
    return this.level.endboss.health == 0;
  }
  /**
   * A helper function for playing the hurt animtion on the character 
   * @returns 
   */

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.75;
  }

  /**
   * Helper function used for applaying gravity 
   */

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * checks if the bottle is above ground 
   * @returns 
   */
  isAboveGround() {
    if (this instanceof Bottle) {
      return true;
    } else {
      return this.y < 130;
    }
  }
  /**
   * function playAnimation handles all the animation in the game 
   * takes a array as argument and plays the images after oneother 
   * @param {array} images 
   */

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * helper function for playing an enemy animations
   * @param {images} arr 
   */

  playEnemieAnimation(arr) {
    this.currentImage = (this.currentImage + 1) % arr.length;
    this.loadImage(arr[this.currentImage]);
  }
  /**
   * move the clouds from left to right 
   */
  animateClouds() {
    setInterval(() => {
      this.x -= this.CloudSpeed;
      if (this.x < -this.width) {
        this.x = 800;
      }
    }, 50);
  }

  /**
   * this function handles the movement of objects 
   */

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

 
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  runningRight() {
    this.x += this.runSpeed;
    this.otherDirection = false;
    this.isRunning = true;
  }
  runningLeft() {
    this.x -= this.runSpeed;
    this.otherDirection = true;
    this.isRunning = true;
  }
}
