'use strict';

var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 600;

function drawSprite() {
  ctx.fillStyle = 'red';
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 30, 30);
}

drawSprite();

