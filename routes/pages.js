var express = require('express');
var FB = require('fb');
var router = express.Router();
var filters = require('../lib/filters');

function hasExpired(response) {
  return response.error && response.error.type === 'OAuthException';
}

function handleResponse(res, fbResponse, handlerFn) {
  if(hasExpired(fbResponse)) {
    res.redirect('/pages');
  } else {
    handlerFn();
  }
}

router.get('/', filters.hasAuthToken, function(req, res, next) {
  FB.setAccessToken(req.session.accessToken);
  FB.api('/me/accounts', function(response) {
    handleResponse(res, response, function() {
      console.log(response.data);
      res.render('pages', { title: 'Pages', pages: response.data });
    });
  });
});

module.exports = router;
