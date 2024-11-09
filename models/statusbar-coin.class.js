class StatusbarCoin extends StatusbarHealth{

    
    collectedCoins = [];
    numberOfCoins = 0;

    imagesStatsCoin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

   
    
    constructor(){
        super();
        this.loadImages(this.imagesStatsCoin); 
        this.img = this.imageCache[this.imagesStatsCoin[0]]; 
        this.setCoinStats(this.numberOfCoins); 
      
    }

    

    
    setCoinStats(numberOfCoins){
        this.numberOfCoins = numberOfCoins
        let path = this.imagesStatsCoin[this.resolveImageIndex()]
        
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){ 
        if(this.numberOfCoins >= 10){
            return 5;

        } else if (this.numberOfCoins >= 8){
            return 4;

        } else if (this.numberOfCoins >= 6){
            return 3;

        } else if (this.numberOfCoins >= 4){
            return 2;

        } else if (this.numberOfCoins >= 2){
            return 1;

        } else {
            return 0;
        }


    }

}