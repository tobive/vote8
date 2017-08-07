var express = require('express');
var router = express.Router();
var database = require('../database');

router.post('/postnew', function (req, res) {
  console.log("from " + req.user + " from server.js: POSTNEW " + JSON.stringify(req.body));
  req.body.userid = req.user ? req.user._id : 1;
  req.body.date = new Date();
  database.save(req.body, (err) => {
    if(err) res.sendStatus(401);
    console.log("SAVED NEW POLL");
    res.sendStatus(200);
  });
});

router.post('/postvote', function (req, res) {
  console.log("from server.js: POSTVOTE " + JSON.stringify(req.body));
  database.votepoll(req.body, () => {
    console.log("VOTED!");
    res.sendStatus(200);
  });
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

router.post('/postEdited', function (req, res) {
  console.log("from " + req.user._id + " from server.js: POSTEDITED " + JSON.stringify(req.body));
  if(req.user) {
    database.findUserId(req.body.pollId, (result) => {
      if(req.user._id == result[0].userid) {//check if poll is owned by user
        req.body.editedObj.userid = req.user._id;
        req.body.editedObj.date = new Date();
        database.deletePoll(req.body.pollId, () => console.log("SUCCESS DELETING ", req.body.pollId));
        database.save(req.body.editedObj, () => {
          console.log("SUCCESS EDITED POLL");
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(403);
  }
})

router.post('/deletePoll', function (req, res) {
  if(req.user) {
    database.findUserId(req.body.pollId, (result) => {
      if(req.user._id == result[0].userid) {
        database.deletePoll(req.body.pollId, () => console.log("SUCCESS DELETING ", req.body.pollId));
        res.sendStatus(200);
      } else {
        console.log("\n\nERROR DI SINI\n\n");
        res.sendStatus(403);
      }
    });
  } else {
    console.log("\n\nERROR DI SANA\n\n");
    res.sendStatus(403);
  }
})

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
