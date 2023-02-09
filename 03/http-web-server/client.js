const http = require('http');

http.request('http://localhost:3000?search=something',{method: 'GET'}, (res) => {
  res.pipe(process.stdout);
}).end()
