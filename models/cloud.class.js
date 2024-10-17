class Cloud extends MovableObject{
    
    y = -50;
    height = 500;
    width = 250;


    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.height = 700
        this.width = 400
      
        this.x = 250 + Math.random() * 500;
      
       }
    
}