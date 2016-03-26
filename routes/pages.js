var express = require('express');
var FB = require('fb');
var router = express.Router();

function hasAuthToken(req, res, next) {
  if (req.session.accessToken) {
    FB.setAccessToken(req.session.accessToken);
    return next();
  }
  res.redirect("/");
};

router.get('/', hasAuthToken, function(req, res, next) {
  FB.api('/me/accounts', function(response) {
    console.log(response);
    res.render('pages', { title: 'Pages', pages: response.data });
  });
});

module.exports = router;
