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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//console.log(containerMovements.innerHTML);

// Display Balance to the app with using 'reduce' method
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // creates a NEW property in accounts object

  labelBalance.textContent = `${acc.balance} €`;
};

//Display Summary to the app
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Computing Usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner // creates a NEW property in accounts object
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
// const user = 'Steven Thomas Williams'; // stw

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent Form from submitting (stoping the page gets reloaded)
  e.preventDefault(); // common use case when working with form
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields (ID and Password)
    inputLoginUsername.value = inputLoginPin.value = ''; // computed from right to left
    //Clear the mouse focus from 'PIN' after login
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// Transfering money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    inputTransferAmount.blur();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index); // 'findIndex' returns the 'index number' which matches the condition
    // .indexOf(23) ---> 'findIndex' is similar to 'indexOf' , however 'indexOf'  can only be used in arrays
    // 'indexOf' can not also set the condition that returns true or false.

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
arr.splice(1, 2); // ---> (starting index, deleteCount)
// starting from index1 delete 2 elements
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

/*
// Coding Challenge #3

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age, i, arr) => {
      console.log(arr);
      return age >= 18;
    })
    .reduce((acc, age, i, arr) => {
      console.log(arr);
      return acc + age / arr.length;
    }, 0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));

*/

/*

// Find Method (Unlike 'filter' , 'find' will only return the first element in the array that satisfies certain condition )

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal); // -400
// 'find' method does NOT return an array but the element itself

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// Using 'for of loop'
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}

*/

/*

// 'some' method
console.log(movements);
// 'includes' method for Equality
console.log(movements.includes(-130)); // True

// 'some' method for condition
console.log(movements.some(mov => mov === -130)); // True
const anyDeposit = movements.some(mov => mov > 1500); //True
console.log(anyDeposit);

// 'every' mothod
console.log(movements.every(mov => mov > 0)); // False
console.log(account4.movements.every(mov => mov > 0)); // True

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

/*

// 'flat' and 'flatMap' methods
// flat method removes the nested arrays

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// depth is going to be the parameter
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); // (6) [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// flat
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

// flatMap

const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance3);


*/

/*

// Sorting Arrays (it mutates the original arrays)

//Strings
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A < B (keep order)
// return > 0, B < A (Switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);
// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

*/

/*

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7); //(when it gets only one value => length of the array)
console.log(x); //  [empty ×7]

console.log(x.map(() => 5)); // [empty ×7] it does not work

//x.fill(1);  // (7) [1, 1, 1, 1, 1, 1, 1]
//x.fill(1, 3); // (element to fill, starting point)  ---> (7) [empty ×3, 1, 1, 1, 1]
console.log(x);

x.fill(1, 3, 5); // (element to fill, starting point, end point) end point is not included
console.log(x); // 7) [empty ×3, 1, 1, empty ×2]

arr.fill(23, 4, 6); // it MUTATES the original array
console.log(arr); // (7) [1, 2, 3, 4, 23, 23, 7]

// Array.from
const y = Array.from({ length: 7 }, () => 1); // it needs an empty parameter to fill with the array
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1); // (cur, i) => i + 1 same as using map method. returning i+1
console.log(z); // (7) [1, 2, 3, 4, 5, 6, 7]

// Using Array.from to get the data from UI
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // Using spread operator to get the datas from UI then mapping separately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  const movementsUIelements = movementsUI2.map(el =>
    Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUIelements);
});

*/

/*
// Array Method Practice

// 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);

// 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// 2 with using 'reduce' method
const numDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits10002);

// Prefixed ++ operator
let a = 10;
console.log(a++); //10
console.log(a); //11

let b = 10;
console.log(++b); //11
console.log(b); //11

// 3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      // return sums;
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/

// Coding Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => (dog.recommededFood = Math.trunc(dog.weight ** 0.75 * 28)));

console.log(dogs);

// 2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// const str =
//   sarahDog.curFood > sarahDog.recommededFood
//     ? `Your Dog Eats Too much`
//     : `Your Dog Eats Too Little`;
console.log(sarahDog);
//console.log(str);
console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recommededFood ? 'much' : 'little'
  }`
);

// 3
const ownerstooMuch = dogs
  .filter(dog => dog.curFood > dog.recommededFood)
  .flatMap(dog => dog.owners);

console.log(ownerstooMuch);

const ownerstooLittle = dogs
  .filter(dog => dog.curFood < dog.recommededFood)
  .flatMap(dog => dog.owners);
console.log(ownerstooLittle);

// 4
console.log(`${ownerstooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownerstooLittle.join(' and ')}'s dogs eat 
too little!"`);

// 5
const welleatDog = dogs.some(dog => dog.curFood === dog.recommededFood);
console.log(welleatDog);

// 6
const okaydogs = dogs.some(
  dog =>
    dog.curFood <= dog.recommededFood * 1.1 &&
    dog.curFood >= dog.recommededFood * 0.9
);

console.log(okaydogs);

// 7
const arrokayDogs = dogs.filter(
  dog =>
    dog.curFood <= dog.recommededFood * 1.1 &&
    dog.curFood >= dog.recommededFood * 0.9
);
console.log(arrokayDogs);

// 8

// const copydogs = dogs
//   .slice()
//   .map(dog => dog.recommededFood)
//   .sort((a, b) => a - b);

// console.log(copydogs);

// Solution
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommededFood - b.recommededFood);
console.log(dogsSorted);
