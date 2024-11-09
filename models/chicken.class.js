class Chicken extends MovableObject {

   y = 320;
   height = 100;
   width = 100;
   

   imagesChickenWalking = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];

   imageDead = [
       'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
   ];

   
  
 
   
   chicken_Sound = new Audio('audio/chicken_1.mp3')
   chicken_Sound2= new Audio('audio/chicken_2.mp3')
  

   constructor(){
    super().loadImage(this.imagesChickenWalking[0])
    this.loadImages(this.imageDead)
    this.x = 1200 + Math.random() * 500;
    this.animateChicken();
    this.ifEnemyIsDead();
   
    this.chicken_Sound.volume = 0.01;
    this.chicken_Sound2.volume = 0.01;
    
    
   }

   

   animateChicken() {
      let randomSpeed = 0.4 + Math.random() * 0.8;
  
      this.moveInterval = setInterval(() => {
          if (this.ChickenHealth > 0) {
              this.x -= randomSpeed;
              if (this.x < -200) {
                  this.x = 4400; 
              }
          }
      }, 10);
  
      this.animationInterval = setInterval(() => {
          if (this.ChickenHealth > 0) {
              this.playEnemieAnimation(this.imagesChickenWalking);
          } else {
              this.playAnimation(this.imageDead); 
              clearInterval(this.moveInterval);    
              clearInterval(this.animationInterval); 
          }
      }, 190);
  }
}
     /*  setInterval(() => {
         this.chicken_Sound.play();
      }, 5500);
      setInterval(() => {
         this.chicken_Sound2.play();
      }, 20000); */
       
   



   

  



/* 
constructor(){
   super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

   this.x = 250 + Math.random() * 500;
   
  } */