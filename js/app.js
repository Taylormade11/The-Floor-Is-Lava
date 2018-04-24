'use strict';

// Set attributes of canvas element
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 600;
var spacePressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Constructor for character sprites
function SpriteChar(xPos, yPos, width, height) {
  this.width = width;
  this.height = height;
  this.x = xPos;
  this.y = yPos;
  ctx.fillStyle = 'red';
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

// Create new SpriteChar instance
var player = new SpriteChar(canvas.width / 2, canvas.height / 2, 30, 30);

// Handles user pressing a key
function keyDownHandler(event) {

  // Checks which key is being pressed
  if (event.keyCode === 32) {
    spacePressed = true;
    console.log('space pressed');
  } else if (event.keyCode === 37) {
    leftPressed = true;
    console.log('left pressed');
  } else if (event.keyCode === 39) {
    rightPressed = true;
    console.log('right pressed');
  }

  // Updates character sprite's x/y coordinates
  updatePlayer();
}

// Handles user releasing a key
function keyUpHandler(event) {
  if (event.keyCode === 32) {
    spacePressed = false;
    console.log('space released');
  } else if (event.keyCode === 37) {
    leftPressed = false;
    console.log('left released');
  } else if (event.keyCode === 39) {
    rightPressed = false;
    console.log('right released');
  }
}

// Updates character sprites' x/y coordinates
function updatePlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  if (spacePressed) {
    player.y -= 25;
  } else if (leftPressed) {
    player.x -= 5;
  } else if (rightPressed) {
    player.x += 5;
  }
}