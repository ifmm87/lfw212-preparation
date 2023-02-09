const http =  require('http');
const PORT = 3000;
const server = http.createServer();
server.on('connection', () => {
  console.log('someone connected')
})
server.listening(PORT, () => console.log(`Server running on port ${PORT}`))
