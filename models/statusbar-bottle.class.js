class statusBarBottles extends StatusbarHealth{


    collectedBottles = [];
    numberOfBottles = 0;

    imagesStatsBottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    
    constructor(){
        super().loadImage(this.imagesStatsBottle[0]);
       
        /* this.setPercentage(100,) */
        
        
        
    }

   /*  displayBottles(){
        if(this.collectedBottles < this.percentage){
            
        }
    }

    
    setPercentage(percentage){
        this.percentage = percentage
        let path = this.imagesStatsBottle[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){ 
        if(this.percentage == 100){
            return 5;

        } else if (this.percentage > 80){
            return 4;

        } else if (this.percentage > 60){
            return 3;

        } else if (this.percentage > 40){
            return 2;

        } else if (this.percentage > 20){
            return 1;

        } else {
            return 0;
        }


    } */

}