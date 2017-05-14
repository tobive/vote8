var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
  //userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  options: [{
    name: String,
    tally: Number
  }],
  date: Date,
  link: String
});

var Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
