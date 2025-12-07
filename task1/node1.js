import http from 'http';
const server = http.createServer ((req, res) => {
  if (req.url === '/') {
    res.end ('Welcome to Home Page');
  } else if (req.url === '/info') {
    res.end ('This is the information page');
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on ('data', chunk => {
      body += chunk;
    });

    req.on ('end', () => {
      try {
        const jsonData = JSON.parse (body);
        res.writeHead (200);
        res.end (JSON.stringify (jsonData));
      } catch (err) {
        res.writeHead (400);
        res.end (JSON.stringify ({error: 'Invalid JSON'}));
      }
    });
  } else {
    res.end ('404 page not found');
  }
});
let port = 3000;
server.listen (port, () => {
  console.log (`Server is running on port ${port}`);
});
