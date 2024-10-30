function openStory(){
    let storyContainer = document.getElementById('story-container');
    storyContainer.classList.toggle('display-None');
   
    
}
function openControls(){
    let optionContainer = document.getElementById('option-container');
    optionContainer.classList.toggle('display-None');
   
}
function openLegal(){
    let legalContainer = document.getElementById('legal-container');
    legalContainer.classList.toggle('display-None');
   
}
function startGame(){
    let titleImg = document.getElementById('title-img');
    titleImg.classList.add('display-None')
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);

    console.log('my character is', world.character );
    console.log('enemies are', world.level.enemies );

}