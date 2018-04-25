'use strict';

var startScore = 400000;
//select the id for canvas to draw to
var canvas = document.getElementById('game-screen');
//sest the context of the canvas to 2d
var context = canvas.getContext('2d');
// size of the tiles (platforms) to be drawn
var tileSize = 30;
// variable for size of columns and rows on levelMap
var levelColumn = 25;
var levelRow = 20;
var startTime = Date.now();

function timeStamp () {
  var startTime =Date.now();
}


// tile map for level 1 is black block rest are white
var levelMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1],
  [1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

function renderLevel(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle='#000000';
  for(var i=0; i < levelRow; i++){
    for(var j=0; j <levelColumn; j++){
      if(levelMap[i][j]===1){
        context.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
      }
    }
  }
}

CreateFloor();

var ourSpriteCharacter;
var gameFloors;
var canvas = document.getElementById('game-screen');
var paused = false; // Game starts in a paused state
var thud = new Audio('audio/thud.wav');
var sideways = new Audio('audio/jump.wav');
var jump = new Audio('audio/124902__greencouch__beeps-231.wav');


// Starts the game by creating our Sprite, rendering the floor(s) & the start method of our gamescreen object.

//var thud = new Audio('audio/thud.wav');


function startGame() {
  ourSpriteCharacter = new Sprite(30, 30, canvas.width / 2, canvas.height / 2);
  gameFloors = new CreateFloor(7150, 40, 0, 560);
  gameScreen.start();
  renderLevel();
}

// Creates floor with parameters fed, may be able to feed it multiple blocks and compare all floors for object detection at one time.

function CreateFloor(width, height, x, y) {
  var canvas = document.getElementById('game-screen');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, width, height);
}

var jumpDelay = 0;

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
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (jumpDelay > 0) {
      jumpDelay -= 30;
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
  this.gravity = 0.15;
  this.gravitySpeed = .01;
  this.update = function() {
    var ctx = gameScreen.context;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.updatedPosition = function() {
    this.x += this.speedX;
    this.gravitySpeed += this.gravity;
    this.y += this.speedY + this.gravitySpeed;
    // Trying to control/set a limit on how fast sprite can travel in y axis up and down. But once it reaches that speed it stays that speed and won't change direction. Need to go about differently, possibly globally
    // if (this.speedY >= 7) {
    //   this.speedY = 7;
    // } else if (this.speedY <= -50) {
    //   this.speedY = -50;
    // }
  };
}

// Looks for a collision between the Sprite y location, if it reaches where the edge of the floor is drawn it console logs a loss message and prompts alert and stops the updating... or form to enter name into for highscore?

function collision() {
  if (ourSpriteCharacter.y > 560) {
    console.log('sorry you hit the lava, you lose');
    gameScreen.stop();
    thud.play();
    alert('sorry you hit the lava, you lose');
  } else {
    console.log('no collision with floor detected yet');
  }
}

// Toggle between paused and un-paused game states with "p"
function togglePause() {
  if (!paused && gameScreen.pressed[80]) {
    paused = true;
    console.log('paused');
  } else if (paused && gameScreen.pressed[80]) {
    paused = false;
    console.log('unpaused');
  }
}

// updates game-screen and clears old images so it isn't drawing lines with the past square's locations. Listens for A & D or Left and Right arrows for X axis movement. Listens for spacebar for jump / negative Y movement. Every time you jump it sets the Jump delay to 400 ms and then each clear loop decrements the jump delay 25ms until it is 0 again. Can not jump unless jumpDelay is back to 0. Redraws floor because of the clear, but we can only clear above the floor with the right measurements so it only has to be drawn once.

function updateGameArea() {
  renderLevel();
  gameScreen.clear();
  if (gameScreen.pressed[37]) {ourSpriteCharacter.speedX = -3.5;
    sideways.play(); }
  if (gameScreen.pressed[65]) {ourSpriteCharacter.speedX = -3.5;
    sideways.play(); }
  if (gameScreen.pressed[39]) {ourSpriteCharacter.speedX = 3.5;
    sideways.play();}
  if (gameScreen.pressed[68]) {ourSpriteCharacter.speedX = 3.5;
    sideways.play();}
  if (jumpDelay === 0 && gameScreen.pressed[32]) {
    ourSpriteCharacter.speedY += -10;
    jump.play();
    jumpDelay += 1200;
    console.log('jump recorded, now wait a little bit before you can jump again so you don\'t cheat and fly through the level!');
  }

  if (gameScreen.pressed && gameScreen.pressed[40]) {ourSpriteCharacter.speedY += .5; }

  togglePause();
  if (paused === false) {
    ourSpriteCharacter.updatedPosition();
    ourSpriteCharacter.update();
  }
  CreateFloor(7150, 40, 0, 560);

  // Looks for a collision with the floor each update loop (25ms);
  collision();
}

startGame();
renderLevel();



