'use strict';
// window.onkeypress = function() {
//   var key = window.onkeypress.event;
//   if (key===32) {
//     var test = new Audio('audio/336928__shnur__blip3 - Copy.wav');
//     test.play();
//   }
// };

// document.addEventListener('keydown', function(keyInput) {
//   console.log(keyInput.which);
// });

window.onkeypress = function() {
  var jump = new Audio('audio/336928__shnur__blip3 - Copy.wav');
  var sideways = new Audio('audio/124902__greencouch__beeps-231.wav');
  document.addEventListener('keydown', function(keyInput) {
    if (keyInput.which ===32) {
      jump.play();
    }
    if (keyInput.which ===37 || keyInput.which===39) {
      sideways.play();
    }
  });
};

// window.onkeypress = function() {
//   var sideways = new Audio('audio/124902__greencouch__beeps-231.wav');
//   document.addEventListener('keydown', function(keyInput) {
//     console.log(keyInput.which);
//     if (keyInput.which ===37 || keyInput.which===39) {
//       sideways.play();
//     }
//   });
// };


// var i = 0;
// while(i < 40){
//   i++;
//   test.play();
// } 32, 37, 39 are key chars