class Character extends MovableObject {
  height = 300;
  width = 200;
  x = 0;
  y = 30;
  speed = 5;
  runSpeed = 5.5;
  jumpHeight = 30;
  isRunning = false;

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
  walking_sound = new Audio("audio/mc-grass-walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.applyGravity();
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesRunning);
    this.loadImages(this.images);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesDead);
    this.animateCharacter();
    /*   this.checkRunning(); */
    this.jumping_sound.volume = 0.1;
  }

  checkRunning() {
    if (!this.isRunning) {
      setInterval(() => {
        this.playAnimation(this.images);
      }, 200);
    } else {
    }
  }

  animateCharacter() {
    let idleTimeout = null;

    setInterval(() => {
      this.walking_sound.pause();

      let isMoving = false;

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
        this.moveRight();
        this.walking_sound.play();
        isMoving = true;
      }

      if (this.world.keyboard.LEFT && this.x > -610) {
        this.moveLeft();
        this.walking_sound.play();
        isMoving = true;
      }

      if (this.y < 120) {
        this.walking_sound.pause();
      }

      if (
        this.world.keyboard.SHIFT &&
        this.world.keyboard.RIGHT &&
        !this.isAboveGround()
      ) {
        this.runningRight();
        isMoving = true;
      }

      if (
        this.world.keyboard.SHIFT &&
        this.world.keyboard.LEFT &&
        !this.isAboveGround()
      ) {
        this.runningLeft();
        isMoving = true;
      }

      if (this.world.keyboard.F) {
        this.throw();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.jumping_sound.play();
      }

      this.world.camera_x = -this.x + 100;

      if (!isMoving) {
        if (!idleTimeout) {
          idleTimeout = setTimeout(() => {
            this.playAnimation(this.imagesIdle);
            idleTimeout = null;
          }, 3000);
        }
      } else {
       
        clearTimeout(idleTimeout);
        idleTimeout = null;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
        return;
      }

      if (this.isHurt()) {
        this.playAnimation(this.imagesHurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJump);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.images);
      } else if (
        this.world.keyboard.SHIFT &&
        (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      ) {
        this.isRunning = true;
        this.playAnimation(this.imagesRunning);
      }
    }, 120);
  }
}
