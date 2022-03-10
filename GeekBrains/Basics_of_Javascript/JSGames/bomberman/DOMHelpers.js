import { gameFieldWidth, gameFieldHeight } from "./constants.js";

const htmlPositionAttributeName = "cell-position";

/**
 * Установка id в DOM элементы, для взаимодействия с ними
 */
export const setDomTreeAttributes = () => {
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
export const getCellDomElement = (rowNumber, columnNumber) => {
  return document.getElementById(generateCellId(rowNumber, columnNumber));
};

/**
 * Получение позиции в gameField из id DOM элемента
 */
export const getPositionById = (cellElement) => {
  const cellId = cellElement.id;
  const arrayOfPosition = cellId.replace(htmlPositionAttributeName, "").split(",");

  return {
    rowNumber: arrayOfPosition[0],
    columnNumber: arrayOfPosition[1],
  };
};