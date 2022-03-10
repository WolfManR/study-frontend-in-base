"use strict";

import { create } from "./Modules/CreateHTMLElements.js";

const getColorPlaceholder = (isWhite) => (isWhite ? "white" : "black");
const getPlaceholder = (isWhite, figure) => `${getColorPlaceholder(isWhite)}-${figure}`;
const getSymbol = (index) => String.fromCharCode(index);

const CHESS_FIGURES = {
  ki: {
    placeholder: "king",
  },
  q: {
    placeholder: "queen",
  },
  r: {
    placeholder: "rook",
  },
  kn: {
    placeholder: "knight",
  },
  b: {
    placeholder: "bishop",
  },
  p: {
    placeholder: "pawn",
  },
};

const getChessFigure = (row, col) => {
  let chess;
  if (row == 1) {
    chess = getPlaceholder(false, CHESS_FIGURES[MASK_OF_PLACES_OF_FIGURES[col]].placeholder);
  }
  if (row == FIELD_SIZE) {
    chess = getPlaceholder(true, CHESS_FIGURES[MASK_OF_PLACES_OF_FIGURES[col]].placeholder);
  }
  if (row == 2) {
    chess = getPlaceholder(false, CHESS_FIGURES["p"].placeholder);
  }
  if (row == FIELD_SIZE - 1) {
    chess = getPlaceholder(true, CHESS_FIGURES["p"].placeholder);
  }
  return chess;
};

const fillCellOnItPosition = (row, col, rowNumber) => {
  let cell;
  if (row == 0 && col == 0) cell = create.cell();
  if (col > 0 && row == 0) cell = create.cell(getSymbol(startSymbolIndex + col - 1));
  if (col == 0 && row > 0) cell = create.cell(rowNumber);
  if (row > 0 && col > 0) cell = create.cell(undefined, `${getSymbol(startSymbolIndex + col - 1)}${rowNumber}`, getChessFigure(row, col - 1));
  return cell;
};

const FIELD_SIZE = 8;
const MASK_OF_PLACES_OF_FIGURES = ["r", "kn", "b", "q", "ki", "b", "kn", "r"];
const startSymbolIndex = "A".charCodeAt();
const lastSymbolIndex = startSymbolIndex + FIELD_SIZE - 1;

const table = create.table();

for (let i = 0, rowNumber = FIELD_SIZE + 1; i < FIELD_SIZE + 1; i++, rowNumber--) {
  let row = create.row();

  for (let j = 0; j < FIELD_SIZE + 1; j++) {
    row.appendChild(fillCellOnItPosition(i, j, rowNumber));
  }

  table.appendChild(row);
}

document.body.appendChild(table);
