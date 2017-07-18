var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: String,
  email: String,
  name: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
