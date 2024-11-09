class MovableObject extends DrawableObject {
   
    
    otherDirection = false;
    speedY = 1;
    acceleration = 1.5;
    health = 100;
    lastHit = 0;
    ChickenHealth = 1;

    

    isColliding(mo){
        
        
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y +mo.height;
        
        
    }

    ifEnemyIsDead() {
        if (this.ChickenHealth <= 0) {
            this.playAnimation(this.imageDead); 
            this.speedY = 0;
            return true;
        }
        return false;
    }

    hitDetection(){
        this.health -= 5;
        if (this.health < 0){
          this.health = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    enemyHitDetection(){
        this.ChickenHealth -= 5;
        if (this.ChickenHealth < 0){
          this.ChickenHealth = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead(){
        return this.health == 0;
      }

      isBossDead(){
        return this.level.endboss.health == 0;
      }
      
    isHurt(){
       let timepassed = new Date().getTime() -this.lastHit;    
       timepassed = timepassed / 1000;
       return timepassed < 0.5;
    }
  
    applyGravity(){            // function to applay gravity 
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY
            this.speedY -= this.acceleration;
            }  
        }, 1000/25);
    }

    isAboveGround(){
        if(this instanceof Bottle){
            return true;
        } else {
            return this.y < 130;
        }
        
    }

    playAnimation(images){
        let i = this.currentImage % images.length // let i = 0 % 6
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
}

playEnemieAnimation(arr){
    this.currentImage = (this.currentImage + 1) % arr.length;
    this.loadImage(arr[this.currentImage]);

 }  

    animateClouds(){
        setInterval(()=> {
            this.x -= this.CloudSpeed
            if (this.x < -this.width){
                this.x = 800;
            }
        } ,50 )
    }

    moveLeft(){
        this.x -= this.speed;  
        this.otherDirection = true;
    }

    jump(){
        this.speedY = 25;
       
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false; 
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
    



}