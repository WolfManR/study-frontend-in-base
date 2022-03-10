const PLAYER_TYPES = {
  CROSS: "cross",
  ZERO: "zero",
};

const htmlPositionAttributeName = "cell-position";

const gameField = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const initializeGameField = () => {
  const allCells = document.querySelectorAll(".cell");
  for (let i = 0; i < allCells.length; i++) {
    const numberOfRow = Math.floor(i / 3);
    const numberOfColumn = i % 3;

    allCells[i].setAttribute(htmlPositionAttributeName, `${numberOfRow},${numberOfColumn}`);
  }
};
initializeGameField();

let currentPlayer = PLAYER_TYPES.CROSS;

const changePlayer = () => {
  if (currentPlayer === PLAYER_TYPES.CROSS) {
    currentPlayer = PLAYER_TYPES.ZERO;
    return;
  }

  currentPlayer = PLAYER_TYPES.CROSS;
};

const checkIsGameFinished = () => {
  for (let i = 0; i < gameField.length; i++) {
    let crossCounter = 0;
    let zeroCounter = 0;
    for (let j = 0; j < gameField.length; j++) {
      if (gameField[i][j] === PLAYER_TYPES.CROSS) {
        crossCounter++;
      }
      if (gameField[i][j] === PLAYER_TYPES.ZERO) {
        zeroCounter++;
      }
    }
    if (crossCounter === 3) return PLAYER_TYPES.CROSS;
    if (zeroCounter === 3) return PLAYER_TYPES.ZERO;
  }

  for (let i = 0; i < gameField.length; i++) {
    let crossCounter = 0;
    let zeroCounter = 0;
    for (let j = 0; j < gameField.length; j++) {
      if (gameField[j][i] === PLAYER_TYPES.CROSS) {
        crossCounter++;
      }
      if (gameField[j][i] === PLAYER_TYPES.ZERO) {
        zeroCounter++;
      }
    }
    if (crossCounter === 3) return PLAYER_TYPES.CROSS;
    if (zeroCounter === 3) return PLAYER_TYPES.ZERO;
  }

  if (gameField[0][0] === gameField[1][1] && gameField[1][1] === gameField[2][2]) {
    return gameField[1][1];
  }

  if (gameField[0][2] === gameField[1][1] && gameField[1][1] === gameField[2][0]) {
    return gameField[1][1];
  }

  return null;
};

const gameFieldElement = document.querySelector(".field");
gameFieldElement.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) return;

  const cellPosition = event.target.getAttribute(htmlPositionAttributeName).split(",").map(Number);
  const xPosition = cellPosition[0];
  const yPosition = cellPosition[1];
  gameField[xPosition][yPosition] = currentPlayer;

  const gameResult = checkIsGameFinished();
  if (gameResult !== null) {
    console.log(gameResult + " is win");
  }

  event.target.classList.add(currentPlayer);
  changePlayer();
});
