"use strict";

// Task 1

let celciusTemperature = +prompt("Укажите температуру в цельсиях:");
let fahrenheitTemperature = (9 / 5) * celciusTemperature + 32;
alert(`Температу в фаренгейтах: ${fahrenheitTemperature}`);

// Task 2
const name = "Василий";
let admin = "Фёдор";

alert(`значение переменной admin до копирования значения: ${admin}`);

admin = name;

alert(`значение переменной admin после копирования значения: ${admin}`);
