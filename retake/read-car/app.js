const http = require('http');
const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
const model = require('./model');

app.use(express.json());
app.use((req, res, next) => {
  // if(req.method !== 'GET') {
  //   res.status(404).send('it is not a get')
  // }
  next()
});
app.get('/status', (req, res, next) => {
  res.status(200).json({ message: 'server is running'});
})
// this is for each problem

app.get('/bicycles/:id', (req, res, next) => {
  const id = req.params.id;
  model.bicycle.read(id, (err, result) => {
    if(err) {
      if(err.message === 'not found'){
        err.status = 404;
      }
      return next(err)
    }
    console.log(result)
    res.status(200).json(result)
  })
});
app.post('/bicycles', (req, res, next) => {
  model.bicycle.create(req.body,(err, list) => {
    if(err) {
      next(err);
      return
    }
    res.json(list);
  })
})
app.delete('/bicycles/:id', (req, res, next) => {
  model.bicycle.del(req.params.id, (err, id) => {
    if(err) {
      if(err.message === 'not found') {
        err.status = 404;
      }
      next(err);
      return
    }
    res.json({ id })
  })
})
// general error management
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'error ocurred');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log('server running at', server.address());
})
