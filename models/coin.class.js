class Coin extends MovableObject{

    height = 150;
    width = 150;
    x = 200;
    y = 130;

    

    images_Coin = [
        'img/8_coin/coin_1.png'
    ];

    constructor(){
        super().loadImage( 'img/8_coin/coin_1.png')
        
       this.loadImages(this.images_Coin)
        this.playAnimation(this.images_Coin)
        this.x = 200 + Math.random() * (4200 - 200);
        this.y = 130 + Math.random() * (450 - 180 - this.height); 
    }

    

}