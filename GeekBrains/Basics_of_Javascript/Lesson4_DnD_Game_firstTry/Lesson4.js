"use strict";

// Task 1
function validation(number) {
  if (number == undefined || isNaN(number)) return false;
  if (number < 0) return false;
  if (number > 999) {
    console.log("Number was greater that 999");
    return false;
  }
  return true;
}

function takeInput(validation) {
  const input = prompt("Введите целочисленное положительное число от 0 до 999");
  const number = parseInt(input);
  return !validation(number) ? undefined : number;
}

class Number {
  constructor(units, tens, hundreds) {
    this.units = units;
    this.tens = tens;
    this.hundreds = hundreds;
  }
}

function convertNumberToNumberObject(number) {
  if (number == undefined) return new Number(0, 0, 0);

  const units = Math.floor(number % 10);
  const tens = Math.floor((number / 10) % 10);
  const hundreds = Math.floor(number / 100);
  return new Number(units, tens, hundreds);
}

// Actual Program
const result = convertNumberToNumberObject(takeInput(validation));
console.log(result);
