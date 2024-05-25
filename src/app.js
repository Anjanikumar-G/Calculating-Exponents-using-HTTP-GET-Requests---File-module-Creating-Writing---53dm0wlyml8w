const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let chunks = '';

    req.on('data', chunk => {
      chunks += chunk;
    });

    req.on('end', () => {
      try {
        const obj = JSON.parse(chunks);
        const value1 = obj.num1;
        const value2 = obj.num2;

        // Check if num1 is a positive integer
        if (value1 <= 0 || !Number.isInteger(value1)) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('The operation cannot be performed');
        }

        // Check if num2 is a non-negative integer
        else if (value2 < 0 || !Number.isInteger(value2)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Error: num2 must be a non-negative integer');
        }

        // Calculate the exponential result
        else {
          const result = Math.pow(value1, value2);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(`The result is ${result}`);
        }
      } 
      catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error: invalid input format');
      }
    });
  } 
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error: only POST requests are supported');
  }
});

module.exports = server;
