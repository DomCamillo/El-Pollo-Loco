class StatusbarHealth extends DrawableObject {
  imagesStatsHealth = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super().loadImages(this.imagesStatsHealth);

    this.setPercentage(100);
    this.x = -100;
    this.y = 0;
    this.width = 150;
    this.height = 50;
  }
  /**
   * These two functions work together to adjust an object's health based on a 
   * percentage and select the appropriate image (e.g. for a status indicator like health).
   * @param {100} percentage 
   */

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.imagesStatsHealth[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
