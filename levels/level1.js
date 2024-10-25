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
      new Items(),
      new Items(),
      new Items(),
      new Items(), // items
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
     ],

     /* [
      new Statusbar(),
      new Statusbar(),
      new Statusbar(),
     ], */


     



)