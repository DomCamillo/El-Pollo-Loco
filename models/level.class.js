class Level {
    enemies;
    clouds;
    backdrops;
    items;

    level_end = 2200;

    constructor(enemies,clouds,backdrops,items){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backdrops = backdrops;
        this.items = items;
        
    }
}