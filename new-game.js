function opponentTurn() {
  toggleGridClick();
  // check player won
  // ?
  if (hasWon(opponentGrid)) {
    passMessage("You Won!!!", "green");
  } else {
    updateArrows('#arrows-right', '#arrows-left');

    // simulateDelay();
    setTimeout( function() {
      let shot = opponentAim();
      let row = shot[0];
      let col = shot[1];
      // message log
      let shotAt = playerGrid[row][col];
      let playerClass = getCoordinateClass(row, col, "player");
      if (shotAt === "sea") {
        playerGrid[row][col] = "miss";
        let newSource = iconCorrespondence.miss;
        $(playerClass).attr("src", newSource);
        passMessage("opponent missed", "red");
      } else {
        playerGrid[shot[0]][shot[1]] = "playerSunk";
        let newSource = iconCorrespondence.playerSunk;
        $(playerClass).attr("src", newSource);
        passMessage("you were hit!", "red");
      }

      // simluate delay
      // check ship sink condition --> message log
      // check win conditions --> message log
      // ?
      if (hasWon(playerGrid)) {
        passMessage("You Lost", "green");
      } else {
        // update arrow box
        updateArrows('#arrows-left', '#arrows-right');
        toggleGridClick();
      }
      }, 1800);
  }
}

function toggleGridClick() {
  gridClickable = !gridClickable;
}

function getPlayerShipLocations() {
  let playerShipLocations = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (["cruiser", "carrier", "battleship", "submarine", "destroyer"].includes(playerGrid[i][j])) {
        playerShipLocations.push([i,j]);
      }
    }
  }
  return playerShipLocations;
}

function getOpponentMoveLocations() {
  let opponentMoveLocations = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (playerGrid[i][j] === "miss" || playerGrid[i][j] ==="playerSunk") {
        opponentMoveLocations.push([i,j]);
      }
    }
  }
  return opponentMoveLocations
}

// aiDifficulty global between 1 & 100
function opponentAim() {
  let guessIntensity = Math.floor(100 * Math.random());
  if (guessIntensity < aiDifficulty) {
    let playerShipLocations = getPlayerShipLocations();
    let randShipIdx = Math.floor(playerShipLocations.length * Math.random());
    return playerShipLocations[randShipIdx];
  } else {
    let opponentMoveLocations = getOpponentMoveLocations();
    let possibleGuess = getRandomPoint();
    while(opponentMoveLocations.includes(possibleGuess)) {
      possibleGuess = getRandomPoint();
    }
    return possibleGuess
  }
}

function hasWon(grid) {
  const nonShips = ["sea", "miss", "playerSunk", "hit"];
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      if (!(nonShips.includes(grid[i][j]))) {
        return false
      }
    }
  }
  return true
}