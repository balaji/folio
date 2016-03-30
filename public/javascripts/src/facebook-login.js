"use strict";

var util = require('./util');

exports.checkLoginState = function () {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            util.post('/', {token: response.authResponse.accessToken});
        }
        _statusChangeCallback(response);
    });
};

exports.statusChangeCallback = function (response) {
    _statusChangeCallback(response);
};

var _statusChangeCallback = function (response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        if ((!util.readCookie('appState') || util.readCookie('appState') !== 'loggedIn')
            && !window.location.href.match(/logout/)) {
            util.post('/', {token: response.authResponse.accessToken});
        }
    }
};
