class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [new Bottle()];

    bottleBar = new statusBarBottles();
    healthBar = new StatusbarHealth();
    coinBar = new StatusbarCoin();
    collectingCoinSound = new Audio('audio/collect-coin.mp3')
    collectingBottlesSound = new Audio('audio/collectBottles.mp3')
  
  

       constructor(canvas, keyboard, ){
           this.ctx = canvas.getContext('2d'); // um den canvas zu bearbeiten 
           this.canvas = canvas;
           this.keyboard = keyboard;
           this.draw();
           this.setWorld();
           this.run();
           this.collectingCoinSound.volume = 0.2;
           this.collectingBottlesSound.volume = 0.2;
       }
   
       setWorld(){
           this.character.world = this;
       }
       

       
    run(){
        setInterval(() => {
            this.checkCollision();
            this.checkthrowables();  
            this.checkCollisionCoin();
            this.checkCollisionBottles();
            this.checkEnemyHit();
          
            
        }, 200);
        
    }


    checkCollision(){ 
        this.level.enemies.forEach((enemy) => {
         if(this.character.isColliding(enemy)) {
        
           this.character.hitDetection();
           this.healthBar.setPercentage(this.character.health)
           console.log('character got hit');
           
         }
        });
     }


     checkEnemyHit() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
         enemy.hitDetection(); 
         console.log('Enemy got hit by bottle');
         
        
         this.throwableObjects.splice(bottleIndex, 1); 
         
          if (enemy.CheckIfEnemyIsDead() ) {
           
             this.level.enemies.splice(enemyIndex, 1); 
             this.playAnimation(this.enemies.imageDead); 
         }
            }
        });
           });
       }

       
     checkCollisionCoin() {
        this.level.Coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.collectedCoins.push(coin); // Verwende `coinBar` statt `StatusbarCoin`
                this.coinBar.setCoinStats(this.coinBar.collectedCoins.length);
                this.collectingCoinSound.play();
                this.level.Coin.splice(index, 1);
            }
        });
    }
   
       checkCollisionBottles(){
           
        this.level.Bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottleBar.collectedBottles.push(bottle); 
                this.bottleBar.setBottleStat(this.bottleBar.collectedBottles.length);
                this.collectingBottlesSound.play();
                this.level.Bottle.splice(index, 1);
            }
        });
    }
   
     
   
       checkthrowables() {
        if (this.keyboard.F && this.bottleBar.collectedBottles.length > 0) {
            let bottle = new Bottle(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.collectedBottles.pop(); 
            bottle.throw();  
            this.bottleBar.setBottleStat();
            
        }
    }
   
   
    
      
   
       draw(){
           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht 
           this.ctx.translate(this.camera_x, 0);
   
           this.addObjectsToMap(this.level.clouds);
           this.addObjectsToMap(this.level.backdrops);
           this.addToMap(this.healthBar);                                      // elemnte werden zum canvis hinzugefügt 
           this.addToMap(this.bottleBar)                                     // reihenfolge bestimmt den z-index 
           this.addToMap(this.coinBar)                                     // reih enfolge bestimmt den z-index 
           this.addToMap(this.character); 
           this.addObjectsToMap(this.level.Bottle);                               
           this.addObjectsToMap(this.level.Coin);                                
           this.addObjectsToMap(this.level.enemies);
           this.addObjectsToMap(this.throwableObjects); 
           this.ctx.translate(-this.camera_x, 0);        // Draw() wird immer aufgerufen .this kann nicht in dieser funktion verwendet 
           this.setStatusbar();  
           
                                              // werden darum wird this in eine varibale geschpeichert
           let self = this;
           requestAnimationFrame(function(){
               self.draw();
           });
   
       }

       setStatusbar(){

            setInterval(() => {
           this.healthBar.x = this.character.x -100;
           this.coinBar.x = this.character.x -100 ;
           this.coinBar.y = + 35 ;
           this.bottleBar.x = this.character.x - 100;
           this.bottleBar.y =  + 70;     
            }, 100);
           
       }
   
   
       addObjectsToMap(objects){
           objects.forEach( o => {
               this.addToMap(o)
           }); 
       }
   
   
       // mo = map Object 
       addToMap(mo) {
           this.ctx.save();  // speichert den aktuellen Zustand des Zeichenkontexts
          
           mo.colisionOutline(this.ctx)
   
           if (mo.otherDirection) {  
              this.flipImage(mo, this.ctx) 
   
           } else {
               mo.draw(this.ctx) // zeichne den Charakter ohne Spiegelung
           }
       
           this.ctx.restore();  // stelle den Zeichenkontext wieder her
       }
   
   
       flipImage(mo,ctx){
           this.ctx.translate(mo.x + mo.width, 0);  // verschiebe den Zeichenkontext auf die Position des Charakters
           this.ctx.scale(-1, 1);  // spiegelt das bild
          this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);  // zeichne den Charakter an der korrekten Position
       }
   
      
      
   }
   
    
