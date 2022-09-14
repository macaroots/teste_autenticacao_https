var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./server_key.pem'),
  cert: fs.readFileSync('./server_cert.pem'),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync('./server_cert.pem')]
};

https.createServer(options, function (req, res) {
  const cert = req.socket.pair?._ssl?.getPeerCertificate() || 'nulo';
  console.log('cert', cert)
  console.log('cliente', req.client.authorized);

  res.end(cert);
}).listen(8000);

console.log('Server listening to 8000');