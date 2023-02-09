var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const greeting = 'greeting' in req.query ? req.query.greeting: 'Hello'
  res.render('hello', {greeting})
  // res.send('respond with a resource');
});

module.exports = router;
