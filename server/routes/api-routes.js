var express = require('express');
var router = express.Router();
var database = require('../database');

router.post('/postnew', function (req, res) {
  req.body.userid = req.user ? req.user._id : 1;
  req.body.date = new Date();
  database.save(req.body, (err, link) => {
    let response = {
      status: "",
      link: ""
    };
    if(err) {
      response.status = 401;
    } else {
      console.log("New Poll Saved: ", response.link);
      response.status = 200;
      response.link = link;
    }
    res.json(response);
  });
});

router.post('/postvote', function (req, res) {
  database.votepoll(req.body, (err) => {
    if(err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

router.get('/getRandom', function (req, res) {
  database.getRandom(function(obj) {
    if(!obj) console.log("Data empty");
    res.json(obj);
  });
});

router.get('/getLatest', function (req, res) {
  database.getLatest(function(obj) {
    if(!obj) console.log("Data Empty");
    res.json(obj);
  });
});

router.post('/postEdited', function (req, res) {
  if(req.user) {
    database.findUserId(req.body.pollId, (result) => {
      if(req.user._id == result[0].userid) {//check if poll is owned by user
        req.body.editedObj.userid = req.user._id;
        req.body.editedObj.date = new Date();
        database.deletePoll(req.body.pollId, (err) => {
          if(err) return res.sendStatus(400);
          console.log("SUCCESS DELETING ", req.body.pollId);
          database.save(req.body.editedObj, (err) => {
            if(err) return res.sendStatus(400);
            console.log("SUCCESS EDITING POLL");
            res.sendStatus(200);
          });
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
        database.deletePoll(req.body.pollId, (err) => {
          if(err) return res.sendStatus(400);
          console.log("SUCCESS DELETING ", req.body.pollId);
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

router.get('/getPollByUser', function (req, res) {
  if(req.user) {
    database.getFromUser(req.user._id, function(obj) {
      if(!obj) console.log("Data Empty");
      res.json(obj);
    });
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;
