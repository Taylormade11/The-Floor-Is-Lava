<<<<<<< HEAD
'use strict';

window.onkeypress = function() {
  var jump = new Audio('audio/jump.wav');
  var sideways = new Audio('audio/124902__greencouch__beeps-231.wav');
  document.addEventListener('keydown', function(keyInput) {
    if (keyInput.which ===32) {
      jump.play();
      console.log(keyInput.which);
    }
    if (keyInput.which ===37 || keyInput.which===39) {
      sideways.play();
      console.log(keyInput.which);
    }
  });
};

=======
>>>>>>> 28c7f7ffac1618cf603fbda4b3003d9eb1b118b5
