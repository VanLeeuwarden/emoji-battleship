//let array = [null, null, null, null, null, null, null, null, null, null];

$(document).ready(function() {
  $board = newBoard("playerBoard");
  $board.addClass("game-grid");
  $("#player-container").append($board);
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
    col_j = "col_" + j;
    let $cell = newCell(row_i, col_j, celltype);
    $row.append($cell);
  }
  return $row;
}

// celltype is player // opponent
function newBoard(celltype) {
  let $section = $("<section>");
  for (let i = 0; i < 10; i++) {
    row_i = "row_" + i;
    let $row = newRow(row_i, celltype);
    $section.append($row);
  }
  return $section;
}

function cellClick() {
  let classList = $(this).attr("Class").split(/\s+/);
  for (elemClass of classList) {
    console.log(elemClass);
  }
}