class Endboss extends MovableObject{
    height = 400;
    width = 400;
    health = 100;
    isCharacterNear = false;

    
    imagesBossAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        
    ];

    imagesBossWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    imagesBossAttacking = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    imagesBossHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    imagesBossDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
   

    constructor(character) {
        super();
        this.loadImage(this.imagesBossAlert[1]); 
        this.loadImages(this.imagesBossAlert); // Lade das Array mit Bildern
        this.loadImages(this.imagesBossWalking); 
        this.loadImages(this.imagesBossAttacking); 
        this.loadImages(this.imagesBossHurt); 
        this.loadImages(this.imagesBossDead); 
        this.x = 4000;
        this.y = 70; 
        this.animateBoss();
        this.character = character;
    }


  
    

    animateBoss() {
        
        setInterval(()=>{
            this.alertChicken();
        },700);
        
    }

    checkIfCharacterIsNear(){
        if (this.character.x < 2900){
           return true;
        }
    }

    alertChicken(){

            if (this.checkIfCharacterIsNear()) {
                this.playEnemieAnimation(this.imagesBossAlert);
                console.log(this.character.x);
            }
    }


    throwSmallChicken() {
        let direction = this.x > character.x ? -1 : 1;  
        let smallChicken = new smallChicken(this.x, this.y);  
        smallChicken.throwAsProjectile(direction);  
        world.throwableObjects.push(smallChicken);  
    }

    throwInterval() {
        setInterval(() => {
            this.throwSmallChicken();
        }, 5000); // Wirft alle 2 Sekunden
    }
  
    


}