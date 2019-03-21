//let array = [null, null, null, null, null, null, null, null, null, null];

$(document).ready(function() {

  for (let i =0; i<10; i++) {
    let $row = newRow();
    $("#player-grid").append($row);
  }

});

function newCell() {
  let $cell = $("<img>").addClass("cell");
  $cell.attr("src", "icons/sea.svg");
  return $cell;
}

function newRow() {
  let $row = $("<div>").addClass("game-row");
  for (let i=0; i < 10; i++) {
    let $cell = newCell();
    $row.append($cell);
  }
  return $row;
}