var express = require('express');
var FB = require('fb');
var router = express.Router();
var config = require('../config');
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

  //using the long lived token, generating a code to sent to client
  // FB.api('oauth/client_code', {
  //   client_id: config.appId,
  //   client_secret: process.env.APP_SECRET,
  //   redirect_uri: config.redirectUri,
  //   access_token: req.session.llToken
  // }, function(data2) {
  //   if(!data2 || data2.error) {
  //     console.log(!data2 ? 'error occurred' : data2.error);
  //     return;
  //   }

  res.cookie('appState','loggedIn', { maxAge: 900000, httpOnly: false });

  FB.setAccessToken(req.session.llToken);
  FB.api('', 'post', {
    batch: [
      {method: 'get', relative_url: '/me/accounts'},
      {method: 'get', relative_url: '/me'}]
    }, function(batchResponse) {
      handleResponse(res, batchResponse, function() {
        var response = JSON.parse(batchResponse[0].body);
        var profile = JSON.parse(batchResponse[1].body);
        console.log(response.data);
        res.render('pages', {
          pages: response.data,
          profile: profile,
          // code: data2.code,
          config: config
        });
      });
    });
    // });
  });

  module.exports = router;
