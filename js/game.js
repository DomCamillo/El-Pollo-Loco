let canvas;
let world;
let keyboard = new Keyboard()


function init(){

    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);

    console.log('my character is', world.character );
    console.log('enemies are', world.enemies );
    
}

 document.addEventListener('keydown', (e) => {
    
    if (e.keyCode == 68){
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 87){
        keyboard.UP = true;
    }

    if (e.keyCode == 65){
        keyboard.LEFT = true;
    }

    if (e.keyCode == 83){
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if (e.keyCode == 16){
        keyboard.SHIFT = true;
    }



    console.log(e);
});


 document.addEventListener('keyup', (e) => {
    
    if (e.keyCode == 68){
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 87){
        keyboard.UP = false;
    }

    if (e.keyCode == 65){
        keyboard.LEFT = false;
    }

    if (e.keyCode == 83){
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if (e.keyCode == 16){
        keyboard.SHIFT = false;
    }



    console.log(e);
});