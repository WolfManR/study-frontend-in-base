import { CELL_TYPE_CELL_INDEX, CELL_TYPE, bombExplositonTime, bombStopTime, gameFieldWidth, gameFieldHeight } from "./constants.js";
import { getCellDomElement } from "./DOMHelpers.js";

const bombsState = {
  bombs: [],
  bombExplodeSize: 3,
  bombExploseCells: {
    // {rowNumber, columnNumber, time of start explode}
  },
};

/**
 * Установка бомбы (gameField и DOM)
 */
export const setBombPosition = (rowNumber, columnNumber, gameField) => {
  if (gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMB] == CELL_TYPE.BOMB) {
    return;
  }

  gameField[rowNumber][columnNumber][CELL_TYPE_CELL_INDEX.BOMB] = CELL_TYPE.BOMB;

  bombsState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

  const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
  startBombermanElement.classList.add(CELL_TYPE.BOMB);
};

/**
 * Взрыв бомбы, рисование крестика
 */
const explodeBomb = (bombIndex, gameField) => {
  // удаление иконки бомбы
  const explodedBomb = bombsState.bombs[bombIndex];

  const elementWithBomb = getCellDomElement(explodedBomb.rowNumber, explodedBomb.columnNumber);

  gameField[explodedBomb.rowNumber][explodedBomb.columnNumber][CELL_TYPE_CELL_INDEX.BOMB] = null;
  bombsState.bombs.splice(bombIndex, 1);
  elementWithBomb.classList.remove(CELL_TYPE.BOMB);

  const explodeLineSize = bombsState.bombExplodeSize * 2 - 1;

  // рисование взрыва по вертикали (gameState и DOM)
  for (let i = 0; i < explodeLineSize; i++) {
    const explodeRowNumber = explodedBomb.rowNumber - (bombsState.bombExplodeSize - 1) + i;
    if (explodeRowNumber >= 0 && explodeRowNumber < gameFieldHeight) {
      const verticalCellForExplode = getCellDomElement(explodeRowNumber, explodedBomb.columnNumber);
      verticalCellForExplode.classList.add(CELL_TYPE.EXPLOSION);
      bombsState.bombExploseCells[`${explodeRowNumber},${explodedBomb.columnNumber}`] = Date.now();
    }

    const explodeColumnNumber = explodedBomb.columnNumber - (bombsState.bombExplodeSize - 1) + i;
    if (explodeColumnNumber >= 0 && explodeColumnNumber < gameFieldWidth) {
      const horizontalCellForExplode = getCellDomElement(explodedBomb.rowNumber, explodeColumnNumber);

      horizontalCellForExplode.classList.add(CELL_TYPE.EXPLOSION);
      bombsState.bombExploseCells[`${explodedBomb.rowNumber},${explodeColumnNumber}`] = Date.now();
    }
  }
};

/**
 * Проверка что пора бомбе взорваться
 * Вызывается на каждом тике
 */
export const checkBombsExplosion = (onBombExploded, gameField) => {
  const currentTime = Date.now();
  for (let i = bombsState.bombs.length - 1; i >= 0; i--) {
    const bomb = bombsState.bombs[i];
    if (currentTime - bomb.startTimeMs > bombExplositonTime) {
      // взорвать бомбу
      explodeBomb(i, gameField);
      onBombExploded();
    }
  }
};

/**
 * Тушения взрыва бомб, в gameState и DOM дереве
 * Вызывается каждый тик
 */
export const checkBombsStop = () => {
  const currentTime = Date.now();
  for (const explodeCellKey in bombsState.bombExploseCells) {
    if (currentTime - bombsState.bombExploseCells[explodeCellKey] >= bombStopTime) {
      // удалить из gameState.bombExploseCells поле
      delete bombsState.bombExploseCells[explodeCellKey];

      // убрать из DOM класс
      const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
      const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
      explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
    }
  }
};
