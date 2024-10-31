class Bottle extends MovableObject{

height = 110;
width = 110;
speedY = 30;
speedX = 20;
x = 100;
y;

  

    images_Bottle = [
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    images_Bottle_Splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y){
        super().loadImages(this.images_Bottle);
        this.loadImages( this.images_Bottle_Splash);
        this.playAnimation(this.images_Bottle);
        /* this.throw(); */
        this.x = x;
        this.y = y;
        this.playAnimation(this.images_Bottle);
        /* this.x = 200 + Math.random() * (4200 - 200);
        this.y = 50 + Math.random() * (450 - 380 );  */
    }


   /*  throw(x,y){
     this.x = x;
     this.y = y;
     this.speedY = 50;  
     this.speedX = 30;
     this.applyGravity() 
     setInterval(() => {
        this.x += 20;
     }, 25);
          
    }
     */
    
}