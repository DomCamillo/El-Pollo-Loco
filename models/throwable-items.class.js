class Bottle extends MovableObject {
  damage = 10;
  height = 110;
  width = 110;
  speedY = 40;
  speedX = 20;
  x = 100;
  direction;

  images_Bottle = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  images_Bottle_Splash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  images_Bottle_onGround = [
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  constructor(x, y, direction, throwableObjects, world) {
    super().loadImages(this.images_Bottle);
    this.loadImages(this.images_Bottle_Splash);
    this.loadImages(this.images_Bottle_onGround);
    this.playAnimation(this.images_Bottle);
    this.direction = direction;
    this.x = x;
    this.y = y;

    this.animateBottle();
  }

  animateBottle() {
    setInterval(() => {
      this.playAnimation(this.images_Bottle_onGround);
    }, 500);
  }

  throw() {
    this.speedY = 20;
    this.speedX = 15 * this.direction;

    this.rotateInterval = setInterval(() => {
      this.playAnimation(this.images_Bottle);
    }, 100);

    this.throwinterval = setInterval(() => {
      this.x += this.speedX;
      this.y -= this.speedY;
      this.speedY -= 1.8;
    }, 25);
  }

  breakBottle() {
    clearInterval(this.rotateInterval);

    setInterval(() => {
      this.playAnimation(this.images_Bottle_Splash);
    }, 200);

    this.speedY = 0;
    this.speedX = 1;

    setInterval(() => {
      this.x -= this.speedX;
    }, 25);
  }

  rotateBottle() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.images_Bottle);
    }, 100);
  }
}
