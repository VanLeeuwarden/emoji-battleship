let playerGrid
let opponentGrid
let aiDifficulty = 35;

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

  // player finds grid configuration they like
  $("#randomize-positions").click( () => {
    playerGrid = newRandomGrid();
    updateIcons(playerGrid, opponentGrid);
  });


  $("#start-game-button").click( () => {
    $(".buttons-container").addClass("button-hide");
    $("#message-log").show();
    passMessage("begin", "blue");
    toggleGridClick();
    $('#arrows-up').css('background-color', 'inherit');
    $('#arrows-right').css('background-color', '#fa5a5a');
/*    changeArrows('#arrows-up', '#arrows-right');
*/  })

});
