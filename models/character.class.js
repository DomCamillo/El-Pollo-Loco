class Character extends MovableObject {
    
    height = 300;
    width = 200;
    x = 0;
    y = 130;

    WalkingCharacterImg = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.WalkingCharacterImg);
        this.animateCharacter()

    }


    animateCharacter(){
        setInterval(() => {
                let i = this.currentImage % this.WalkingCharacterImg.length // let i = 0 % 6
                let path = this.WalkingCharacterImg[i];
                this.img = this.imageCache[path];
                this.currentImage ++;
               
        }, 150);
       
    }

    jump(){

    }
    
}

