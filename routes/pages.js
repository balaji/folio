var express = require('express');
var FB = require('fb');
var router = express.Router();
var filters = require('../lib/filters');

function hasExpired(response) {
  return response.error && response.error.type === 'OAuthException';
}

router.get('/', filters.hasAuthToken, function(req, res, next) {
  FB.setAccessToken(req.session.accessToken);
  FB.api('/me/accounts', function(response) {
    if(hasExpired(response)) {
      res.send('expired token. duh.');
    } else {
      res.render('pages', { title: 'Pages', pages: response.data });
    }
  });
});

module.exports = router;
