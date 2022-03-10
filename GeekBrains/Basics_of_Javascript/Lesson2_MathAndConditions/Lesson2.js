"use strict";

{
  // Task 3
  let a = -2;
  let b = -3;

  if (a > 0 && b > 0) alert(`a и b числа положительные, разность равна ${a - b}`);
  else if (a < 0 && b < 0) alert(`a и b числа отрицательные, произведение  равно ${a * b}`);
  else if ((a >= 0 && b < 0) || (a < 0 && b >= 0)) alert(`a и b числа разных   знаков, сумма равна ${a + b}`);
}

{
  // Task 4
  let a = 4;
  let output = "";
  switch (a) {
    case 0:
      output += "0, ";
    case 1:
      output += "1, ";
    case 2:
      output += "2, ";
    case 3:
      output += "3, ";
    case 4:
      output += "4, ";
    case 5:
      output += "5, ";
    case 6:
      output += "6, ";
    case 7:
      output += "7, ";
    case 8:
      output += "8, ";
    case 9:
      output += "9, ";
    case 10:
      output += "10, ";
    case 11:
      output += "11, ";
    case 12:
      output += "12, ";
    case 13:
      output += "13, ";
    case 14:
      output += "14, ";
    case 15:
      output += "15";
      break;
    default:
      output = "incorect value of a";
  }

  alert(`задание номер 4. числа от a до 15: ${output}`);
}

// Task 5
const addition = (a, b) => a + b;
const substruction = (a, b) => a + b;
const multiplication = (a, b) => a + b;
const division = (a, b) => a + b;

// Task 6
function mathOperation(arg1, arg2, operation) {
  return operation(arg1, arg2);
}

let arg1 = parseInt(prompt("Введите числовое значение 1:"));
let arg2 = parseInt(prompt("Введите числовое значение 2:"));
let operationVariant = prompt("Введите знак операции (+, -, /, *)");
let selectedOperation;
switch (operationVariant) {
  case "+":
    selectedOperation = addition;
    break;
  case "-":
    selectedOperation = addition;
    break;
  case "/":
    selectedOperation = addition;
    break;
  case "*":
    selectedOperation = addition;
    break;
  default:
    selectedOperation = undefined;
    break;
}

if (selectedOperation != undefined) {
  alert(mathOperation(arg1, arg2, selectedOperation));
} else alert("Операция не поддерживается");

// Task 8
let input = prompt("Введите число для возведения в степеть");
const number = parseInt(input);

input = prompt("Введите положительную целочисленную степень, в которую надо возвести число");
const degree = parseInt(input);

function power(val, pow) {
  if (isNaN(val) || isNaN(pow)) return "Not a number";
  if (pow == 0) return 1;
  if (pow == 1) return val;
  return val * power(val, --pow);
}

alert(`Результатом возведения числа ${number} в степень ${degree} является значение ${power(number, degree)}`);

// нельзя записать лямбда функцию в переменную как рекурсивную функцию
