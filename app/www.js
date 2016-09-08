const http = require('http');
const fs = require('fs');
const path = require('path');


const {
  WS_PORT = 10000,
  WWW_HOST = '0.0.0.0',
  WWW_PORT = 8080
} = process.env;


const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/index.css': {
      res.setHeader('Content-Type', 'text/css');
      return fs.createReadStream(require.resolve('./index.css')).pipe(res);
    }
    case '/geovis.css': {
      res.setHeader('Content-Type', 'text/css');
      return fs.createReadStream(require.resolve('@nkbt/geovis/geovis.css')).pipe(res);
    }
    case '/react.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('react/dist/react.min.js')).pipe(res);
    }
    case '/react-dom.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('react-dom/dist/react-dom.min.js')).pipe(res);
    }
    case '/redux.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('redux/dist/redux.min.js')).pipe(res);
    }
    case '/react-redux.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('react-redux/dist/react-redux.min.js')).pipe(res);
    }
    case '/three.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('three/build/three.min.js')).pipe(res);
    }
    case '/port.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return res.end(`var WS_PORT=${WS_PORT};`);
    }
    case '/geovis.js': {
      res.setHeader('Content-Type', 'text/javascript');
      return fs.createReadStream(require.resolve('@nkbt/geovis/build/@nkbt/geovis.js'))
        .pipe(res);
    }
    case '/': {
      res.setHeader('Content-Type', 'text/html');
      return fs.createReadStream(require.resolve('./www.html')).pipe(res);
    }
    default: {
      res.writeHead(404);
      res.end('Not found');
    }
  }

});

server.listen(WWW_PORT, WWW_HOST, function () {
  console.log(`www listens on: http://${WWW_HOST}:${WWW_PORT}`);
});
