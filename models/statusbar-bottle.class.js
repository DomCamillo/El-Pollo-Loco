class statusBarBottles extends StatusbarHealth {
  collectedBottles = [];
  numberOfBottles = 0;

  imagesStatsBottle = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.imagesStatsBottle);
    this.img = this.imageCache[this.imagesStatsBottle[0]];
    this.setBottleStat(this.numberOfBottles);
  }
   /**
   * These two functions work together to adjust an object's health based on a 
   * percentage and select the appropriate image (e.g. for a status indicator like health, coins, bottles).
   * @param {100} percentage 
   */

  setBottleStat(numberOfBottles) {
    this.numberOfBottles = numberOfBottles;
    let path = this.imagesStatsBottle[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.numberOfBottles >= 10) {
      return 5;
    } else if (this.numberOfBottles > 8) {
      return 4;
    } else if (this.numberOfBottles > 6) {
      return 3;
    } else if (this.numberOfBottles > 4) {
      return 2;
    } else if (this.numberOfBottles >= 2) {
      return 1;
    } else {
      return 0;
    }
  }
}
