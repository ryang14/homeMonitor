var express = require('express');
var router = express.Router();

router.get('/forms', function(req, res, next) {
  res.render('testForms', { title: 'API Test Forms' });
});

module.exports = router;