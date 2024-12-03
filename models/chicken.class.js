class Chicken extends MovableObject {
  y = 330;
  height = 100;
  width = 100;
  isAlreadyDead = false;

  imagesChickenWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  imageDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x) {
    super().loadImage(this.imagesChickenWalking[0]);
    this.loadImages(this.imageDead);
    this.x = x;
    this.animateChicken();
    this.ifEnemyIsDead();
  }


  animateChicken() {
    this.startMovement();
    this.startAnimation();
  }
  /**
   * moves the chicken from reight to left 
   */
  startMovement() {
    let randomSpeed = 0.4 + Math.random() * 0.8;
  
    this.moveInterval = setInterval(() => {
      if (this.ChickenHealth > 0) {
        this.x -= randomSpeed;
        if (this.x < -300) {
          this.x = 4400;
        }
      }
    }, 10);
  }
  /**
   * animates the chicken 
   */
  startAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.ChickenHealth > 0) {
        this.playEnemieAnimation(this.imagesChickenWalking);
      } else {
        this.playAnimation(this.imageDead);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
      }
    }, 190);
  }
}
