let level1;

function initLevel() {
  level1 = new Level(
    [
     
      new Chicken(1200),
      new smallChicken(1500),

      new Chicken(1900),
      new Chicken(2600), // enemies
      new Chicken(3000),
      new Chicken(3700), // enemies
      new Chicken(4200),
      new smallChicken(4400), // enemies
    ],

    [
      new Cloud(500),
      new Cloud(1500), // clouds
      new Cloud(3000),
      new Cloud(4200), // clouds
    ],

    [
      new Backdrop('img/5_background/layers/3_third_layer/2.png', -719),
      new Backdrop('img/5_background/layers/2_second_layer/2.png', -719),
      new Backdrop('img/5_background/layers/1_first_layer/2.png', -719),
      new Backdrop('img/5_background/layers/3_third_layer/1.png', -1),
      new Backdrop('img/5_background/layers/2_second_layer/1.png', -1),
      new Backdrop('img/5_background/layers/1_first_layer/1.png', -1),
      new Backdrop('img/5_background/layers/3_third_layer/2.png', 719), // backdrop
      new Backdrop('img/5_background/layers/2_second_layer/2.png', 719),
      new Backdrop('img/5_background/layers/1_first_layer/2.png', 719),
      new Backdrop('img/5_background/layers/3_third_layer/1.png', 1439),
      new Backdrop('img/5_background/layers/2_second_layer/1.png', 1439),
      new Backdrop('img/5_background/layers/1_first_layer/1.png', 1439),
      new Backdrop('img/5_background/layers/3_third_layer/2.png', 2159),
      new Backdrop('img/5_background/layers/2_second_layer/2.png', 2159),
      new Backdrop('img/5_background/layers/1_first_layer/2.png', 2159),
      new Backdrop('img/5_background/layers/3_third_layer/1.png', 2879),
      new Backdrop('img/5_background/layers/2_second_layer/1.png', 2879),
      new Backdrop('img/5_background/layers/1_first_layer/1.png', 2879),
      new Backdrop('img/5_background/layers/3_third_layer/2.png', 3599),
      new Backdrop('img/5_background/layers/2_second_layer/2.png', 3599),
      new Backdrop('img/5_background/layers/1_first_layer/2.png', 3599),
      new Backdrop('img/5_background/layers/3_third_layer/1.png', 4319),
      new Backdrop('img/5_background/layers/2_second_layer/1.png', 4319),
      new Backdrop('img/5_background/layers/1_first_layer/1.png', 4319),
    ],

    /* [
      new Backdrop("img/5_background/layers/3_third_layer/2.png", -720),
      new Backdrop("img/5_background/layers/2_second_layer/2.png", -720),
      new Backdrop("img/5_background/layers/1_first_layer/2.png", -720),
      new Backdrop("img/5_background/layers/3_third_layer/1.png", 0),
      new Backdrop("img/5_background/layers/2_second_layer/1.png", 0),
      new Backdrop("img/5_background/layers/1_first_layer/1.png", 0),
      new Backdrop("img/5_background/layers/3_third_layer/2.png", 720), // backdrop
      new Backdrop("img/5_background/layers/2_second_layer/2.png", 720),
      new Backdrop("img/5_background/layers/1_first_layer/2.png", 720),
      new Backdrop("img/5_background/layers/3_third_layer/1.png", 1440),
      new Backdrop("img/5_background/layers/2_second_layer/1.png", 1440),
      new Backdrop("img/5_background/layers/1_first_layer/1.png", 1440),
      new Backdrop("img/5_background/layers/3_third_layer/2.png", 2160),
      new Backdrop("img/5_background/layers/2_second_layer/2.png", 2160),
      new Backdrop("img/5_background/layers/1_first_layer/2.png", 2160),
      new Backdrop("img/5_background/layers/3_third_layer/1.png", 2880),
      new Backdrop("img/5_background/layers/2_second_layer/1.png", 2880),
      new Backdrop("img/5_background/layers/1_first_layer/1.png", 2880),
      new Backdrop("img/5_background/layers/3_third_layer/2.png", 3600),
      new Backdrop("img/5_background/layers/2_second_layer/2.png", 3600),
      new Backdrop("img/5_background/layers/1_first_layer/2.png", 3600),
      new Backdrop("img/5_background/layers/3_third_layer/1.png", 4320),
      new Backdrop("img/5_background/layers/2_second_layer/1.png", 4320),
      new Backdrop("img/5_background/layers/1_first_layer/1.png", 4320),
    ], */

    [
      new Coin(900, 200),
      new Coin(1050, 150),
      new Coin(1200, 200),

      new Coin(2100, 200),
      new Coin(2350, 150),
      new Coin(2500, 200),

      new Coin(3200, 200),
      new Coin(3450, 150),
      new Coin(3550, 200),

      new Coin(3800, 200),
    ],

    [
      new Bottle(300, 320),
      new Bottle(400, 320),
      new Bottle(500, 320),
      new Bottle(600, 320),
      new Bottle(700, 320),
      new Bottle(800, 320),
      new Bottle(900, 320),
      new Bottle(2200, 320),
      new Bottle(2800, 320),
      new Bottle(3300, 320),
      new Bottle(3900, 320),
    ]
  );
}
