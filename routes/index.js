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
router.get('/blog', function (req, res, next) {
  res.render('blog');
});
router.get('/test', function (req, res, next) {
  res.render('test');
});
router.get('/contact', function (req, res, next) {
  res.render('contact');
});
router.get('/about', function (req, res, next) {
  res.render('about');
});
 
// yes route
router.get('/yes', function (req, res, next) {
  res.render('yes');
});
module.exports = router;
