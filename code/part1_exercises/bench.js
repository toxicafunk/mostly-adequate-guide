var R = require('ramda');
var Benchmark = require('benchmark');

var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

var _average = function(xs) { return R.reduce(R.add, 0, xs) / xs.length; };

var averageDollarValue = function(cars) {
  var dollarSum = 0;
  for (var i = 0; i < cars.length; i++) {
    dollarSum += cars[i].dollar_value;
  }
  return dollarSum / cars.length;
};
var averageDollarValueFunc = R.compose(_average, R.map(R.prop('dollar_value')))

console.log(averageDollarValue(CARS))
console.log(averageDollarValueFunc(CARS))

var suite = new Benchmark.Suite;
// add tests
suite.add('Average loop', function() {
  averageDollarValue(CARS);
})
.add('Average compose', function() {
  averageDollarValueFunc(CARS);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
