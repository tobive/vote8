var express = require('express');
var app = express();
var path = require('path');
var database = require('./server/database');
const PORT = process.env.PORT || 8000;

app.use(express.static(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist', 'index.html'));
});

app.get('/api', function (req, res) {
  console.log("enter api");
  res.send("Hello World!");
});

app.post('/postnew', function (req, res) {
  console.log("masuk post new: " + JSON.stringify(req));
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
