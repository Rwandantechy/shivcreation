var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET status  page. */
router.get('/status', function (req, res, next) {
  res.render('status', { title: 'status' });
});
router.get('/product', function (req, res, next) {
  res.render('product');
});

module.exports = router;
