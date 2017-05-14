var mongoose = require('mongoose');
var assert = require('assert');
var User = require('./db/userdb');
var Poll = require('./db/polldb');
var Counter = require('./db/counterdb')
var Hashids = require('hashids');
var hashids = new Hashids();
const URL = process.env.MONGOLAB_URI || '//localhost/';
const DB_NAME = 'test8';


module.exports.getRandom = function(obj, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("db connected");

    callback();
  })
}

module.exports.save = function(obj, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log("db connected");
    //let newCount = new Counter();
    Counter.findOneAndUpdate({
      query: { counter: 1 },
      update: { $inc: { sequence: 1 } },
      new: true
    });
    console.log("BANGSAT ")
    let val = parseInt(1000);
    obj.link = hashids.encode(val);
    let newPoll = new Poll(obj);
    let promise = newPoll.save(function (err) {
      if(err) return console.error(err);
    })
    promise.then(function (newPoll) {
      newUser.find(function (err, Poll) {
        if(err) return console.error(err);
        console.log(Poll);
        //mongoose.disconnect();
      })
    });
    db.close();
    callback();
  });
}
