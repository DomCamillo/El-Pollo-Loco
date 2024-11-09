

class smallChicken extends Chicken {
 y = 350;
height = 80;
width = 80;


imagesSmallChickenWalking = [
   'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
   'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
   'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
];

imageDead = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
]

constructor(x, y){
    super().loadImages(this.imagesSmallChickenWalking)
    this.loadImages(this.imageDead)
    this.x = x || 2000 + Math.random() * 800;
    this.y = y || 350;
    this.animateChicken();
    
    this.chicken_Sound.volume = 0.01;
    this.chicken_Sound2.volume = 0.01;
}

throwAsProjectile(direction){
    this.speedY = 15;
    this.speedX = 10 * direction;

    setInterval(()=> {
        this.x += this.speedX;
        this.y -= this.speedY;
    },200);
}



smallchicken_Sound = new Audio('audio/chicken_1.mp3')
smallchicken_Sound2= new Audio('audio/chicken_2.mp3')


   
}




  



