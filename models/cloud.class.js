class Cloud extends MovableObject{
    
    y = -50;
    height = 500;
    width = 250;
    CloudSpeed = 0.45


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.height = 700
        this.width = 700
      
        this.x = 250 + Math.random() * 500;
        this.moveClouds();
      
       }

       moveClouds(){    
            this.moveLeft()
       }
    
}