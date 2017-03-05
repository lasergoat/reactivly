const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Redis = require('ioredis');
const redis = new Redis();

const port = process.env.PORT || 3001;

var state = {
  lastPresenterEvent: {}
} 

redis.subscribe('R', function(err, count) {
});

// when the PHP api sends an event, 
// push it to socket.io
redis.on('message', function(channel, message) {

  // message will look like:
  // {"event":"App\\Events\\BeginSlides","data":{"data":{"power":"10"},"socket":null},"socket":null}

  console.log('Message Recieved: ', message);
  const messageData = JSON.parse(message);

  // event being pushed to socket will look like:
  // R:App\\Events\\BeginSlides with the message.data as payload
  const event = channel + ':' + messageData.event;
  console.log('Emitting to Socket: ', event, messageData.data);

  // store the slides name for late joiners
  if (event === 'App\\Events\\BeginSlides') {
    state = {
      lastPresenterEvent: {
        event: event,
        data: messageData.data
      }
    };
  }

  io.emit(event, messageData.data);
});

// when an audience member joins give them the slide url
// if it exists
io.on('connection', (client) => {  
  console.log('Socket connected...');

  // when a user first connects, give them the last event from the presenter also
  // (if there is one)
  if (state.lastPresenterEvent) {
    console.log('pushing to new person', state);
    io.emit(
      state.lastPresenterEvent.event,
      state.lastPresenterEvent.data
    );
  }
});

http.listen(port, function(){
  console.log('Listening on Port '+ port);
});
