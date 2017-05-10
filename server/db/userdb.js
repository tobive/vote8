var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  poll_list: []
});

var User = mongoose.model('User', userSchema);
module.exports = User;
