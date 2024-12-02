class Level {
    enemies;
    clouds;
    backdrops;
    Coin;
    Bottle;
    
   /** 
    * adds different objhects to the level 
    */

    level_end = 4100;

    constructor(enemies, clouds, backdrops, Coin, Bottle, ){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backdrops = backdrops;
        this.Coin = Coin;
        this.Bottle = Bottle;
       
        
    }
}

