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
    });
  });
}

module.exports.getLatest = function(callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("db connected");
    Poll.find({}).sort({date: -1}).limit(10).exec(function(err, result) {
      if(err) console.error("getLatest err: ", err);
      callback(result);
      db.close();
    });
  });
}

module.exports.getLink = function(link, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("db connected");
    Poll.find({ 'link': link }, function(err, res) {
      if(err) console.error("DB GET LINK ERR: ", err);
      console.log("ISI LINK ", JSON.stringify(res[0]));
      callback(res[0], db.close());
      //db.close();
    });
  });
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
      });
    });
    callback();
  });
}

module.exports.votepoll = function(obj, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.setMaxListeners(0);
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log("db connected");
    Poll.findOneAndUpdate(
    { _id: obj._id, 'options.name': obj.name },
    { $inc: { 'options.$.tally': 1 }},
    { new: true},
    function(err, res) {
      if(err) console.error("ERROR KAMPRET ", err);
      console.log("TALLY HO: ", res.options[0].tally);
      callback(err);
      db.close();
    });
  });
}
