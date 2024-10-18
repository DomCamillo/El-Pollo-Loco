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