class DrawableObject {
    height = 150;
    width = 200;
    x = 120;
    y = 190;
    imageCache = { }; // bilder des charakters werden hier rein geladen 
    img;
    currentImage = 0;


    colisionOutline(ctx){
        if(this instanceof Character || 
        this instanceof Chicken ||
         this instanceof Coin ||
        this instanceof Bottle){
        ctx.beginPath();
        ctx.linewidth = '5'
        ctx.strokeStyle = "blue"
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
        
    }

    loadImage(path){
        this.img = new Image(); // verglaichbar mit document.getElementById('')
        this.img.src = path;
    }


    loadImages(arr){        // function to load imges into imagecache
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
    });
    
    }


    
    draw(ctx){
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        } catch(e){
            console.log('Error loading image', e)
            console.log('this image could not load ', this.img.src)
        }
        
    }


}