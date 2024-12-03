class Cloud extends MovableObject{
    /** 
     * class for clouds in the level
     */
    
    y = -50;
    height = 500;
    width = 250;
    CloudSpeed = 0.45


    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.height = 700
        this.width = 700
        this.x = x;
        this.moveClouds();
       }

       moveClouds(){    
            this.animateClouds()
       }
    
}