let WebSocketServer = require('ws').Server;


let wss = new WebSocketServer({
    verifyClient: function (info, cb) {
        let token = info.req.headers.token;
        if (!token)
            cb(false, 401, 'Unauthorized');
        else {
            // here should be your authorization logic
            // I'm just hardcoding the desired token value for the simplicity
            if (token === "some_super_secret_token") {
                info.req.user = {
                    name: "John Doe",
                    token: token,
                    email: "johndoe@example.com"
                };
                cb(true)
            } else {
                cb(false, 401, "unauthorized")
            }
        }
    },
    port: 8080
});


wss.on('connection', function connection(ws, req) {
    console.log("Connected user is", req.user);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('pong', function incoming(message) {
        console.log('pong: %s', message);
    });

    let interval = setInterval(() => {
        try{
            ws.send(Math.random());
        }catch(e){
            console.log("There was an error", e)
        }
    }, 1000);


});

wss.on("error", (err)=>{
    console.log(err);
});
