var express = require('express');
var router = express.Router();
var database = require('../database');

router.post('/postnew', function (req, res) {
  console.log("from " + req.user + " from server.js: POSTNEW " + JSON.stringify(req.body));
  req.body.userid = req.user ? req.user._id : 1;
  req.body.date = new Date();
  database.save(req.body, () => console.log("SAVED NEW POLL"));
});

router.post('/postvote', function (req, res) {
  console.log("from server.js: POSTVOTE " + JSON.stringify(req.body));
  database.votepoll(req.body, () => console.log("VOTED!"));
});

router.get('/getRandom', function (req, res) {
  database.getRandom(function(obj) {
    if(!obj) console.log("Data empty");
    //console.log("FROM SERVER JS: ", obj);
    res.json(obj);
  });
});

router.get('/getLatest', function (req, res) {
  database.getLatest(function(obj) {
    if(!obj) console.log("Data Empty");
    //console.log("GETLATEST: ", obj);
    res.json(obj);
  });
});

// router.get('/getFromUser', function (req, res) {
//   if(req.user) {
//     database.getFromUser(req.user._id, function(obj) {
//       // console.log("INILAH ISI OBJ: ", obj);
//       if(!obj) console.log("Data Poll Empty");
//       //let blabla = JSON.stringify(obj);
//       // res.header("Access-Control-Allow-Origin", "*");
//       // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       let objArr = {obj: obj};
//       res.render(req.url, {obj: ["a","b","c"]});
//     });
//   } else {
//     res.json({});
//   }
// });

module.exports = router;
