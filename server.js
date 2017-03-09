
import Hapi from 'hapi';
import codes from './util/names-util';
import sample from 'lodash/sample';

const port = process.env.PORT || 3001;

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
  host: 'localhost', 
  port: port 
});

// Add the route
server.route({
  method: 'GET',
  path:'/', 
  handler: (request, reply) => {

    return reply(sample(codes));
  }
});

// Start the server
server.start((err) => {
  if (err) {
      throw err;
  }
  console.log('Server running at:', server.info.uri);
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
