let playerGrid
let opponentGrid
let aiDifficulty = 50;

$(document).ready(function() {
  $("#message-log").hide();

  // make player board
  playerGrid = newRandomGrid();
  $board = newBoard("playerBoard");
  $board.addClass("game-grid");
  $("#player-container").append($board);

  // make opponent board
  opponentGrid = newRandomGrid();
  $board = newBoard("opponentBoard");
  $board.addClass("game-grid");
  $("#opponent-container").append($board);

  updateIcons(playerGrid, opponentGrid);

  $("#randomize-positions").click( () => {
    playerGrid = newRandomGrid();
    updateIcons(playerGrid, opponentGrid);
  });

  $("#start-game-button").click( () => {
    $(".buttons-container").addClass("button-hide");
    $("#message-log").show();
    passMessage("begin", "blue");
/*    $newGame = $("<div>").addClass("message-alert");
    $newGame.html("game has begun");
    $("#message-log").append($newGame);*/
    // change arrow box colour
  })

});

function passMessage(message, colour) {
  $message = $("<div>").addClass("message-alert").addClass("message-"+colour);
  $message.html(message);
  $("#message-log").append($message);
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

function opponentCellClick() {
  let moveObject = {};
  let classList = $(this).attr("Class").split(/\s+/);
  classList.forEach( (classElem) => parseClassList(classElem, moveObject));

  let row = moveObject.row;
  let col = moveObject.col;
  let opponentClass = getCoordinateClass(row, col, "opponent");

  if (opponentGrid[row][col] === "sea") {
    $(opponentClass).attr("src", iconCorrespondence.miss);
    passMessage("you missed", "red");
  } else {
    $(opponentClass).attr("src", iconCorrespondence.opponentSunk);
    passMessage("you hit a ship", "blue");
  }

  $(this).off("click");
  // remove glow
  // $(this)
  opponentTurn();
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