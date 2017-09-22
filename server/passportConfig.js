var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var User = require('./db/userdb');
const URL = process.env.APP_URL || require('../config/main').MAIN_URL;
const TWITTER_KEY = process.env.TWITTER_LOGIN_KEY;
const TWITTER_SECRET = process.env.TWITTER_LOGIN_SECRET;
const GITHUB_ID = process.env.GITHUB_LOGIN_ID;
const GITHUB_SECRET = process.env.GITHUB_LOGIN_SECRET;

var twitterLogin = new TwitterStrategy({
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
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
  clientID: GITHUB_ID,
  clientSecret: GITHUB_SECRET,
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
