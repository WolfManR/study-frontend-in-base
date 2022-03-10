import { tickPerSecond, gameFieldWidth, gameFieldHeight, CELL_TYPE, bombExplositonTime, bombStopTime, SCORE_FIELDS, CELL_TYPE_CELL_INDEX } from "./constants.js";

let gameField;
const gameState = {
  bomberman: {
    position: {
      rowNumber: 0,
      columnNumber: 0,
    },
  },
  // {rowNumber, columnNumber, startTimeMs}
  bombs: [],
  bombExplodeSize: 3,
  bombExploseCells: {
    // i,j: time of start explode
  },
  explodedBombsCounter: 0,
  gameTickHandler: null,
};

const htmlPositionAttributeName = "cell-position";

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
 * Установка id в DOM элементы, для взаимодействия с ними
 */
const setDomTreeAttributes = () => {
  const allCells = document.querySelectorAll(".cell");
  for (let i = 0; i < allCells.length; i++) {
    const numberOfRow = Math.floor(i / gameFieldHeight);
    const numberOfColumn = i % gameFieldWidth;

    allCells[i].id = generateCellId(numberOfRow, numberOfColumn);
  }
};

/**
 * Генерация id ячейки
 */
const generateCellId = (rowNumber, columnNumber) => {
  return `${htmlPositionAttributeName}${rowNumber},${columnNumber}`;
};

/**
 * Получение DOM элемента по позиции в gameField
 */
const getCellDomElement = (rowNumber, columnNumber) => {
  return document.getElementById(generateCellId(rowNumber, columnNumber));
};

/**
 * Получение позиции в gameField из id DOM элемента
 */
const getPositionById = (cellElement) => {
  const cellId = cellElement.id;
  const arrayOfPosition = cellId.replace(htmlPositionAttributeName, "").split(",");

  return {
    rowNumber: arrayOfPosition[0],
    columnNumber: arrayOfPosition[1],
  };
};

/**
 * Установка бомбы (gameField и DOM)
 */
const setBombPosition = (rowNumber, columnNumber) => {
  if (gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMB] == CELL_TYPE.BOMB) {
    return;
  }

  gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMB] = CELL_TYPE.BOMB;

  gameState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMB);
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
  console.log(rowNumber, columnNumber)
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
        setBombPosition(gameState.bomberman.position.rowNumber, gameState.bomberman.position.columnNumber);
        break;
    }
    logWhatAroundBomberman();
  });
};

/**
 * Взрыв бомбы, рисование крестика
 */
const explodeBomb = (i) => {
  // удаление иконки бомбы
  const explodedBomb = gameState.bombs[i];

  const elementWithBomb = getCellDomElement(explodedBomb.rowNumber, explodedBomb.columnNumber);

  gameField[explodedBomb.rowNumber][explodedBomb.columnNumber][CELL_TYPE_CELL_INDEX.BOMB] = null;
  gameState.bombs.splice(i, 1);
  elementWithBomb.classList.remove(CELL_TYPE.BOMB);

  const explodeLineSize = gameState.bombExplodeSize * 2 - 1;
  // рисование взрыва по вертикали (gameState и DOM)
  for (let i = 0; i < explodeLineSize; i++) {
    const explodeRowNumber = explodedBomb.rowNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeRowNumber >= 0 && explodeRowNumber < gameFieldHeight) {
      const verticalCellForExplode = getCellDomElement(explodeRowNumber, explodedBomb.columnNumber);
      verticalCellForExplode.classList.add(CELL_TYPE.EXPLOSION);
      gameState.bombExploseCells[`${explodeRowNumber},${explodedBomb.columnNumber}`] = Date.now();
    }
    const explodeColumnNumber = explodedBomb.columnNumber - (gameState.bombExplodeSize - 1) + i;
    if (explodeColumnNumber >= 0 && explodeColumnNumber < gameFieldWidth) {
      const horizontalCellForExplode = getCellDomElement(explodedBomb.rowNumber, explodeColumnNumber);
      horizontalCellForExplode.classList.add(CELL_TYPE.EXPLOSION);
      gameState.bombExploseCells[`${explodedBomb.rowNumber},${explodeColumnNumber}`] = Date.now();
    }
  }

  updateExplodedBombsCounter();
};

const updateExplodedBombsCounter = () => {
  // обновить счётчик взорванных бомб
  gameState.explodedBombsCounter += 1;

  // обновить DOM счётчик взорванных бомб
  const bombsCounter = document.getElementById(SCORE_FIELDS.EXPLODED_BOMBS_COUNTER);
  bombsCounter.innerText = gameState.explodedBombsCounter;
};

/**
 * Проверка что пора бомбе взорваться
 * Вызывается на каждом тике
 */
const checkBombsExplosion = () => {
  const currentTime = Date.now();
  for (let i = gameState.bombs.length - 1; i >= 0; i--) {
    const bomb = gameState.bombs[i];
    if (currentTime - bomb.startTimeMs > bombExplositonTime) {
      // взорвать бомбу
      explodeBomb(i);
    }
  }
};

/**
 * Тушения взрыва бомб, в gameState и DOM дереве
 * Вызывается каждый тик
 */
const checkBombsStop = () => {
  const currentTime = Date.now();
  for (const explodeCellKey in gameState.bombExploseCells) {
    if (currentTime - gameState.bombExploseCells[explodeCellKey] >= bombStopTime) {
      // удалить из gameState.bombExploseCells поле
      delete gameState.bombExploseCells[explodeCellKey];

      // убрать из DOM класс
      const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
      const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
      explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
    }
  }
};

/**
 * Обработчик на каждом тике игры
 */
export const startGame = () => {
  gameState.gameTickHandler = setInterval(() => {
    checkBombsExplosion();
    checkBombsStop();
  }, 1000 / tickPerSecond);
};

/**
 * Остановка обработчика тиков игры
 */
export const stopGame = () => {
  clearInterval(gameState.gameTickHandler);
};
