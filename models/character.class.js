class Character extends MovableObject {
    
    height = 300;
    width = 200;
    x = 0;
    y = 30;
    speed = 5;
    runSpeed = 5.5;
    jumpHeight = 30;
    isRunning = false;
    

    images = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesJump = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    world;
    walking_sound = new Audio('audio/mc-grass-walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    
    
    
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.applyGravity();
        this.loadImages(this.imagesJump);
        this.loadImages(this.images);
        this.animateCharacter()
        this.jumping_sound.volume = 0.1;
    }

    runningRight(){
        this.x += this.runSpeed;
        this.otherDirection = false; 
        this.isRunning = true;
    }
    runningLeft(){
        this.x -= this.runSpeed;
        this.otherDirection = true; 
        this.isRunning = true;
    }
    

    animateCharacter(){
        // movement nach rechts und links
        setInterval(() => {
            this.walking_sound.pause();

            
             
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end){
                this.moveRight();
                this.walking_sound.play();
            }
           

            if(this.world.keyboard.LEFT && this.x > -610){
                this.moveLeft();
                this.walking_sound.play();
            }

            if(this.y < 120){
                this.walking_sound.pause()
             
            }  

            //running

            if(this.world.keyboard.SHIFT && this.world.keyboard.RIGHT ){
                this.runningRight()
            }
            
            if(this.world.keyboard.SHIFT && this.world.keyboard.LEFT ){
                this.runningLeft()
            }
            
 
          
            
        if(this.world.keyboard.SPACE && !this.isAboveGround() ){
               this.jump();
               this.jumping_sound.play()
            } 

            this.world.camera_x = -this.x +100;

        }, 1000/60);
       
       // jump 
       /*  setInterval(() => {
            if(this.world.keyboard.SPACE  ){
                this.y -= this.jump;  
            }
           
        },200 );  */

        // go down 
        /* setInterval(() => {
            if(this.world.keyboard.DOWN){
                this.y += this.jump;    
            }
        }, 1000 / 60);  */
        
        // walk animation 
        setInterval(() => {
            if(this.isAboveGround() ){
                this.playAnimation(this.imagesJump)
                
                
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT  ){
                    this.playAnimation(this.images);
                }   
            }

           
        }, 120);
       
    }

    


    moveDirection(){
        
    }

   
    
}

