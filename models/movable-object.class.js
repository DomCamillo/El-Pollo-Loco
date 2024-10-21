class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 150;
    width = 200;
    currentImage = 0;
    imageCache = { }; // bilder des charakters werden hier rein geladen 
    otherDirection = false;


    loadImage(path){
        this.img = new Image(); // verglaichbar mit document.getElementById('')
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
      });
    }

    playAnimation(images){
        let i = this.currentImage % this.images.length // let i = 0 % 6
        let path = this.images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
}

 playEnemieAnimation(images){
    this.currentImage= (this.currentImage+ 1) % this.images.length;
    this.loadImage(this.images[this.currentImage]);

 }


    moveright(){
        console.log('moving right');
        
    }

    moveLeft(){
        setInterval(()=> {
            this.x -= this.CloudSpeed
            if (this.x < -this.width){
                this.x = 800;
            }
        } ,50 )
    }

}