
const express = require('express');  
const cors = require('cors');
const app = express();  
const server = require('http').createServer(app);  
const socket = require('socket.io')(server);

app.use(cors());

import get from 'lodash/get';
import codes from './util/names-util';
import sample from 'lodash/sample';

const port = process.env.PORT || 3001;

const rooms = {};

// Create a server with a host and port
// const server = new Hapi.Server();

// server.connection({ 
//   host: 'localhost', 
//   port: port 
// });

server.listen(port, function(){
  console.log('Listening on Port '+ port);
});

// Add the route
app.get('/room', function (req, res) {
  res.send(sample(codes))
})

// todo: 
// need a system to delete rooms once they haven't been used in a while
// also, need to only assign rooms which aren't being used

socket.on('connection', (sock) => {
  let thisSocketRoom = null;

  // once a client has connected, we expect to get a ping from them saying what room they want to join
  sock.on('presenter', ({ url }) => {
    const room = sample(codes);

    rooms[room] = {
      url,
      presenter: sock
    };
    sock.emit('assignroom', { room });

    console.log('presenter found', { room, url });
  });

  sock.on('endpresentation', ({ room }) => {
    const currentRoom = get(rooms, room);

    if (currentRoom) {
      delete rooms[room];
    }

    sock.broadcast.to(room).emit('noslides', {
      error: 'No presentation with this code'
    });

  });

  sock.on('room', ({ room, name }) => {
    console.log('someone joined '+ room);

    const currentRoom = get(rooms, room);

    if (currentRoom) {
      thisSocketRoom = currentRoom;
      sock.join(room);
      sock.emit('slides', {
        url: currentRoom.url
      });
    } else {
      sock.emit('noslides', {
        error: 'No presentation with this code'
      });
    }

    // to send to everyone in room
    // sock.broadcast.to(room).emit('react', {emoji: 'poop'});
  });

  sock.on('react', ({ emoji, intensity }) => {
    // console.log(thisSocketRoom, emoji, intensity);
    if (thisSocketRoom) {
      thisSocketRoom.presenter.emit(
        'react',
        { emoji, intensity }
      );
    }
  });

  sock.on('question', ({ question, name }) => {
    // console.log(thisSocketRoom, question, name);
    if (thisSocketRoom) {
      thisSocketRoom.presenter.emit(
        'question',
        { question, name }
      );
    }
  });
});

var state = {
  lastPresenterEvent: {}
}
// when a presenter starts slides, 
// send to that audience and store the data

// when an audience member comes in, find their presenter
// send them the slide data

// when an audience asks question or reacts, send to that presenter

// when an audience member joins give them the slide url
// if it exists
// io.on('connection', (client) => {  

  // when a user first connects, give them the last event from the presenter also
  // (if there is one)
//   if (state.lastPresenterEvent) {
//     console.log('pushing to new person', state);
//     io.emit(
//       state.lastPresenterEvent.event,
//       state.lastPresenterEvent.data
//     );
//   }
// });

// http.listen(port, function(){
//   console.log('Listening on Port '+ port);
// });
