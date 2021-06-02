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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
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
     <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
//console.log(containerMovements.innerHTML);

// Display Balance to the app with using 'reduce' method
const calcDisplayBalance = function (movments) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);

//Display Summary to the app
const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

// Computing Usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// const user = 'Steven Thomas Williams'; // stw

createUsernames(accounts);

//console.log(accounts);

// const createusername = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(function (name) {
//         return name[0];
//       })
//       .join('');
//   });
// };
// createusername(accounts);
// console.log(accounts);

// I must use 'map' in '104' because if i use 'forEach' it returns a string not a new array.
// So I CANNOT use 'join' in that case. 'join' is a method --> 'array' to 'string'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

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

/*

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

*/

/*
// Filter Method

//Filter method creates a 'NEW Array' for the elements that passed certain condition so I need a variable for the new array like 'Map'
// 'RETURN' is needed same as 'MAP'
// I can also have index and the entire array as parameters like 'forEach' and 'Map' but it's not often used at all.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// Using 'For of loop'
const depositFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov);
  }
}
console.log(depositFor);

// Using Filter Method with arrow function
const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);

*/

/*

// Reduce Method (Reduce always gets 'accumulator' as a first parameter and needs a initial value as a second parameter)

// Accumulator --> SNOW BALL (keeps adding the value that I ultimately return)
// Reduce Method does NOT creates an array but one ultimate value instead

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 100);
// as a second parameter I set '0' for the initial value.
// '0' will be the initial value of the accumulator in the first loop iteration
console.log(balance);

// Using with Arrow Function
const balanceArrow = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balanceArrow);

// Using 'for of loop'
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Displaying Maximum Value with using 'Reduce Method'
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);
// if 'acc' = 'mov', it simply returns mov so I dont have to specify the case of equal
// I should not set '0' as a initial value because if I want to get a MINIMUM value, it will not work.

*/

/*
// Coding Challenge #2


//Solution

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  //console.log(humanAges);
  const adultDogs = humanAges.filter(age => age >= 18);
  //console.log(adultDogs);
  const averagedogs =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  return averagedogs;

  //another way of getting average (good use case)
  // const average = adultDogs.reduce((acc,age,i,arr)=>acc+age/arr.length,0)
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

/*

// Chaining Methods (I can only chain a method if the first one returns an array)
//I CANNOT chain a method after 'reduce' because it only returns a single value
const eurToUsd = 1.1;

const totalDepositinUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositinUSD);

// Solution of how to DEBUG
// Since I chain all the methods to get a result, it is hard to find if there is a mistake
// I should check out the current array in the NEXT array method which has chained on that filter.
// 'return' is needed after 'console.log' because it is now more than one line of code.

const totalDepositinUSD2 = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    //console.log(arr); // (5) [200, 450, 3000, 70, 1300] X 5
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositinUSD2);

*/
