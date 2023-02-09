const http = require('http');
const url = require('url');

const server = http.createServer();
const STATUS_CODES = http.STATUS_CODES;
const PORT = 3000;
const hello =  `
  <html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
    </style>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
`
const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`
server.on('request', (req, res) => {
  res.setHeader('Content-type', 'text/html')
  // res.write(html);
  // res.write(html)
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end(STATUS_CODES[res.statusCode] + '\r\n')
    return
  }
  const { pathname, search } = url.parse(req.url)
  if (pathname === '/') {
    console.log(search)
    res.end(root)
    return
  }
  if (pathname === '/hello') {
    res.end(hello)
    return
  }
  res.statusCode = 404
  res.end(STATUS_CODES[res.statusCode] + '\r\n')
})

server.listen(PORT, () => {
  console.log('server is running at port', PORT)
})
