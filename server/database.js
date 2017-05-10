var mongoose = require('mongoose');
var assert = require('assert');
var User = require('./db/userdb');
var Poll = require('./db/polldb');
const URL = process.env.MONGOLAB_URI || '//localhost/';
const DB_NAME = 'vote8';

mongoose.connect('mongodb:' + URL + DB_NAME);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
  var newUser = new User({
    username: 'praboe',
    password: 'praboer'
  });
  var promise = newUser.save(function (err) {
    if(err) return console.error(err);
  })
  promise.then(function (newUser) {
    newUser.find(function (err, User) {
      if(err) return console.error(err);
      console.log(User);
    })
  });
})

// mongoose.connect('mongodb://localhost/jotun5');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("db connected");
//   var silence = new Kitten({name: 765});
//   console.log(silence.name);
//   var fluffy = new Kitten({
//     name: 'joko',
//     options: [{
//       id: 1,
//       name: "polo",
//       tally: 5
//     }]
//   });
//   var promise = fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//     fluffy.list();
//   });
//   promise.then(console.log("find all kitten-------"))
//     .then(() => Kitten.find(function (err, kucing) {
//       if(err) return console.error(err);
//       console.log("isi kucing:");
//       console.log(kucing);
//     }))
//     .then(console.log("Owariiii---"));
// });

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
