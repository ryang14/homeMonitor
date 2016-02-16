var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Monitor' });
});

router.get('/temp', function(req, res, next) {
  res.render('temp', { title: 'Temperature' });
});

module.exports = router;
