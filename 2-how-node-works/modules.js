// console.log(arguments);
// console.log(require('module').wrapper);

const C = require('./test-module1');

const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./module2');
const { add, multiply, divide } = require('./module2');
console.log(multiply(2, 5));

// caching
require('./module3')();
require('./module3')();
require('./module3')();
