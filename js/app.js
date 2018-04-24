'use strict';

var canvas = document.getElementById('game-screen');
this.ctx = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 600;


new SpriteChar(canvas.width / 2, canvas.height / 2, 30, 30);

function SpriteChar(xPos, yPos, width, height) {
  this.width = width;
  this.height = height;
  this.x = xPos;
  this.y = yPos;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(this.x, this.y, this.width, this.height);
}