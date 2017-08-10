var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var Login = require('./server/passportConfig');
var user = require('./server/db/userdb');
var database = require('./server/database');
var api = require('./server/routes/api-routes');
var auth = require('./server/routes/auth-routes');
const PORT = process.env.PORT || 8000;
const DB = require('./config/main').DATABASE;

//react-engine configuration
import ReactEngine from 'react-engine';
import routes from './app/routes.jsx';
var engine = ReactEngine.server.create({
  routes: routes,
  routesFilePath: path.join(__dirname, '/app/routes.jsx'),
  performanceCollector: function(stats) {
    console.log(stats);
  }
});
app.engine('.jsx', engine);
app.set('views', path.join(__dirname, '/app/component'));
app.set('view engine', 'jsx');
app.set('view', ReactEngine.expressView);

//connecting db
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DB, {useMongoClient: true})
  .then(() => console.log('connection with db successfull'))
  .catch((err) => console.error(err));

//passport configuration
passport.use(Login.twitterLogin);
passport.use(Login.githubLogin);
passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    done(err, user);
  });
})

app.use(express.static(path.join(__dirname, '/app')));
app.use(bodyParser.json());

//app.use for passport
app.use(require('express-session')({
  secret: 'uemura rina',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);

// login check
function loggedIn(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.redirect('/signin');
  }
}

//routes for api request
app.use('/api', api);
app.get('/dashboard', loggedIn, function(req, res) {
  res.render(req.url, {user: req.user});
});
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/vote/:id', function (req, res) {
  database.getLink(req.params.id, function(obj) {
    let objSend = {};
    objSend.user = req.user ? req.user : null;
    if(!obj[0]) {
      res.render('/error404', objSend);
    } else {
      objSend.pollServer = obj[0];
      console.log("SENDING VOTE/ :", JSON.stringify(obj));
      res.render(req.url, objSend);
    }
  });
});
app.get('/edit/:id', loggedIn, function (req, res) {
  database.getLink(req.params.id, function(obj) {
    let objSend = {};
    objSend.user = req.user ? req.user : null;
    if(!obj[0]) {
      res.render('/error404', objSend);
    } else {
      objSend.pollServer = obj[0];
      console.log("SENDING /EDIT :", JSON.stringify(obj));
      res.render(req.url, objSend);
    }
  });
});

app.get('/', (req, res) => {
  let obj = {};
  if(req.user) {
    obj.user = req.user;
    database.getFromUser(req.user._id, function(data) {
      if(data) obj.obj = data;
      res.render(req.url, obj);
    });
  } else {
    res.render(req.url, obj);
  }
});

app.get('*', (req, res) => {
  let obj = {user: req.user};
  res.render(req.url, obj);
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
