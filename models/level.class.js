class Level {
    enemies;
    clouds;
    backdrops;
    level_end = 2200;

    constructor(enemies,clouds,backdrops){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backdrops = backdrops;
    }
}