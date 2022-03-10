const createTable = () => document.createElement("table");

const createRow = () => document.createElement("tr");

const createSuperscriptText = (text) => {
  const el = document.createElement("span");
  el.classList.add("cell-identifier");
  el.textContent = text;
  return el;
};

const createCell = (text, underlingText, chess) => {
  const cell = document.createElement("td");
  if (underlingText != undefined) cell.appendChild(createSuperscriptText(underlingText));
  if (chess != undefined) cell.classList.add(chess);
  if (text != undefined) cell.textContent = text;
  return cell;
};

export const create = {
  table: createTable,
  row: createRow,
  cell: createCell,
  superscriptText: createSuperscriptText,
};
