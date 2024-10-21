class Character extends MovableObject {
    
    height = 300;
    width = 200;
    x = 0;
    y = 130;
    speed = 7;
    jump = 20;

    images = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');
    
    
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');

        this.loadImages(this.images);
        this.animateCharacter()

    }


    animateCharacter(){
        // movement nach rechts und links
        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end){
                this.x += this.speed;
                this.otherDirection = false; 
                this.walking_sound.play();
            }
           

            if(this.world.keyboard.LEFT && this.x > -610){
                this.x -= this.speed;  
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x +100;

        }, 1000 / 60);
       
       // jump 
        setInterval(() => {
            if(this.world.keyboard.SPACE){
                this.y -= this.jump;  
            }
        }, 1000 / 60); 

        // go down 
        setInterval(() => {
            if(this.world.keyboard.DOWN){
                this.y += this.jump;    
            }
        }, 1000 / 60); 
        
        // walk animation 
        setInterval(() => {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT  ){
                this.playAnimation(this.images);
            }   
        }, 120);
       
    }

    


    moveDirection(){
        
    }

    jump(){
       

    }
    
}

