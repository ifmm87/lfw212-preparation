const http = require('http');
const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
const url = require('url')
const axios = require('axios')

app.use((req, res, next) => {
  if(req.method !== 'GET') {
    res.status(404).send('it is not a get')
  }
  next()
});
app.get('/status', (req, res, next) => {
  res.status(200).json({ message: 'server is running'});
})
// this is for each problem
const err = new Error();
app.get('/', async (req, res, next) => {
  try {
    const source = req.query.source;
    if(!source) {
      err.message = 'url is required'
      err.status = 400;
      return next(err)
    }
    const urlFinal = url.parse(source);
    console.log(urlFinal)
    const response = await axios(urlFinal.href)
    const { status, headers, data } = response;
    res.status(200).json({ status, headers, data })
  } catch(error) {
    if(error.response)
      res.status(400).json({ status: error.response.status, headers : error.response.headers, body: error.response.data })
    else {
        return next(error);
      }
  }
})

// general error management
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'error ocurred');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log('server running at', server.address());
})
