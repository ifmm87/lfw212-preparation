const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { rootDir } = require('show-public-content/utils.js');
console.log('rootDir', rootDir);
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.status(404).send('it is not a get');
  }
  next();
});
app.get('/status', (req, res, next) => {
  res.status(200).json({ message: 'server is running' });
});
// this is for each problem

// app.use(express.static(path.join(rootDir, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

app.get('/:pathname', (req, res, next) => {
  const pathname = req.params.pathname;
  const files = fs.readdirSync(path.join(rootDir, 'public'));
  let foundedFile = null;
  for (const file of files) {
    const { name, base } = path.parse(file);
    if (pathname === name || pathname === base) {
     foundedFile = path.join(rootDir, 'public', base);
      break;
    }
  }
  if(foundedFile) {
    res.sendFile(foundedFile);
  } else {
    const err = new Error();
    err.message = 'file does not exist';
    err.status = 404;
    return next(err);
  }

  // const pathnameFile = path.join(rootDir, 'public', pathname);
  // fs.access(pathnameFile, fs.constants.F_OK, (err) => {
  //   if (err) {
  //       err.message = 'file does not exist';
  //       err.status = 404;
  //       return next(err);
  //   }
  //   const content = fs.readFileSync(pathnameFile);
  //   res.status(200).send(content);
  // });

  // fs.readFile(path.join(rootDir, 'public', file), (err, data) => {
  //   if (err) {
  //     if (err.code === 'ENOENT') {
  //       err.message = 'file doesjjjj not exist';
  //       err.status = 400;
  //       return next(err);
  //     } else next(err);
  //   }
  //   res.status(200).send(data);
  // });

});

// general error management
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'error ocurred');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log('server running at', server.address());
});
