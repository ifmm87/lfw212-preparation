const createError = require('http-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const proxy = require('http-proxy-middleware');
dotenv.config();
const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customers');
const customersTemplateRouter = require('./routes/customers-template');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(fileUpload());
app.use((req, res, next) => {
  console.log('la ipppp', req.socket.remoteAddress)
  if(req.socket.remoteAddress === '::ffff:192.168.100.65') {
    res.status(403).end();
  } else next();
})
app.use(
  '/json_placeholder',
  proxy.createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true,
    pathRewrite: { '^/json_placeholder': 'posts' },
  })
);
app.use(
  '/combinator',
  proxy.createProxyMiddleware({
    target: 'https://news.ycombinator.com',
    changeOrigin: true,
    pathRewrite: { '^/combinator': '' },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer-template', customersTemplateRouter);
app.use('/customers', customersRouter);
app.post('/upload', (req, res) => {
  const files = req.files;
  console.log('coppying to ', __dirname, files.miarchivo.name)
  files.miarchivo.mv(`${__dirname}/${files.miarchivo.name}`, (err) => {
    // console.log(files.miarchivo.data.toString());
    if(err) {
      res.end(err);
      return;
    }
    res.end('uploaded')
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
