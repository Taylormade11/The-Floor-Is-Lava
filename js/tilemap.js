(function(){
  //select the id for canvas to draw to
  var canvas = document.getElementById('canvas');
  //sest the context of the canvas to 2d
  var context = canvas.getContext('2d');
  // size of the tiles (platforms) to be drawn
  var tileSize = 30;
  // variable for size of columns and rows on levelMap
  var levelColumn = 11;
  var levelRow = 15;

  // tile map for level 1 is black block rest are white
  var levelMap = [
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]
  ];

  //sets the canvas size to match levelMap size... i think this helps with
  // anti aliasing / rendering issues with browser resizing (we can change level rows and columns to suit our needs)
  canvas.width=tileSize * levelColumn;
  canvas.height=tileSize * levelRow;

  //calling function to render the map
  renderLevel();

  // the function to render level. first clears map, sets fillstyle to black boxes (later .png locations for textures / assets)
  function renderLevel(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle='#000000';
    for(i=0; i < levelRow; i++){
      for(j=0; j <levelColumn; j++){
        if(levelMap[i][j]==1){
          context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
        }
      }
    }
  }
})();