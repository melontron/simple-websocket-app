const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080/path',["my-custom-subprotocol"], {
    headers: {token: "some_super_secret_token"}
});

ws.on('open', function open() {
    ws.send('something ' + Math.random());
});

ws.on('message', function incoming(data) {
    console.log("Got from server", data);
});


ws.on("error", (err)=>{
    console.log(err.message, err.code);
});