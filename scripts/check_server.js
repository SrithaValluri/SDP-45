const http = require('http');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const TIMEOUT = 2000;

const options = {
  hostname: HOST,
  port: PORT,
  path: '/',
  method: 'GET',
  timeout: TIMEOUT,
};

const req = http.request(options, (res) => {
  console.log(`Server reachable: ${HOST}:${PORT} - status ${res.statusCode}`);
  process.exit(0);
});

req.on('error', (err) => {
  console.error('Server not reachable:');
  console.error(err && (err.stack || err));
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Request timed out');
  req.destroy();
  process.exit(1);
});

req.end();
