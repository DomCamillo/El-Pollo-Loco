class statusBarBossHealth extends DrawableObject {

   
    y = 0;
    x;
    percentage;
    imagesBossHealth = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];


   
constructor(){
    super();
    this.loadImages(this.imagesBossHealth);
    this.width = 150;
    this.height = 50;
    this.img = this.imageCache[this.imagesBossHealth[0]]; 
    this.setPercentage(100)
    this.x = -100;
}

    
setPercentage(percentage){
    this.percentage = percentage
    let path = this.imagesBossHealth[this.resolveImageIndex()]
    this.img = this.imageCache[path];
}

resolveImageIndex(){ 
    if(this.percentage == 100){
        return 5;

    } else if (this.percentage >= 80){
        return 4;

    } else if (this.percentage >= 60){
        return 3;

    } else if (this.percentage >= 40){
        return 2;

    } else if (this.percentage >= 20){
        return 1;

    } else {
        return 0;
    }


}


}