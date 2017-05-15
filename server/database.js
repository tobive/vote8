var mongoose = require('mongoose');
var assert = require('assert');
var User = require('./db/userdb');
var Poll = require('./db/polldb');
var Counter = require('./db/counterdb')
var Hashids = require('hashids');
var hashids = new Hashids();
const URL = process.env.MONGOLAB_URI || '//localhost/';
const DB_NAME = 'test8';


module.exports.getRandom = function(callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("db connected");
    Poll.count().exec(function (err, count) {
      if(err) console.error("getRandom- count err: ", err);
      var random = Math.floor(Math.random() * count);
      console.log("RANDOM NYA: " + random);
      Poll.findOne().skip(random).exec(function (err, result) {
        if(err) console.error("getRandom- findOne err: ", err);
        callback(result);
        db.close();
      });
    })
    callback;
  })
}

module.exports.save = function(obj, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log("db connected");
    Counter.findOneAndUpdate(
    { counter: 1},
    { $inc: { sequence: 1 }},
    {new: true},
    function(err, count) {
      if(err) console.error("ERROR TAEK: ", err);
      console.log("BANGSAT " + count.sequence)
      let val = parseInt(count.sequence);
      obj.link = hashids.encode(val);
      let newPoll = new Poll(obj);
      let promise = newPoll.save(function (err) {
        if(err) return console.error(err);
        db.close();
      })
    });
    callback();
  });
}
