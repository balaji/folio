var express = require('express');
var FB = require('fb');
var router = express.Router();


router.get('/', function(req, res, next) {
  FB.api('/me/accounts', function(response) {
    console.log(response);
    res.render('pages', { title: 'Pages' });
  });
});

module.exports = router;
