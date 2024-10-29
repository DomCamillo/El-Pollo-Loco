class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    trowableObjects = [];

    bottleBar = new statusBarBottles();
    healthBar = new StatusbarHealth();
    coinBar = new StatusbarCoin();
    collectingCoinSound = new Audio('audio/collect-coin.mp3')
  
  

       constructor(canvas, keyboard, ){
           this.ctx = canvas.getContext('2d'); // um den canvas zu bearbeiten 
           this.canvas = canvas;
           this.keyboard = keyboard;
           this.draw();
           this.setWorld();
           this.run();
           console.log("StatusbarCoin initialized:", this.coinBar);
           this.collectingCoinSound.volume = 0.2;
       }
   
       setWorld(){
           this.character.world = this;
       }
       
   
       run(){
           setInterval(() => {
               this.checkCollision();
               this.checkthrowables();  
               this.checkCollisionCoin();
           }, 200);
           
       }
   
       checkthrowables(){
         if (this.keyboard.F){
           let bottle = new Bottle(this.character.x +100, this.character.y + 100)
           this.trowableObjects.push(bottle) ;    
        }
           
       }
   
       checkCollision(){
           
        this.level.enemies.forEach((enemy) => {
         if(this.character.isColliding(enemy)) {
        
           this.character.hitDetection();
           this.healthBar.setPercentage(this.character.health)
          
         
         }
        });
     }

     checkCollisionCoin() {
        
        this.level.Coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.collectedCoins.push(coin); // Verwende `coinBar` statt `StatusbarCoin`
                this.coinBar.setCoinStats(this.coinBar.collectedCoins.length);
                this.collectingCoinSound.play();
                console.log(this.coinBar.collectedCoins);
                console.log('character is colliding with coin');
            }
        });
    }
   
       checkCollisionBottles(){
           
        this.level.Bottle.forEach((bottle) => {
         if(this.character.isColliding(bottle)) {
           this.bottleBar.setPercentage(this.statusBarBottles.collectedBottles)
         }
        });
     }
   
    
      
   
       draw(){
           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht 
           this.ctx.translate(this.camera_x, 0);
   
            
          
   
           this.addObjectsToMap(this.level.clouds);
           this.addObjectsToMap(this.level.backdrops);
           this.addToMap(this.healthBar);                                                // elemnte werden zum canvis hinzugefügt 
           this.addToMap(this.bottleBar)                                     // reih enfolge bestimmt den z-index 
           this.addToMap(this.coinBar)                                     // reih enfolge bestimmt den z-index 
           this.addToMap(this.character); 
           this.addObjectsToMap(this.level.Coin);                                
           this.addObjectsToMap(this.level.Bottle);                               
           this.addObjectsToMap(this.level.enemies);
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
   
    