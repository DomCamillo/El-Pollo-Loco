class Endboss extends MovableObject {
  height = 400;
  width = 400;
  health = 200;

  isCharacterNear = false;
  walking = 10;
  direction = 1;
  bossState = "walking";
  throwIntervalID = null;
  hurtTimeoutID = null;
  hasBeenHit = false;

  imagesBossAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imagesBossWalking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  imagesBossAttacking = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  imagesBossHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imagesBossDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(character, world) {
    super();
    this.world = world;
    this.loadImages(this.imagesBossAlert); 
    this.loadImages(this.imagesBossWalking);
    this.loadImage(this.imagesBossWalking[0]);
    this.loadImages(this.imagesBossAttacking);
    this.loadImages(this.imagesBossHurt);
    this.loadImages(this.imagesBossDead);
    this.manageBossSounds();
    this.x = 4000; 
    this.y = 70;
    this.animateBoss();
    this.moveBoss();
    this.character = character;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.bossChickenSound = new Audio("audio/chicken-honk.mp3")
    this.bossChickenCry = new Audio("audio/chicken-single-alarm-call-6056.mp3")
    this.bossChickenPassiv = new Audio("audio/chicken_1.mp3")
    this.bossChickenSound.volume = 0.2;
    this.bossChickenPassiv.volume = 0.1;
    this.bossChickenCry.volume = 0.1;
    allSounds.push(this.bossChickenSound, this.bossChickenCry, this.bossChickenPassiv);
  }

  animateBoss() {
    setInterval(() => {
      if (this.bossState === "walking") {
        this.playAnimation(this.imagesBossWalking);
      } else if (this.bossState === "alert") {
        this.playAnimation(this.imagesBossAlert);
      } else if (this.bossState === "hurt") {
        this.playAnimation(this.imagesBossHurt);
      } else if (this.bossState === "dead") {
        this.health = 0;
        this.playAnimation(this.imagesBossDead);
      } else if (this.bossState === "attacking") {
        this.playAnimation(this.imagesBossAttacking);
        this.throwInterval();
      }
    }, 200);
  }

  moveBoss() {
    setInterval(() => {
      this.moveBossLeftAndRight();
      if (this.health <= 0) {
        this.bossState = "dead";
      } else if (this.checkIfCharacterIsNear() && !this.hasBeenHit) {
        this.bossState = "alert";
      } else if (this.bossState !== "hurt" && this.hasBeenHit) {
        this.bossState = "attacking";
      }
    }, 100);
  }

 
  manageBossSounds(){
    if(this.bossState === "alert"){
      setInterval(()=>{
        this.bossChickenCry.play();
      },5000)
    } else if (this.bossState = "walking"){
      setTimeout(()=>{
        this.bossChickenPassiv.play();
      },2200)
      
    }
  }

  moveBossLeftAndRight() {
    if (this.bossState === "walking") {
      if (this.x >= 4300) {
        this.direction = -1;
      } else if (this.x <= 4000) {
        this.direction = 1;
      }
      this.x += this.direction * this.walking;
    }
  }

  registerHit() {
    if (!this.hurtTimeoutID) {
      this.bossState = "hurt";
      this.hasBeenHit = true;
      this.hurtTimeoutID = setTimeout(() => {
        this.bossState = "attacking";
        this.hurtTimeoutID = null;
      }, 1000);
    }
  }

  checkIfCharacterIsNear() {
    if (this.character.x > 3900) {
     
      return true;
    }
  }

  throwSmallChicken() {
    let direction = this.x > this.character.x ? -1 : 1;
    let smallChickenInstance = new smallChicken(this.x, this.y);
    smallChickenInstance.throwAsProjectile(direction);
    world.throwableChicken.push(smallChickenInstance);
    this.bossChickenSound.play();
  }

  throwInterval() {
    if (!this.throwIntervalID) {
      this.throwIntervalID = setInterval(() => {
        this.throwSmallChicken();
      }, 2000);
    }
  }
}
