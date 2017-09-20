var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var User = require('./db/userdb');
const URL = require('../config/main').MAIN_URL;

var twitterLogin = new TwitterStrategy({
  consumerKey: 'PYa4lrVGc4c6RFPKfphtUV39W',
  consumerSecret: 'wJzykGLMsfPSAkjNflrw1JAYrY7kMgknqYLeD9xdAKO4WnKqTY',
  callbackURL: URL + '/auth/twitter/callback',
  includeEmail: true
}, function(token, tokenSecret, profile, done) {
  var me = new User({
    email: profile.emails[0].value,
    name: profile.displayName
  });
  User.findOne({ email: me.email }, function(err, u) {
    if(!u) {
      me.save(function (err, me) {
        if(err) return done(err);
        done(null, me)
      })
    } else {
      done(null, u);
    }
  })
});

var githubLogin = new GithubStrategy({
  clientID: 'f02a0084d7bec0fbf8e2',
  clientSecret: '75d889e5c67cf7f522725acec596350802130e59',
  callbackURL: URL + '/auth/github/callback',
  scope: 'user:email'
}, function(token, tokenSecret, profile, done) {
  var me = new User({
    email: profile.emails[0].value,
    name: profile.name
  });
  User.findOne({ email: me.email }, function(err, u) {
    if(!u) {
      me.save(function (err, me) {
        if(err) return done(err);
        done(null, me)
      })
    } else {
      done(null, u);
    }
  })
});

module.exports.twitterLogin = twitterLogin;
module.exports.githubLogin = githubLogin;
