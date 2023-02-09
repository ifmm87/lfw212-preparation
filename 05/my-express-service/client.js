const http = require('http');
const HOST = 'http://localhost:3000'

Promise.resolve().then(() => {
  const data = [];
  return new Promise((resolve, reject) => {
    const req = http.request(`${HOST}/bicycles`,
      { method: 'POST',
        headers: {'content-type': 'application/json'}
      },
      (res) => {
        console.log(`STATUS ${res.statusCode}`)
        res.on('error', (err) => {
          reject(err)
        })
        if(res.statusCode === 500) res.emit('error', new Error('error 500'))
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data.push(chunk)
          // console.log('chunk', chunk, res.statusCode)
        }
        );
        res.on('end', () => {
          console.log('no more data in response from server')
          resolve(data)
        })
      }
    );
    req.write(JSON.stringify({ data: { brand: 'Gazelle', color: 'red'}}))
    req.end();
  })
}).then(result => {
  console.log('===============================')
  console.log(result)
  return new Promise((resolve, reject) => {
    const data = [];
    http.get(`${HOST}/bicycles/1`,
      { method: 'GET',
        headers: {'content-type': 'application/json'}
      },
      (res) => {

        console.log(`STATUS ${res.statusCode}`)
        res.on('error', (err) => {
          reject(err)
        })
        if(res.statusCode === 500) res.emit('error', new Error('error 500'))
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data.push(chunk);
          // console.log(chunk)
        })
        res.on('end', () => {
          resolve(data);
          console.log('end GET')
        })
      }
    )
  });
}).then(result => {
  console.log('==========GETTT=====================')
  console.log(result)
  return new Promise((resolve, reject) => {
    const req = http.request(`${HOST}/bicycles/1`, 
      { method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
      },
      (res) => {
        const data = [];
        console.log(`STATUS ${res.statusCode}`)
        res.on('error', (err) => {
          reject(err)
        })
        if(res.statusCode === 500) res.emit('error', new Error('error 500'))
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data.push(chunk)
          // console.log('chunk', chunk, res.statusCode)
        }
        );
        res.on('end', () => {
          console.log('no more data in response from server')
          resolve(data)
        })

      })
    req.write(JSON.stringify({data: {brand: 'VanMoodificadef', color: 'black'}}))
    req.end()
  })
}).then(result => {
  console.log('============PUT=======')
  console.log(result)
}).catch(error => {
  console.log('+++++++++++++++++++')
  console.error(error)
})
