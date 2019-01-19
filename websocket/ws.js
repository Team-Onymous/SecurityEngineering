const rc522 = require('rc522-c7z');
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

    rc522.listen((serialNumber) => {
        if (!paused) {
            ws.send(serialNumber);
        }
    });
});
