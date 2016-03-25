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
    util.post('/', {token: response.authResponse.accessToken});
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
  } else {
    // The person is not logged into Facebook
  }
};
