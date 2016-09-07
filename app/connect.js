const websocket = require('ws');

const {
  WS_PORT = 10000
} = process.env;


module.exports = _store => {
  const onMessage = function (raw) {
    const message = JSON.parse(raw);

    // TODO: add attacks to store
    console.log(`message`, message);
  };


  const onConnect = function () {
    this.send(JSON.stringify({action: 'GEO_START'}));
    this.on('message', onMessage);
  };


  const connect = () => websocket.connect(`ws://localhost:${WS_PORT}`, onConnect);

  connect();
};
