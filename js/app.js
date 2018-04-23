'use strict';

// Set attributes of canvas element
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 600;

// Create new SpriteChar instance
new SpriteChar(canvas.width / 2, canvas.height / 2, 30, 30);

// Constructor for character sprites
function SpriteChar(xPos, yPos, width, height) {
  this.width = width;
  this.height = height;
  this.x = xPos;
  this.y = yPos;
  ctx.fillStyle = 'red';
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var spacePressed = false;
var leftPressed = false;
var rightPressed = false;

function keyDownHandler(event) {
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
}