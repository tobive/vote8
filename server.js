var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var database = require('./server/database');
var api = require('./server/routes/api-routes');
const PORT = process.env.PORT || 8000;
const xxx = require('./server/lib/server-app.js');

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Vote8</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `
}

app.use(express.static(path.resolve(__dirname, '/home/tobive/Project/vote8/dist')));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/home/tobive/Project/vote8/dist', 'index.html'));
});


// app.post('/api/postnew', function (req, res) {
//   console.log("from server.js: POSTNEW " + JSON.stringify(req.body));
//   database.save(req.body, () => console.log("SAVED NEW POLL"));
// });
//
// app.post('/api/postvote', function (req, res) {
//   console.log("from server.js: POSTVOTE " + JSON.stringify(req.body));
//   database.votepoll(req.body, () => console.log("VOTED!"));
// });
//
// app.get('/api/getRandom', function (req, res) {
//   database.getRandom(function(obj) {
//     if(!obj) console.log("Data empty");
//     //console.log("FROM SERVER JS: ", obj);
//     res.json(obj);
//   });
// });
//
// app.get('/api/getLatest', function (req, res) {
//   database.getLatest(function(obj) {
//     if(!obj) console.log("Data Empty");
//     //console.log("GETLATEST: ", obj);
//     res.json(obj);
//   });
// });

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

app.get('/testtest', function (req, res) {
  let test = xxx({
    _id: 12423556,
    title: "shouu",
    description: "wakuwaku",
    date: "",
    link: "zKD5",
    options: [
      {
        name: "Real"
      },
      {
        name: "Juve"
      }
    ]
  });
  console.log("ISI OBJ " + test);
  res.send(renderFullPage(test));
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
