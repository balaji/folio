var express = require('express');
var FB = require('fb');
var router = express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Sets up FB API with access token and redirects to /pages. */
router.post('/', function(req, res, next) {
  req.session.accessToken = req.body.token;  
  res.redirect('/pages');
});

module.exports = router;
