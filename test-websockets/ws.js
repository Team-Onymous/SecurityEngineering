const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 40510});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Received: ', message);
    });

    setInterval(
        () => ws.send(`${new Date()}`),
        2000
    );
});
