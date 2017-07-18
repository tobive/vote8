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

// function renderFullPage(html) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>Vote8</title>
//       </head>
//       <body>
//         <div id="root">${html}</div>
//       </body>
//     </html>
//   `
// }

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test8')
  .then(() => console.log('connection with db successfull'))
  .catch((err) => console.error(err));

//passport configuration
passport.use(new TwitterStrategy({
  consumerKey: 'PYa4lrVGc4c6RFPKfphtUV39W',
  consumerSecret: 'wJzykGLMsfPSAkjNflrw1JAYrY7kMgknqYLeD9xdAKO4WnKqTY',
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
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

app.use(express.static(path.resolve(__dirname, '/home/tobive/Project/vote8/dist')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/home/tobive/Project/vote8/dist', 'index.html'));
});

app.get('/auth/twitter', passport.authenticate('twitter', { scope: ['include_email=true']}));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.use('/api', api); //routes for api request

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

app.listen(PORT, function () {
  console.log("express listening at port " + PORT);
});
