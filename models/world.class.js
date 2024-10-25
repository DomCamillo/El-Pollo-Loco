class World {
  level = level1;
character = new Character();
 ctx;
 canvas;
 keyboard;
 camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d'); // um den canvas zu bearbeiten 
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
    }
    

    checkCollisions(){
        setInterval(() => {
          this.level.enemies.forEach((enemy) => {

           if(this.character.isColliding(enemy)) {
          
             this.character.hitDetection();
           
           }
          });

        }, 200);


    }

 
   

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // canvas wird gelöscht 
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backdrops);// elemnte werden zum canvis hinzugefügt 
        this.addToMap(this.character);         // reihenfolge bestimmt den z-index 
        this.addObjectsToMap(this.level.items);                                
        this.addObjectsToMap(this.level.enemies);
     /*    this.addObjectsToMap(this.level.statusBars); */
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