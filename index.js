let playerGrid = createGrid();
let opponentGrid = createGrid();

$(document).ready(function() {


  populateGrid(playerGrid);
  populateGrid(opponentGrid);


  $board = newBoard("playerBoard");
  $board.addClass("game-grid");
  $("#player-container").append($board);

  $board = newBoard("opponentBoard");
  $board.addClass("game-grid");
  $("#opponent-container").append($board);


  updateIcons(playerGrid, opponentGrid);
});

function newCell(row_i, col_j, celltype) {
  let $cell = $("<img>").addClass("cell");
  $cell.addClass(row_i).addClass(col_j).addClass(celltype);
  $cell.attr("src", "icons/sea.svg");
  $cell.click(cellClick);
  return $cell;
}

function newRow(row_i, celltype) {
  let $row = $("<div>");//.addClass("game-row");
  for (let j=0; j < 10; j++) {
    row_j = "row_" + j;
    let $cell = newCell(row_i, row_j, celltype);
    $row.append($cell);
  }
  return $row;
}

// celltype is player // opponent
function newBoard(celltype) {
  let $section = $("<section>");
  for (let i = 0; i < 10; i++) {
    col_i = "col_" + i;
    let $row = newRow(col_i, celltype);
    $section.append($row);
  }
  return $section;
}

function cellClick() {
  let moveObject = {};
  let classList = $(this).attr("Class").split(/\s+/);
  classList.forEach( (classElem) => parseClassList(classElem, moveObject));

  if (moveObject.board === "player") {
    let row = moveObject.row;
    let col = moveObject.col;
    //playerGrid[row][col] = "missile";
    console.log(playerGrid[row][col]);
    let playerClass = getCoordinateClass(row, col, "player");

    if (playerGrid[row][col] !== "sea") {
      $(playerClass).attr("src", iconCorrespondence.playerSunk);
    } else if (playerGrid[row][col] === "sea") {
      $(playerClass).attr("src", iconCorrespondence.miss);
    }
  }

  else if (moveObject.board === "opponent") {
    let row = moveObject.row;
    let col = moveObject.col;
    //opponentGrid[row][col] = "missile";
    let opponentClass = getCoordinateClass(row, col, "opponent");
    if (opponentGrid[row][col] !== "sea") {
      $(opponentClass).attr("src", iconCorrespondence.opponentSunk);
    } else {
      $(opponentClass).attr("src", iconCorrespondence.miss);
    }
  }
}

function parseClassList(classElem, moveObject) {
  if (classElem.slice(0,3) === "row") {
    moveObject.row = parseInt(classElem.charAt(4));
  }
  else if (classElem.slice(0,3) === "col") {
    moveObject.col = parseInt(classElem.charAt(4));
  }
  else if (classElem === "playerBoard") {
    moveObject.board = "player";
  } else if (classElem === "opponentBoard") {
    moveObject.board = "opponent";
  }
}

function classToObject() {}

const iconCorrespondence = {
  carrier: "icons/angry.svg",
  battleship: "icons/emoji.svg",
  cruiser: "icons/suspicious.svg",
  submarine: "icons/nerd.svg",
  destroyer: "icons/cool.svg",

  sea: "icons/sea.svg",

  playerSunk: "icons/shocked.svg",
  opponentSunk: "icons/redface.svg",
  miss: "icons/fish(1).svg"
};


function createGrid() {
  var grid = [];
  for (var i=0; i < 10; i++) {
    let seaRow = Array(10).fill("sea");
    grid.push(seaRow);
  }

  return grid
}

function newGame(playerGrid, opponentGrid) {
  playerGrid = createGrid();
  opponentGrid = createGrid();
}

function newShipCounters() {
  let counters = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  };
  return counters;
}

function updateIcons(playerGrid, opponentGrid) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let playerClass = getCoordinateClass(i, j, "player");
      let playerShip = playerGrid[i][j];
      let newSource = iconCorrespondence[playerShip];
      $(playerClass).attr("src", newSource);

      let opponentClass = getCoordinateClass(i, j, "opponent");
      let opponentShip = opponentGrid[i][j];
      let newSource2 = iconCorrespondence[opponentShip];
      $(opponentClass).attr("src", newSource2);
    }
  }
}

function getCoordinateClass(i,j,type) {
  let row = ".row_" + i;
  let col = ".col_" + j;
  let board = "." + type + "Board";

  let classes = row+col+board;
  return classes;
}








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