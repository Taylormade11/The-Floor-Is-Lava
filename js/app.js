'use strict';

var img = new Image();
img.src = 'img/velociraptor.svg';

// Set attributes of canvas element
var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 600;

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(player);

  if (spacePressed) {
    player.y -= 1;
  } else if (leftPressed) {
    player.x -= 1;
  } else if (rightPressed) {
    player.x += 1;
  }

  ctx.drawImage(img, player.x, player.y);
  requestAnimationFrame(draw);
}

var spacePressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

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

  draw();
}

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