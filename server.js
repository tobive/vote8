var express = require('express');
var app = express();

app.get('/api', function (req, res) {
  res.send("Hello World!");
});

app.listen(8000, function () {
  console.log("express listening at port 8000");
});
