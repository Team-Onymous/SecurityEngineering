const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 40510});
    paused = false;

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Received: ', message);
        if(message === 'pause') {
            paused = true;
        } else {
            paused = false;
        }
    });

    setInterval(
        () => {
            console.log(paused);
            if (!paused) {
                ws.send(`${new Date()}`);
            }
        },
        2000
    );
});
