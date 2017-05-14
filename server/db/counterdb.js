var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
  counter: Number,
  sequence: Number
});

var Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
