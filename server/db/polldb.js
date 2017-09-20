var mongoose = require('mongoose');

var pollSchema = mongoose.Schema({
  userid: String,
  title: String,
  description: String,
  options: [{
    name: String,
    tally: {
      type: Number,
      default: 0
    }
  }],
  date: Date,
  link: String
});

var Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
