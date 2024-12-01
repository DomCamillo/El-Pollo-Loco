class Character extends MovableObject {
  height = 300;
  width = 200;
  x = 0;
  y = 20;
  speed = 5;
  runSpeed = 5.2;
  jumpHeight = 30;
  isRunning = false;
  isMoving = false;
  health = 100;

  MobileRightBTN = document.getElementById("right-BTN");
  MobileLeftBTN = document.getElementById("left-BTN");
  MobileJumpBTN = document.getElementById("jump-BTN");
  MobilethrowBTN = document.getElementById("throw-BTN");

  images = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  imagesRunning = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  imagesJump = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  imageStanding = ["img/2_character_pepe/1_idle/idle/I-1.png"];

  imagesIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",

    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
  ];

  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.applyGravity();
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesRunning);
    this.loadImages(this.images);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesDead);
    this.animateCharacter();
    this.SetIdleIntervall();
    this.groundLevel = 120;
    
    this.walking_sound = new Audio("audio/mc-grass-walking.mp3");
    this.jumping_sound = new Audio("audio/jump.mp3");
    this.jumping_sound.volume = 0.1;
    allSounds.push(this.jumping_sound, this.walking_sound);
    this.y = 142;
    this.previousY = 0;
    this.isFalling = false;
    this.currentAnimation = 0;
  }

  jump() {
    this.speedY = 25;
    this.jumping_sound.play();
  }

  updateFallingState() {
    this.isFalling = this.y > this.previousY;
    this.previousY = this.y;
  }

  CheckYaxis() {
    return this.y < 140;
  }

  addHeightAfterJump() {
    if (this.CheckYaxis()) {
      this.y = 142;
    }
  }

  isAbove(enemy) {
    return (
      this.y + this.height < enemy.y + enemy.height &&
      this.y + this.height > enemy.y &&
      Math.abs(this.x - enemy.x) < enemy.width
    );
  }

  jumpAfterStomp() {
    this.speedY = +10;
    this.playAnimation(this.imagesJump);
  }

  checkRunning() {
    if (!this.isRunning) {
      setInterval(() => {
        this.playAnimation(this.images);
      }, 200);
    }
  }

  SetIdleIntervall() {
    setInterval(() => {
      this.checkIfCharacterIsIdle();
    },200);
  }

  animateCharacter() {
    this.checkCharacterAimation();
    setInterval(() => {
      this.handleCharacterWalking();
      this.handleCharacterJumping();
      this.handleCharacterRunning();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  handleCharacterWalking() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
      this.moveRight();
      this.walking_sound.play();
      this.isMoving = true;
    } else if (this.world.keyboard.LEFT && this.x > -610) {
      this.moveLeft();
      this.walking_sound.play();
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }
  handleCharacterRunning() {
    if (
      this.world.keyboard.SHIFT &&
      this.world.keyboard.RIGHT &&
      !this.isAboveGround()
    ) {
      this.runningRight();
      this.isMoving = true;
    } if (
      this.world.keyboard.SHIFT &&
      this.world.keyboard.LEFT &&
      !this.isAboveGround()
    ) {
      this.runningLeft();
      this.isMoving = true;
      this.isRunning = true;
    }
  }

  isCharacterAboveGround() {
    return this.y < this.groundLevel;
  }

  handleCharacterJumping() {
    if (
      this.world.keyboard.SPACE &&
      !this.isCharacterAboveGround() &&
      !this.isJumping ) {
      this.isJumping = true;
      this.jumping_sound.play();
      this.jump();
      this.playJumpAnimationOnce();}
    if (!this.isCharacterAboveGround() && !this.isJumping) {
      this.addHeightAfterJump();}
    if (!this.isCharacterAboveGround()) {
      this.isJumping = false;}
  }

  playJumpAnimationOnce() {
    let currentIndex = 0;
    const jumpInterval = setInterval(() => {
      if (currentIndex < this.imagesJump.length) {
        this.img = this.imageCache[this.imagesJump[currentIndex]];
        currentIndex++;
      } else {
        clearInterval(jumpInterval);
        currentIndex = 0;
        this.isJumping = false;
      }
    }, 150);
  }

  idleTimeout = null;
  idleAnimationInterval = null;
  isIdleAnimating = false;

  
/* checkIfCharacterIsIdle() {
  if (
      !this.isMoving &&
      !this.isJumping &&
      !this.isCharacterAboveGround() &&
      !this.isDead()&&
      !this.isThrowingBottle 
  ) {
      if (!this.isIdleAnimating) {
          this.loadImage(this.imageStanding[0]);
      }

      if (!this.idleTimeout) {
          this.idleTimeout = setTimeout(() => {
              this.startIdleAnimation();
              this.idleTimeout = null;
          }, 4000);
      }
  } else {
     
      if (this.idleTimeout) {
          clearTimeout(this.idleTimeout);
          this.idleTimeout = null;
      }
      this.stopIdleAnimation();
  }
} */

/* startIdleAnimation() {
  if (!this.idleAnimationInterval) {
      this.isIdleAnimating = true; 
      this.idleAnimationInterval = setInterval(() => {
          this.playAnimation(this.imagesIdle);
      }, 200);
  }
}

stopIdleAnimation() {
  if (this.idleAnimationInterval) {
      clearInterval(this.idleAnimationInterval);
      this.idleAnimationInterval = null;
  }
  this.isIdleAnimating = false; 
} */
  
  checkCharacterAimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
        return;
      }if (this.isHurt()) {
        this.playAnimation(this.imagesHurt);
        return;}
      if (this.isJumping || this.isCharacterAboveGround()) {
        return;}
      if (this.isMoving) {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.images);
        } else if (
          this.world.keyboard.SHIFT &&
          (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
          this.isRunning = true;
          this.playAnimation(this.imagesRunning);
        }
      }}, 120);
  }
}
