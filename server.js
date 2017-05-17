var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var database = require('./server/database');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist', 'index.html'));
});

app.get('/api/getRandom', function (req, res) {
  database.getRandom(function(obj) {
    if(!obj) console.log("Data empty");
    //console.log("FROM SERVER JS: ", obj);
    res.json(obj);
  });
});

app.get('/api/getLatest', function (req, res) {
  database.getLatest(function(obj) {
    if(!obj) console.log("Data Empty");
    //console.log("GETLATEST: ", obj);
    res.json(obj);
  });
});

app.get('/poll/:id', function (req, res) {
  database.getLink(req.params.id, function(obj, callback) {
    if(!obj) {
      res.status(404);
      callback;      
    }
    console.log("SENDING OBJ :", JSON.stringify(obj));
    callback;
    res.json(obj);
  });
});

app.use(bodyParser.json());
app.post('/api/postnew', function (req, res) {
  console.log("from server.js: POSTNEW " + JSON.stringify(req.body));
  database.save(req.body, () => console.log("SAVED NEW POLL"));
});

app.post('/api/postvote', function (req, res) {
  console.log("from server.js: POSTVOTE " + JSON.stringify(req.body));
  database.votepoll(req.body, () => console.log("VOTED!"));
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
