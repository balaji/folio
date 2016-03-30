var express = require('express');
var FB = require('fb');
var router = express.Router();
var config = require('../config');
var filters = require('../lib/filters');

function hasExpired(response) {
	return response.error && response.error.type === 'OAuthException';
}

function handleResponse(res, fbResponse, handlerFn) {
	if (hasExpired(fbResponse)) {
		res.redirect('/');
	} else {
		handlerFn();
	}
}

router.get('/', filters.hasAuthToken, function (req, res, next) {
	FB.setAccessToken(req.session.llToken);
	FB.api('', 'post', {
		batch: [
			{method: 'get', relative_url: '/me/accounts'},
			{method: 'get', relative_url: '/me'}]
	}, function (batchResponse) {
		handleResponse(res, batchResponse, function () {
			var response = JSON.parse(batchResponse[0].body);
			var profile = JSON.parse(batchResponse[1].body);

			res.render('pages', {
				pages: response.data,
				profile: profile,
				config: config
			});
		});
	});
});

module.exports = router;
