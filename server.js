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

app.get('/getRandom', function (req, res) {
  database.getRandom(function(obj) {
    if(!obj) console.log("Data empty");
    console.log("FROM SERVER JS: ", obj);
    res.json(obj);
  });
});

app.use(bodyParser.json());
app.post('/postnew', function (req, res) {
  console.log("from server.js: " + JSON.stringify(req.body));
  database.save(req.body, () => console.log("SAVED"));
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
