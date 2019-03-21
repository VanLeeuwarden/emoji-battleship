//let array = [null, null, null, null, null, null, null, null, null, null];

$(document).ready(function() {
  $board = newBoard("playerBoard");
  $board.addClass("game-grid");
  $("#player-container").append($board);

/*  $board = newBoard("opponentBoard");
  $board.addClass("game-grid");
  $("#opponent-container").append($board);*/
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
  console.log(moveObject);

  if (moveObject.row === 2) {
    $(this).attr("src", "icons/angry.svg");
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