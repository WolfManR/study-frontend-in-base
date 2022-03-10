import { setDomTreeAttributes, getCellDomElement, getPositionById } from "./DOMHelpers.js";
import { tickPerSecond, gameFieldWidth, gameFieldHeight, CELL_TYPE, SCORE_FIELDS, CELL_TYPE_CELL_INDEX } from "./constants.js";
import { setBombPosition, checkBombsExplosion, checkBombsStop } from "./bombs.js";

let gameField;

const gameState = {
  bomberman: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  explodedBombsCounter: 0,
  gameTickHandler: null,
};

/**
 * Создание двойного массива и заполнение игрового поля null
 */
const createGameField = () => {
  const gameFieldRows = new Array(gameFieldHeight).fill(null);

  gameField = gameFieldRows.map(() => {
    return new Array(gameFieldWidth).fill(null).map(() => new Array());
  });
};

/**
 * Установка позиции бомбермена, с удалением старой позиции
 */
const setBombermanPosition = (rowNumber, columnNumber) => {
  if (gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMB] != null) return;

  gameState.bomberman.position.rowNumber = rowNumber;
  gameState.bomberman.position.columnNumber = columnNumber;

  const currentBombermanPositionElement = document.querySelector(`.${CELL_TYPE.BOMBERMAN}`);
  if (currentBombermanPositionElement !== null) {
    const bombermanPosition = getPositionById(currentBombermanPositionElement);
    gameField[bombermanPosition.rowNumber][bombermanPosition.columnNumber][CELL_TYPE_CELL_INDEX.BOMBERMAN] = null;

    currentBombermanPositionElement.classList.remove(CELL_TYPE.BOMBERMAN);
  }

  gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMBERMAN] = CELL_TYPE.BOMBERMAN;

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMBERMAN);
};

/**
 * Инициализация игрового поля
 */
export const initializeGameField = () => {
  createGameField();
  setDomTreeAttributes();
  setBombermanPosition(0, 0);
};

const logWhatAroundBomberman = () => {
  const rowNumber = gameState.bomberman.position.rowNumber;
  const columnNumber = gameState.bomberman.position.columnNumber;

  console.log(rowNumber, columnNumber);

  if (rowNumber > 0) {
    console.log([
      columnNumber > 0 ? gameField[rowNumber - 1][columnNumber - 1] : undefined,
      gameField[rowNumber - 1][columnNumber],
      columnNumber < gameFieldWidth ? gameField[rowNumber - 1][columnNumber + 1] : undefined,
    ]);
  }

  console.log([
    columnNumber > 0 ? gameField[rowNumber][columnNumber - 1] : undefined,
    gameField[rowNumber][columnNumber],
    columnNumber < gameFieldWidth ? gameField[rowNumber][columnNumber + 1] : undefined,
  ]);

  if (rowNumber + 1 < gameFieldHeight) {
    console.log([
      columnNumber > 0 ? gameField[rowNumber + 1][columnNumber - 1] : undefined,
      gameField[rowNumber + 1][columnNumber],
      columnNumber < gameFieldWidth ? gameField[rowNumber + 1][columnNumber + 1] : undefined,
    ]);
  }
};

/**
 * Обработчик нажатий на клавиатуре
 */
export const setUpKeyboardHandlers = () => {
  document.body.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (gameState.bomberman.position.columnNumber > 0) {
          setBombermanPosition(gameState.bomberman.position.rowNumber, gameState.bomberman.position.columnNumber - 1);
        } else {
          setBombermanPosition(gameState.bomberman.position.rowNumber, gameFieldWidth - 1);
        }
        break;
      case "ArrowRight":
        if (gameState.bomberman.position.columnNumber < gameFieldWidth - 1) {
          setBombermanPosition(gameState.bomberman.position.rowNumber, gameState.bomberman.position.columnNumber + 1);
        } else {
          setBombermanPosition(gameState.bomberman.position.rowNumber, 0);
        }
        break;
      case "ArrowDown":
        if (gameState.bomberman.position.rowNumber < gameFieldHeight - 1) {
          setBombermanPosition(gameState.bomberman.position.rowNumber + 1, gameState.bomberman.position.columnNumber);
        } else {
          setBombermanPosition(0, gameState.bomberman.position.columnNumber);
        }
        break;
      case "ArrowUp":
        if (gameState.bomberman.position.rowNumber > 0) {
          setBombermanPosition(gameState.bomberman.position.rowNumber - 1, gameState.bomberman.position.columnNumber);
        } else {
          setBombermanPosition(gameFieldHeight - 1, gameState.bomberman.position.columnNumber);
        }
        break;
      case " ":
        // поставить бомбу
        setBombPosition(gameState.bomberman.position.rowNumber, gameState.bomberman.position.columnNumber, gameField);
        break;
    }
    logWhatAroundBomberman();
  });
};

/**
 * Обновление счётчика взорванных бомб в gameState и DOM
 */
const updateExplodedBombsCounter = () => {
  // обновить счётчик взорванных бомб
  gameState.explodedBombsCounter += 1;

  // обновить DOM счётчик взорванных бомб
  const bombsCounter = document.getElementById(SCORE_FIELDS.EXPLODED_BOMBS_COUNTER);
  bombsCounter.innerText = gameState.explodedBombsCounter;
};

/**
 * Обработчик на каждом тике игры
 */
export const startGame = () => {
  gameState.gameTickHandler = setInterval(() => {
    checkBombsExplosion(updateExplodedBombsCounter, gameField);
    checkBombsStop();
  }, 1000 / tickPerSecond);
};

/**
 * Остановка обработчика тиков игры
 */
export const stopGame = () => {
  clearInterval(gameState.gameTickHandler);
};
