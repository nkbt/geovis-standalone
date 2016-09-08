const {run} = require('@nkbt/geovis-server');

const {
  WS_HOST = '0.0.0.0',
  WS_PORT = 10000
} = process.env;

run({WS_HOST, WS_PORT});
