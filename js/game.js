let canvas;
let world;
let keyboard = new Keyboard()
let  isMuted = false;
 allSounds = [];  // array für alle sounds

function init(){

    canvas = document.getElementById('canvas');
    
    
    world = new World(canvas, keyboard);

    console.log('my character is', world.character );
    console.log('enemies are', world.level.enemies );

    
}

function mutePage() {
    let muteIMG = document.getElementById('mute-img');
    isMuted = muteIMG.src.includes('volume-off-solid_.png'); 
    muteIMG.src = isMuted ? 'img/my_images/volume-up-solid_.png' : 'img/my_images/volume-off-solid_.png';
    
    isMuted = !isMuted;
    allSounds.forEach(sound => {
        if (sound instanceof Audio) { 
            sound.muted = isMuted;
        }
    });
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
    if (e.keyCode == 70){
        keyboard.F = true;
    }

    
    



   

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
    if (e.keyCode == 70){
        keyboard.F = false;
    } 

});

  

