

class smallChicken extends MovableObject {
 y = 350;
height = 80;
width = 80;
smallchicken_Sound = new Audio('audio/chicken_1.mp3')
smallchicken_Sound2= new Audio('audio/chicken_2.mp3')



imagesSmallChickenWalking = [
   'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
   'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
   'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
];

imageDead = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
]

constructor(x, y){
    super();
    this.loadImage(this.imagesSmallChickenWalking[0]);
    this.loadImages(this.imagesSmallChickenWalking);
    this.loadImages(this.imageDead)
    this.x = x || 2000 + Math.random() * 800;
    this.y = y || 350;
    this.animateChicken();
    
    /* this.chicken_Sound.volume = 0.01;
    this.chicken_Sound2.volume = 0.01; */

}

throwAsProjectile(direction){
    this.speedY = 15 * Math.random() * 1;
    this.speedX = 12 * direction; 
    this.applyGravity();

    setInterval(()=> {
        this.x += this.speedX;
        this.y -= this.speedY;
    },50);
}

animateChicken() {
    let randomSpeed = 0.4 + Math.random() * 0.8;

    this.moveInterval = setInterval(() => {
        if (this.ChickenHealth > 0) {
            this.x -= randomSpeed;
            if (this.x < -200) {
                this.x = 4400; 
            }
        }
    }, 10);

    this.animationInterval = setInterval(() => {
        if (this.ChickenHealth > 0) {
            this.playEnemieAnimation(this.imagesSmallChickenWalking);
        } else {
            this.playAnimation(this.imageDead); 
            clearInterval(this.moveInterval);    
            clearInterval(this.animationInterval); 
        }
    }, 190);
}
}




   





  



