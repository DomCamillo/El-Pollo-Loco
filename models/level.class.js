class Level {
    enemies;
    clouds;
    backdrops;
    items;
    statusBars;

    level_end = 4100;

    constructor(enemies,clouds,backdrops,items,statusBars){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backdrops = backdrops;
        this.items = items;
      /*   this.statusBars = statusBars; */
        
    }
}