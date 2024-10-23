class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 150;
    width = 200;
    currentImage = 0;
    imageCache = { }; // bilder des charakters werden hier rein geladen 
    otherDirection = false;
    speedY = 1;
    acceleration = 1.5;



    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }
    colisionOutline(ctx){
        ctx.beginPath();
        ctx.linewidth = '5'
        ctx.strokeStyle = "blue"
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
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
        return this.y < 130;
    }

    loadImage(path){
        this.img = new Image(); // verglaichbar mit document.getElementById('')
        this.img.src = path;
    }

    loadImages(arr){       // function to load imges into imagecache
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
      });
    }

    playAnimation(images){
        let i = this.currentImage % images.length // let i = 0 % 6
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
}

 playEnemieAnimation(images){
    this.currentImage= (this.currentImage+ 1) % this.images.length;
    this.loadImage(this.images[this.currentImage]);

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


}