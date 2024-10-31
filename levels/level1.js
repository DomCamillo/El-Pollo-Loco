const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),      // enemies
        new Endboss(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
 ],

      [
        new Cloud()         // clouds
      ],

     [
        new Backdrop('img/5_background/layers/3_third_layer/2.png', -720),
        new Backdrop('img/5_background/layers/2_second_layer/2.png', -720),
        new Backdrop('img/5_background/layers/1_first_layer/2.png', -720),
         new Backdrop('img/5_background/layers/3_third_layer/1.png', 0),
         new Backdrop('img/5_background/layers/2_second_layer/1.png', 0),
         new Backdrop('img/5_background/layers/1_first_layer/1.png', 0),
         new Backdrop('img/5_background/layers/3_third_layer/2.png', 720), // backdrop
         new Backdrop('img/5_background/layers/2_second_layer/2.png', 720),
         new Backdrop('img/5_background/layers/1_first_layer/2.png', 720),
         new Backdrop('img/5_background/layers/3_third_layer/1.png', 1440),
         new Backdrop('img/5_background/layers/2_second_layer/1.png', 1440),
         new Backdrop('img/5_background/layers/1_first_layer/1.png', 1440),
         new Backdrop('img/5_background/layers/3_third_layer/2.png', 2160),
         new Backdrop('img/5_background/layers/2_second_layer/2.png', 2160),
         new Backdrop('img/5_background/layers/1_first_layer/2.png', 2160),
         new Backdrop('img/5_background/layers/3_third_layer/1.png', 2880),
         new Backdrop('img/5_background/layers/2_second_layer/1.png', 2880),
         new Backdrop('img/5_background/layers/1_first_layer/1.png', 2880),
         new Backdrop('img/5_background/layers/3_third_layer/2.png', 3600),
         new Backdrop('img/5_background/layers/2_second_layer/2.png', 3600),
         new Backdrop('img/5_background/layers/1_first_layer/2.png', 3600),
         new Backdrop('img/5_background/layers/3_third_layer/1.png', 4320),
         new Backdrop('img/5_background/layers/2_second_layer/1.png', 4320),
         new Backdrop('img/5_background/layers/1_first_layer/1.png', 4320),
     ],

     [
      new Coin(900, 80), 
      new Coin(1000, 30), 
      new Coin(1100, 80),
      new Coin(2100, 90), 
      new Coin(2200, 40), 
      new Coin(2300, 90),
      new Coin(3200, 100), 
      new Coin(3300, 50), 
      new Coin(3400, 100),
      new Coin(3800, 30),
      
     ],

     [
      new Bottle(1000,320),
      new Bottle(2200,320),
      new Bottle(2800,320),
      new Bottle(3300,320),
      new Bottle(3900,320),
     ],


     

     



)