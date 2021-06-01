'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}{</div>
     <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
//console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice method ( it does NOT mutate the original array)
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // ---> (2) ["d", "e"]
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // ---> (2) ["b", "c"]

console.log(arr.slice()); // -----> (5) ["a", "b", "c", "d", "e"]  it makes a sallow copy of 'arr' array.
console.log([...arr]); // same result as 'arr.slice()'
// it's personal preference which to use
// but the only time i should use 'slice' is when I want to chain multiple methods together

// Splice ( it DOES mutate the original array, it deletes the selected part from the original array )

//console.log(arr.splice(2)); //------> (3)["c", "d", "e"]
arr.splice(-1); // ---> (4) ["a", "b", "c", "d"]
console.log(arr);
arr.splice(1, 2); // ---> this time the second parameter '2' is included, so it gets deleted
// unlike 'slice' method which does not include the second parameter in
console.log(arr); // --------> (2) ["a", "d"]

// Reverse(it DOES mutate the original array)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // -> ["f", "g", "h", "i", "j"]
console.log(arr2); // ->  ["f", "g", "h", "i", "j"]

// Concat ( it does NOT mutate the original array)
const letters = arr.concat(arr2); // -> (10) ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
console.log(letters);
console.log([...arr, ...arr2]); // same result as 'arr.concat(arr2)'

// Join (it makes an array to a string)
console.log(letters.join('-')); // ->a-b-c-d-e-f-g-h-i-j

*/

/*

// Looping arrays with 'forEach' method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement} `);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); // 'Math.abs(value)' getting the absolute value without ('-')
  }
}
console.log('---------forEach ----------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
// unlike 'for of loop' the FIRST parameter will be the elements of the array and SECOND parameter will be the index of the array.
// THIRD will be the entire array itself
// the ORDER MATTERS! and I CANNOT change the orders.
// I CANNOT use 'break' and 'continue' in 'forEach' loop. if I need to use 'break' or'continue' I should use 'for of loop'


*/

/*

// forEach with Maps and Sets

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// 'forEach' in maps and sets, the order of parameters is also matter like 'forEach' in arrays.
// 1) value 2) key 3) entiremap itself

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR', 'USD']);

console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
  // ---> USD: USD
  // ---> GBP: GBP
  // ---> EUR: EUR
});
// I need to pass in an iterable for set. It also only takes the unique values without duplicates
// There is NO 'key' and 'index' for set

*/

/*

// Coding Challenge # 1

// // MY OWN SOLUTION
// const juliaData1 = [3, 5, 2, 12, 7];
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData1 = [4, 1, 15, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// const juliaData1Correct = juliaData1.slice(1, -2);
// console.log(juliaData1Correct); // ---> (2) [5, 2]
// //console.log(juliaData1);

// const checkDogs = function (dogsJulia, dogsKate) {
//   dogsJulia.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age}years old`);
//     } else if (age < 3 && age !== 1) {
//       console.log(
//         `Dog number ${i + 1} is still a puppy, and is ${age}years old`
//       );
//     } else if (age === 1) {
//       console.log(
//         `Dog number ${i + 1} is still a puppy, and is ${age}year old`
//       );
//     }
//   });
//   dogsKate.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age}years old`);
//     } else if (age < 3 && age !== 1) {
//       console.log(
//         `Dog number ${i + 1} is still a puppy, and is ${age}years old`
//       );
//     } else if (age === 1) {
//       console.log(
//         `Dog number ${i + 1} is still a puppy, and is ${age}year old`
//       );
//     }
//   });
// };

// checkDogs(juliaData1Correct, kateData1);


// Solution
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);
  const allDogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age}years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

*/

// Map Method in Arrays (Map Method does NOT mutate the original array and returns a NEW array with new elements)

const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

// Using Map Method in Arrow function
const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
console.log(movementsUSDArrow);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`

  // if (mov > 0) {
  //   return `Movement ${i + 1}: You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  // }
);
console.log(movementsDescriptions);

// Map method needs to be stored in a variable since it returns a NEW array.
// Unlike 'forEach' which prints the elements one by one it returns a whole new array.
