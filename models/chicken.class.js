class Chicken extends MovableObject {

   y = 320;
   height = 100;
   width = 100;

   images = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];

   


   constructor(){
    super().loadImage(this.images[0])
    this.x = 250 + Math.random() * 500;
    this.animateChicken();
    
   }

   animateChicken(){
      setInterval(() => {
         this.currentImage= (this.currentImage+ 1) % this.images.length;
         this.loadImage(this.images[this.currentImage]);
      }, 130);

      let randomSpeed =  0.15 + Math.random() * 0.8

      setInterval(() => {
         this.x -= randomSpeed;
         if(this.x < this.width){
            this.x = 700;
         }
      }, 10);
       
   }

   }

  



/* 
constructor(){
   super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

   this.x = 250 + Math.random() * 500;
   
  } */