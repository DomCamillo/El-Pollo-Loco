class Endboss extends MovableObject{
    height = 400;
    width = 400;

    
    images = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
        
    ];
   

    constructor() {
        super();
        this.loadImage(this.images[1]); 
        this.loadImages(this.images); // Lade das Array mit Bildern
        this.x = 2000;
        this.y = 70; 
       this.animateBoss();
    }

    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animateBoss() {
        setInterval(() => {
            this.playEnemieAnimation(this.images)
        }, 700);
        
    }
  


}