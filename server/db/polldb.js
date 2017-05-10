var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  desc: String,
  options: [{
    name: String,
    tally: Number
  }],
  date: Date
});

var Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
