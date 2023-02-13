const http = require('http');
const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
app.use((req, res, next) => {
  if(req.method !== 'GET') {
    res.status(404).send('it is not a get')
  }
  next()
});
app.use((req, res, next) => {
  console.log('>>>>>>>>>>>>>????', req.socket.remoteAddress, req.socket.localAddress)
  if(req.socket.remoteAddress === '127.0.0.1') {
    const err = new Error('forbidden');
    err.status = 403;
    next(err);
  } 
  next()
})
app.get('/status', (req, res, next) => {
  res.status(200).json({ message: 'server is running'});
})
// problem

app.use('/cars', require('./cars'))

// general error management
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'error ocurred');
});

const server = http.createServer(app);
server.listen(process.env.PORT,'0.0.0.0', () => {
  console.log('server running at', server.address());
})
