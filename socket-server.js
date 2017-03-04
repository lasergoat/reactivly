const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Redis = require('ioredis');
const redis = new Redis();

const port = process.env.PORT || 3001;

redis.subscribe('test-channel', function(err, count) {
});

redis.on('message', function(channel, message) {
    console.log('Message Recieved: ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

http.listen(port, function(){
    console.log('Listening on Port '+ port);
});

