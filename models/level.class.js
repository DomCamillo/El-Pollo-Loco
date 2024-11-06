class Level {
    enemies;
    clouds;
    backdrops;
    Coin;
    Bottle;
    endBoss;
   

    level_end = 4100;

    constructor(enemies, clouds, backdrops, Coin, Bottle, endBoss){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backdrops = backdrops;
        this.Coin = Coin;
        this.Bottle = Bottle;
        this.endBoss = endBoss;
       
        
    }
}

