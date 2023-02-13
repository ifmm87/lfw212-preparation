const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const finished = require('stream').finished;

router.get('/', function(req, res, next) {
  const { amount = 10 , type = 'html' } = req.query;

  if(type === 'html') res.type('text/html');
  if(type === 'json') res.type('application/json');
  // res.setHeader('content-type', 'application/json')
  const stream = hnLatestStream(amount, type);

  stream.pipe(res, { end: false });
  // stream.pipe(res,{ end: false});
  // stream.on('end', () => {
  //   console.log('endddd');
  //   res.end();
  // })
  // stream.on('error', (err) => {
  //   console.log(err);
  // });

  finished(stream, (err) => {
    if(err) {
      next(err);
      return
    }
     res.end();
  })

});

module.exports = router;
