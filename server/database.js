var mongoose = require('mongoose');
var assert = require('assert');
var User = require('./db/userdb');
var Poll = require('./db/polldb');
const URL = process.env.MONGOLAB_URI || '//localhost/';
const DB_NAME = 'test8';

// mongoose.connect('mongodb:' + URL + DB_NAME);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("db connected");
//   var newUser = new User({
//     username: 'praboe',
//     password: 'praboer'
//   });
//   var newPoll = new Poll({
//     title: "siapa yg kuat",
//     desc: "",
//     options: [{name: "goku", tally: 10},
//               {name: "supes", tally: 11}],
//     date: new Date()
//   });
//   var promise = newUser.save(function (err) {
//     if(err) return console.error(err);
//   });
//   var promise2 = newPoll.save(function (err) {
//     if(err) return console.error(err);
//   })
//   promise.then(function (newUser) {
//     newUser.find(function (err, User) {
//       if(err) return console.error(err);
//       console.log(User);
//     })
//   });
//   promise2.then(function (newPoll) {
//     newUser.find(function (err, Poll) {
//       if(err) return console.error(err);
//       console.log(Poll);
//     })
//   });
// })

module.exports.save = function(obj, callback) {
  mongoose.connect('mongodb:' + URL + DB_NAME);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("db connected");
    var newPoll = new Poll(obj);
    var promise2 = newPoll.save(function (err) {
      if(err) return console.error(err);
    })
    promise2.then(function (newPoll) {
      newUser.find(function (err, Poll) {
        if(err) return console.error(err);
        console.log(Poll);
      })
    });
    callback();
  })
}

// var createPoll = function() {
//
// }
//
// var updatePoll = function() {
//
// }
//
// var deletePoll = function() {
//
// }
//
// var showPoll = function() {
//
// }
