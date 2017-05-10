var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/cygwin64/home/Riyuyu/vote8/dist', 'index.html'));
});

app.get('/api', function (req, res) {
  console.log("enter api");
  res.send("Hello World!");
});

app.listen(8000, function () {
  console.log("express listening at port 8000");
});
