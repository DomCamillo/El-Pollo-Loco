class Coin extends MovableObject{

    height = 150;
    width = 150;
    x = 200;
    y = 130;

    images_Coin = [
        'img/8_coin/coin_1.png'
    ];

    constructor(x,y){
        super().loadImage( 'img/8_coin/coin_1.png')
        this.loadImages(this.images_Coin)
        this.playAnimation(this.images_Coin)
        this.x = x;
        this.y = y;
    }

}

