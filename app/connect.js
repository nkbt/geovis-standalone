const websocket = require('ws');
const {attacks, controls} = require('@nkbt/geovis');

const {
  WS_PORT = 10000
} = process.env;


module.exports = store => {
  const onMessage = function (raw) {
    const message = JSON.parse(raw);
    if (store.getState().controls === controls.STATE_PLAYING) {
      store.dispatch({type: attacks.ATTACKS_ADD, attacks: message.res});
    }
  };


  const onConnect = function () {
    this.send(JSON.stringify({action: 'GEO_START'}));
    this.on('message', onMessage);
  };


  const connect = () => websocket.connect(`ws://localhost:${WS_PORT}`, onConnect);

  connect();
};
