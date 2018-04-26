'use strict';

var startScore = 2000000;

//select the id for canvas to draw to
var canvas = document.getElementById('game-screen');
// sets the context of the canvas to 2d
var context = canvas.getContext('2d');

window.onload = function() {
  var secs = 0;
  document.addEventListener('keydown', function(keyInput) {
    if (keyInput.which ===83) {
      setInterval(function(){
        secs++; console.log(secs);
        var score = startScore - (secs * 50000);
        var display = document.getElementById('time');
        display.textContent = secs + ' seconds ' + score;
        console.log(score);
      }, 1000);
    }
  });
};

// size of the tiles (platforms) to be drawn
var tileSize = 30;
// variable for size of columns and rows on levelMap
var levelColumn = 25;
var levelRow = 20;

var jumpDelay = 0;
var pauseDelay = 0;

// tile map for level 1 is black block rest are white
var levelMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2],
  [1,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1,2,2,2],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
  [1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
];

function renderLevel(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  var tileSrc = document.getElementById('brick-tile');
  for(var i=0; i < levelRow; i++){
    for(var j=0; j <levelColumn; j++){
      if(levelMap[i][j]===1){
        context.drawImage(tileSrc, j*tileSize, i*tileSize, tileSize, tileSize);
      }
    }
  }
}

function renderblue(){
  context.fillStyle='#00FFFF';
  for(var i=0; i < levelRow; i++){
    for(var j=0; j <levelColumn; j++){
      if(levelMap[i][j]===2){
        context.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
      }
    }
  }
}

function renderLava(){
  var tileLava = document.getElementById('lava-tile');
  for(var i=0; i < levelRow; i++){
    for(var j=0; j <levelColumn; j++){
      if(levelMap[i][j]===3){
        context.drawImage(tileLava, j*tileSize, i*tileSize, tileSize, tileSize);
      }
    }
  }
}

// renderLava();

var ourSpriteCharacter;
var gameFloors;
var paused = false; // Game starts in a paused state

var thud = new Audio('audio/thud.wav');
var sideways = new Audio('audio/jump.wav');
var jump = new Audio('audio/124902__greencouch__beeps-231.wav');

// Starts the game by creating our Sprite, rendering the floor(s) & the start method of our gamescreen object.
function startGame() {
  ourSpriteCharacter = new Sprite(27, 27, 60, 400);
  // gameFloors = new CreateFloor(7150, 40, 0, 540);
  gameScreen.start();
  renderLava();
  renderLevel();
  renderblue();
}

// // Creates floor with parameters fed, may be able to feed it multiple blocks and compare all floors for object detection at one time.
// function CreateFloor(width, height, x, y) {
//   var canvas = document.getElementById('game-screen');
//   var ctx = canvas.getContext('2d');
//   ctx.fillStyle = 'red';
//   ctx.fillRect(x, y, width, height);
// }

// Grabs our game-screen canvas, sets h/w and context. Sets interval timing to run function every 25ms and event listeners on the entire window for events. Individual listeners at the bottom of the page for single button actions.
var gameScreen = {
  canvas : document.getElementById('game-screen'),
  start : function() {
    this.canvas.width = 750;
    this.canvas.height = 600;
    this.context = this.canvas.getContext('2d');
    this.interval = setInterval(updateGameArea, 16);
    window.addEventListener('keydown', function (event) {
      event.preventDefault();

      gameScreen.pressed = (gameScreen.pressed || []);
      gameScreen.pressed[event.keyCode] = (event.type === 'keydown');
    });
    window.addEventListener('keyup', function (event) {
      gameScreen.pressed[event.keyCode] = (event.type === 'keydown');
    });
  },
  stop : function() {
    clearInterval(this.interval);
  },

  // clears the entire canvas except for the floor area & a little bit above it, smears the block on diagonal descent, but preserves the block for now.
  clear : function() {
    if (jumpDelay > 0) {
      jumpDelay -= 30;
    }
    if (pauseDelay > 0) {
      pauseDelay -= 30;
    }
  }
};

// Creates sprite with inputs we feed it, and gives it an update method and updatedPos method. Also applies speeds and gravity effects.
function Sprite(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 4;
  this.update = function() {
    var ctx = gameScreen.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.updatedPosition = function() {
    this.x += this.speedX;
    this.y += this.speedY + this.gravity;
  };
}

// Looks for a lavaCollision between the Sprite y location, if it reaches where the edge of the floor is drawn it console logs a loss message and prompts alert and stops the updating... or form to enter name into for highscore?
function lavaCollision() {
  if (ourSpriteCharacter.y > 540) {
    console.log('sorry you hit the lava, you lose');
    gameScreen.stop();
    thud.play();
    alert('sorry you hit the lava, you lose');
  }
}

// Looks for a collision between the sprite's y location and the top row of blocks in the canvas
function cielCollision() {
  if (ourSpriteCharacter.y <= 0 + tileSize) {
    ourSpriteCharacter.y = 0 + tileSize;
    thud.play(); }
}

// Looks for a collision between the sprite and the inner blocks and side walls (not cieling or lava)
function wallCollision() {
  var baseCol = Math.floor(ourSpriteCharacter.x/tileSize);
  var baseRow = Math.floor(ourSpriteCharacter.y/tileSize);
  var colOverlap = ourSpriteCharacter.x % tileSize;
  var rowOverlap = ourSpriteCharacter.y % tileSize;

  // checking for vertical collisions downward but not upwards so we can jump through them.
  if(ourSpriteCharacter.speedY<=0){
    if((levelMap[baseRow+1][baseCol] && !levelMap[baseRow][baseCol]) || (levelMap[baseRow+1][baseCol+1] && !levelMap[baseRow][baseCol+1] && colOverlap)){
      ourSpriteCharacter.y=(baseRow)*tileSize;
    }
  }

  baseCol = Math.floor(ourSpriteCharacter.x/tileSize);
  baseRow = Math.floor(ourSpriteCharacter.y/tileSize);
  colOverlap = ourSpriteCharacter.x%tileSize;
  rowOverlap = ourSpriteCharacter.y%tileSize;

  // Right collision detection
  if(ourSpriteCharacter.speedX>0){
    if((levelMap[baseRow][baseCol+1] && !levelMap[baseRow][baseCol]) || (levelMap[baseRow+1][baseCol+1] && !levelMap[baseRow+1][baseCol] && rowOverlap)){
      ourSpriteCharacter.x = baseCol * tileSize;
    }
  }

  // Left collision detection
  if(ourSpriteCharacter.speedX<0){
    if((!levelMap[baseRow][baseCol+1] && levelMap[baseRow][baseCol]) || (!levelMap[baseRow+1][baseCol+1] && levelMap[baseRow+1][baseCol] && rowOverlap)){
      ourSpriteCharacter.x = (baseCol+1) * tileSize;
    }
  }
}

// Toggle between paused and un-paused game states with "p"
function togglePause() {
  if (!paused && pauseDelay === 0 && gameScreen.pressed && gameScreen.pressed[80]) {
    paused = true;
    pauseDelay += 1200;
    console.log('paused');
  } else if (paused && pauseDelay ===0 &&gameScreen.pressed && gameScreen.pressed[80]) {
    paused = false;
    pauseDelay += 300;
    console.log('unpaused');
  }
}

// Defines all user input to interact with the sprite character
function spriteMovement() {
  if (gameScreen.pressed && (gameScreen.pressed[37] || gameScreen.pressed[65])) {
    ourSpriteCharacter.speedX = -3;
    sideways.play();
  }
  if (gameScreen.pressed && (gameScreen.pressed[39] || gameScreen.pressed[68])) {
    ourSpriteCharacter.speedX = 3;
    sideways.play();
  }
  if (jumpDelay === 0 && gameScreen.pressed && gameScreen.pressed[32]) {
    jump.play();
    jumpDelay += 1200;
  } if (jumpDelay > 400 && jumpDelay <= 1200) {
    ourSpriteCharacter.speedY = -7;
  } else {
    ourSpriteCharacter.speedY = 0;
  }
}

// updates game-screen and clears old images so it isn't drawing lines with the past square's locations. Listens for A & D or Left and Right arrows for X axis movement. Listens for spacebar for jump / negative Y movement. Every time you jump it sets the Jump delay to 400 ms and then each clear loop decrements the jump delay 25ms until it is 0 again. Can not jump unless jumpDelay is back to 0. Redraws floor because of the clear, but we can only clear above the floor with the right measurements so it only has to be drawn once.
function updateGameArea() {
  renderLevel();
  renderblue();
  renderLava();
  gameScreen.clear();
  spriteMovement();

  togglePause();
  if (paused === false) {
    ourSpriteCharacter.updatedPosition();
    ourSpriteCharacter.update();
  }

  // CreateFloor(7150, 40, 0, 560);

  // Checks if sprite has impacted the ceiling (top row of blocks)
  cielCollision();

  // Looks for a lavaCollision with the floor each update loop (25ms);
  lavaCollision();

  // Checks if sprite has impacted internal blocks or side walls;
  wallCollision();
}

startGame();
renderLevel();
renderblue();
renderLava();