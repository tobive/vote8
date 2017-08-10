var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/twitter', passport.authenticate('twitter', { scope: ['include_email=true']}));

router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

module.exports = router;
