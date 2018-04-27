'use strict';

var firstFill = document.getElementById('firstScore');
var secondFill = document.getElementById('secondScore');
var thirdFill = document.getElementById('thirdScore');
var fourthFill = document.getElementById('fourthScore');
var fifthFill = document.getElementById('fifthScore');
var sixthFill = document.getElementById('sixthScore');
var seventhFill = document.getElementById('seventhScore');

var HighScore = {
  2150000: 'PR',
  2100000: 'TE',
  2050000: 'MAK',
  2000000: 'CCH',
  1900000: 'GB',
  1650000: 'AG',
  1400000: 'AB',
};
var sortable = [];
for (var initials in HighScore) {
  sortable.push([parseInt(initials), HighScore[parseInt(initials)]]);
}

var userInitials= localStorage.getItem('local-user-initials');
var userScore = localStorage.getItem('local-score');

sortable.push([parseInt(userScore), userInitials]);
sortable.sort(function(a, b){return b[0] - a[0];});

function tableContent() {
  firstFill.textContent = sortable[0][0] + ' ' + sortable[0][1];
  secondFill.textContent = sortable[1][0] + ' ' + sortable[1][1];
  thirdFill.textContent = sortable[2][0] + ' ' + sortable[2][1];
  fourthFill.textContent = sortable[3][0] + ' ' + sortable[3][1];
  fifthFill.textContent = sortable[4][0] + ' ' + sortable[4][1];
  sixthFill.textContent = sortable[5][0] + ' ' + sortable[5][1];
  seventhFill.textContent = sortable[6][0] + ' ' + sortable[6][1];
}

tableContent();
