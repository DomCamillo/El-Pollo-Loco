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
       /*  this.throw() */
        this.x = x;
        this.y = y;
        this.playAnimation(this.images_Bottle);
        
    }
    throw(x, y){
        this.x = this.character.x;
        this.y = this.character.y;
        this.speedY = 30;  
        this.speedX = 30;
        this.applyGravity() 
        setInterval(() => {
           this.x += 10;
        }, 50);
             
       }


    
    
    
}