"use strict";

{
  // Task 1
  let simpleNumbers = new Array(100).fill().map((_, index) => index);

  simpleNumbers.splice(0, 2); // simple numbers greater than 1, so remove 0 and 1

  let i = simpleNumbers.length - 1;
  while (i > 0) {
    let current = simpleNumbers[i];
    let count = 1;
    let j = 0;
    while (j < i && count == 1) {
      if (current % simpleNumbers[j] == 0) count++;
      j++;
    }
    if (count > 1) simpleNumbers.splice(i, 1);
    i--;
  }

  console.log(simpleNumbers);
}

{
  // Task 2, 3
  let cart = [
    { price: 100, amount: 3 },
    { price: 242, amount: 5 },
    { price: 678, amount: 50 },
    { price: 20, amount: 120 },
  ];

  let countFullPrice = (cart) => {
    let fullPrice = 0;
    cart.forEach((element) => {
      fullPrice += element.price * element.amount;
    });
    return fullPrice;
  };

  console.log(`full price of cart is ${countFullPrice(cart)}`);
}

{
  // Task 4
  for (let number = 0; number <= 9; console.log(number++)) {}
}

{
  // Task 5
  const symbol = "*";
  for (let index = 0; index <= 20; index++, console.log(Array(index).fill(symbol).join(""))) {}
}
