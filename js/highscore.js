var firstFill = document.getElementById('firstScore');
var highScore = {
  1650000: 'MF',
  1350000: 'AB',
  1750000: 'AG',
  1100000: 'CL',
  1000000: 'CM',
  900000: 'JF',
  700000: 'AAA',

};
var sortable = [];
for (var initials in highScore) {
  sortable.push([parseInt(initials), highScore[parseInt(initials)]]);
}

var storeGoal = localStorage.getItem('local-score');
var storeInitial= localStorage.getItem('local-user-initials');
sortable.push([parseInt(storeGoal), storeInitial]);
sortable.sort(function(a, b){return b[0] - a[0];});

function tableContent() {
  firstFill.textContent = sortable[0][0] + ' ' + sortable[0][1];
}







tableContent();