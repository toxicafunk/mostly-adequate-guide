var Task = require('data.task');
var _ = require('ramda');

function getPost(i) {
  return new Task(function (rej, res) {
    console.log("1")
    setTimeout(function () { res({ id: i, title: 'Love them futures' }); }, 300);
  });
}

function getComments(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res(["This book should be illegal", "Monads are like space burritos"]);
    }, 400);
  });
}

var makeComments = _.reduce(function(acc, c){ return acc+"<li>"+c+"</li>" }, "");
var render = _.curry(function(p, cs) { return "<div>"+p.title+"</div>"+makeComments(cs); });

var ex3 = Task.of(render).ap(getPost(2)).ap(getComments(2))

ex3.fork(function(error) { throw error }, function(data)  { console.log(data) })

module.exports = {getPost: getPost, getComments: getComments, ex3: ex3}
