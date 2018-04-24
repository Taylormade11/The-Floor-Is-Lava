'use strict';

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