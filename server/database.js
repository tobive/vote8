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
  Poll.count().exec(function (err, count) {
    if(err) console.error("getRandom- count err: ", err);
    var random = Math.floor(Math.random() * count);
    console.log("RANDOM NYA: " + random);
    Poll.findOne().skip(random).exec(function (err, result) {
      if(err) console.error("getRandom- findOne err: ", err);
      callback(result);
      // db.close();
    });
  });
}

module.exports.getLatest = function(callback) {
  Poll.find({}).sort({date: -1}).limit(10).exec(function(err, result) {
    if(err) console.error("getLatest err: ", err);
    callback(result);
    // db.close();
  });
}

module.exports.getFromUser = function(id, callback) {
  Poll.find({userid: id}).sort({date: -1}).exec(function(err, result) {
    if(err) console.error("getFromUser Err: ", err);
    callback(result);
  });
}

module.exports.getLink = function(linkID, callback) {
  Poll.find({link: linkID}).exec(function(err, result) {
    if(err) console.error("getLink err: ", err);
    callback(result);
  });
}

module.exports.save = function(obj, callback) {
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
      //db.close();
    });
  });
  callback();
}

module.exports.votepoll = function(obj, callback) {
  Poll.findOneAndUpdate(
  { _id: obj._id, 'options._id': obj.key },
  { $inc: { 'options.$.tally': 1 }},
  { new: true},
  function(err, res) {
    if(err) console.error("ERROR KAMPRET ", err);
    console.log("TALLY HO: ", res.options[0].tally);
    callback(err);
    //db.close();
  });
}
