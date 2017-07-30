var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var user = require('./server/db/userdb');
var database = require('./server/database');
var api = require('./server/routes/api-routes');
const PORT = process.env.PORT || 8000;
const xxx = require('./server/lib/server-app.js');

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
mongoose.connect('mongodb://localhost/test8', {useMongoClient: true})
  .then(() => console.log('connection with db successfull'))
  .catch((err) => console.error(err));

//passport configuration
passport.use(new TwitterStrategy({
  consumerKey: 'PYa4lrVGc4c6RFPKfphtUV39W',
  consumerSecret: 'wJzykGLMsfPSAkjNflrw1JAYrY7kMgknqYLeD9xdAKO4WnKqTY',
  callbackURL: 'http://localhost:8000/auth/twitter/callback',
  includeEmail: true
}, function(token, tokenSecret, profile, done) {
  console.log("CROOT");
  var me = new user({
    email: profile.emails[0].value,
    name: profile.displayName
  });
  user.findOne({ email: me.email }, function(err, u) {
    if(!u) {
      me.save(function (err, me) {
        if(err) return done(err);
        done(null, me)
      })
    } else {
      console.log(u);
      done(null, u);
    }
  })
}));

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

app.get('/auth/twitter', passport.authenticate('twitter', { scope: ['include_email=true']}));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

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
  database.getFromUser(req.user._id, function(obj) {
    if(!obj) console.log("Data Empty");
    res.render(req.url, {user: req.user, obj: obj});
  });
})

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

app.get('/vote/:id', function (req, res) {
  database.getLink(req.params.id, function(obj) {
    if(!obj) {
      res.render('/Error404');
    } else {
      console.log("SENDING OBJ :", JSON.stringify(obj));
      res.render('/poll', {pollServer: obj[0]});
    }
  });
});

app.get('*', (req, res) => {
  let obj = { user: req.user };
  res.render(req.url, obj);
});

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
