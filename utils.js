
function passMessage(message, colour) {
  $("#message-log").css('color', colour);
  $("#message-log").html(message);
}

function newCell(row_i, col_j, celltype) {
  let $cell = $("<img>").addClass("cell");
  $cell.addClass(row_i).addClass(col_j).addClass(celltype);
  $cell.attr("src", "icons/sea.svg");
  if (celltype === "opponentBoard") {
    $cell.click(opponentCellClick);
  }
  return $cell;
}

function newRow(row_i, celltype) {
  let $row = $("<div>").addClass("game-row");
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
      opponentGrid[row][col] = "hit";
    } else {
      $(opponentClass).attr("src", iconCorrespondence.miss);
      oppponentGrid[row][col] = "miss";
    }
  }
}

function opponentCellClick() {
  if (gridClickable === true) {
    let moveObject = {};
    let classList = $(this).attr("Class").split(/\s+/);
    classList.forEach( (classElem) => parseClassList(classElem, moveObject));

    let row = moveObject.row;
    let col = moveObject.col;
    let opponentClass = getCoordinateClass(row, col, "opponent");

    if (opponentGrid[row][col] === "sea") {
      $(opponentClass).attr("src", iconCorrespondence.miss);
      passMessage("you missed", "red");
      opponentGrid[row][col] = "miss";
    } else {
      $(opponentClass).attr("src", iconCorrespondence.opponentSunk);
      passMessage("you hit a ship", "blue");
      opponentGrid[row][col] = "hit";
    }

    $(this).off("click");
    $(this).unbind();
    console.log($(this));
    // remove glow
    // $(this)
    opponentTurn();
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
      //let newSource2 = iconCorrespondence[opponentShip];
      let newSource2 = iconCorrespondence["sea"];
      $(opponentClass).attr("src", newSource2);
    }
  }
}

function updatePlayerIcons() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let playerClass = getCoordinateClass(i,j,"player");
      let playerShip = playerGrid[i][j]
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


// BUTTON FUNCTIONS

function newRandomGrid() {
  let grid = createGrid();
  populateGrid(grid);
  return grid;
}

function updateArrows(lastTurn, nextTurn) {
  $(lastTurn).css('background-color', 'inherit');
  $(nextTurn).css('background-color', '#fa5a5a')
}