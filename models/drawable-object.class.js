
/**
 * The DrawableObject class serves as the basis for representing objects in your game that can be drawn.
 *  It contains properties and functions for loading images and displaying them on the canvas.
 */

class DrawableObject {
  height = 150;
  width = 200;
  x = 120;
  y = 190;
  imageCache = {};
  img;
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
/**
 * Prepare animations as all images are loaded in advance.
 * @param {img} arr 
 */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
/**
 * Draws the current image (this.img) onto the canvas.
 * @param {img} ctx 
 */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log("Error loading image", e);
      console.log("this image could not load ", this.img.src);
    }
  }
}
