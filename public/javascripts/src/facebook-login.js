"use strict";

var util = require('./util');

exports.checkLoginState = function() {
  FB.getLoginStatus(function(response) {
    _statusChangeCallback(response);
  });
};

exports.statusChangeCallback = function(response) {
  _statusChangeCallback(response);
};

var _statusChangeCallback = function(response) {
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    if(!util.readCookie('appState') || util.readCookie('appState') !== 'loggedIn') {
      util.post('/', {token: response.authResponse.accessToken});
    }
  } else if (response.status === 'not_authorized') {
    window.location.href = '/';
  } else {
    window.location.href = '/';
  }
};
