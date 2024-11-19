/*  cloneLevel(level) {
    return new Level(
      [...level.enemies],
      [...level.clouds],
      [...level.backdrops],
      [...level.Coin],
      [...level.Bottle]
    );
  }

  restartGame() {
    this.clearAllIntervals();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    world = new World(this.canvas, this.keyboard);
    world.level = this.cloneLevel(level1);

    document.getElementById("youWin-screen").classList.add("display-None");
    document.getElementById("youLose-screen").classList.add("display-None");
  } */

    /*  restartGame() {
      cancelAnimationFrame(world.animationFrameId);
      clearAllIntervals();
      clearAllTimeouts();
      initLevel();
      world = new World();
      world.level = 
      world.run();
      document.getElementById('end-game-buttons').style.display = 'none';
  } */

       /*  clearInterval(this.intervalId);
    this.intervalId = null; */



     /*  mo.colisionOutline(this.ctx); */



      /* colisionOutline(ctx){                // für collision outline
        if(this instanceof Character || 
        this instanceof Chicken ||
         this instanceof Coin ||
        this instanceof Bottle ||
        this instanceof smallChicken){
        ctx.beginPath();
        ctx.linewidth = '5'
        ctx.strokeStyle = "blue"
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
        
    } */