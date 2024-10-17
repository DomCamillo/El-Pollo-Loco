class MovableObject {
    x = 120;
    y = 190;
    img;
    height = 150;
    width = 200;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    moveright(){
        console.log('moving right');
        
    }

    moveLeft(){

    }

}