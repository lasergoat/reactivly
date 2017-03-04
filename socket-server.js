const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Redis = require('ioredis');
const redis = new Redis();

const port = process.env.PORT || 3001;

redis.subscribe('R', function(err, count) {
});

// when the PHP api sends an event, 
// push it to socket.io
redis.on('message', function(channel, message) {

  // message will look like:
  // {"event":"App\\Events\\BeginSlides","data":{"data":{"power":"10"},"socket":null},"socket":null}

  console.log('Message Recieved: ', message);
  message = JSON.parse(message);

  // event being pushed to socket will look like:
  // R:App\\Events\\BeginSlides with the message.data as payload
  const event = channel + ':' + message.event;
  console.log('Emitting to Socket: ', event);
  io.emit(event, message.data);
});

// Here's the part to listen for things from the audience:
io.on('connection', (client) => {  
  console.log('Socket connected...');

  client.on('emoji', (data) => {
     // client.emit('broad', data);
     // client.broadcast.emit('broad',data);
    console.log('Event from Audience Member:', data);
  });
});

http.listen(port, function(){
    console.log('Listening on Port '+ port);
});

