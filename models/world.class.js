class World {
 character = new Character();
 level = level1;
 ctx;
 canvas;
 keyboard;
 camera_x = 0;
 trowableObjects = [];
 
 statusBarHealth = new Statusbar(this.iamgesStatsHealth)
 statusBarCoins = new Statusbar(this.imagesStatsCoin);
 statusBarBottles = new Statusbar(this.imagesStatsBottle);


    constructor(canvas, keyboard, ){
        this.ctx = canvas.getContext('2d'); // um den canvas zu bearbeiten 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }
    

    run(){
        setInterval(() => {
            this.checkCollision();
            this.checkthrowables();  
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
        this.statusBarHealth.setPercentage(this.character.health)
      
      }
     });
 }

 
   

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht 
        this.ctx.translate(this.camera_x, 0);

           this.statusBarHealth.x = this.character.x -100;
           this.statusBarCoins.x = this.character.x -100 ;
           this.statusBarCoins.y = +30 ;
           this.statusBarBottles.x = this.character.x - 100;
           this.statusBarBottles.y =  + 60;
       

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backdrops);// elemnte werden zum canvis hinzugefügt 
        this.addToMap(this.character); 
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);        // reihenfolge bestimmt den z-index 
        this.addToMap(this.statusBarHealth);  
        this.addObjectsToMap(this.level.Coin);                                
        this.addObjectsToMap(this.level.Bottle);                               
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);        // Draw() wird immer aufgerufen .this kann nicht in dieser funktion verwendet 
                                                  // werden darum wird this in eine varibale geschpeichert
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });

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