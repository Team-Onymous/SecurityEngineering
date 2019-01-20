let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const rc522 = require('rc522-c7z');

paused = false;

io.origins(['http://localhost:8100', 'https://onycoin.nl']);

io.on('connection', (socket) => {


    socket.on('connection', message => {
       io.emit('connection', {type: 'the date is: ', text: Date()})
    });

    rc522.listen((serialNumber) => {
        if (serialNumber) {
            io.send(serialNumber)
        }
    });

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});
    });
});

// Initialize our websocket server on port 5000
http.listen(8080, () => {
    console.log('started on port 8080');
});