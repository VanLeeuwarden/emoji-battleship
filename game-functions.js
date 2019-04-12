// SHIP METHODS

function canPlaceShip(grid, shipSize, row, column, isVertical) {
  if (isVertical) {
    return canPlaceShipVertical(grid, shipSize, row, column);
  } else {
    return canPlaceShipHorizontal(grid, shipSize, row, column);
  }
}

function canPlaceShipHorizontal(grid, shipSize, row, col) {
  for (var i = 0; i < shipSize; i++) {
    if (!validSpot(grid, row, col+i)) {
      return false;
    }
  }
  return true;
}

function canPlaceShipVertical(grid, shipSize, row, col) {
  for (var i = 0; i < shipSize; i++) {
    if (!validSpot(grid, row+i, col)) {
      return false;
    }
  }
  return true;
}

function placeShip(grid, shipSize, shipIcon, row, col, isVertical) {
  if (isVertical) {
    placeShipVertical(grid, shipSize, shipIcon, row, col)
  } else {
    placeShipHorizontal(grid, shipSize, shipIcon, row, col)
  }
}

function placeShipHorizontal(grid, shipSize, shipIcon, row, col) {
  for (var i = 0; i < shipSize; i++) {
    grid[row][col+i] = shipIcon;
  }
}

function placeShipVertical(grid, shipSize, shipIcon, row, col) {
  for (var i = 0; i < shipSize; i++) {
    grid[row+i][col] = shipIcon;
  }
}


function validSpot(grid, row, col) {
  if (grid[row]) {
    if (grid[row][col]) {
      if (grid[row][col] === "sea") {
        return true;
      }
    }
  }
  return false;
}

function getRandomPoint() {
  var row = Math.floor(10 * Math.random());
  var column = Math.floor(10 * Math.random());
  return [row, column];
}

function populateGrid(grid) {
  var shipTileLengths = [5,4,3,3,2];
  let shipTileIdentifier = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];

  for (var ship=0 ; ship < 5 ; ship++) {
    while (true) {
      var possiblePoint = getRandomPoint();
      const row = possiblePoint[0];
      const col = possiblePoint[1];
      var isVert = !!Math.floor(2 * Math.random());

      if (canPlaceShip(grid, shipTileLengths[ship], row, col, isVert)) {
        placeShip(grid, shipTileLengths[ship], shipTileIdentifier[ship], row, col, isVert);
        break;
      }
    }
  }
}