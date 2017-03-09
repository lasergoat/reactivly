'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _namesUtil = require('./util/names-util');

var _namesUtil2 = _interopRequireDefault(_namesUtil);

var _sample = require('lodash/sample');

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3001;

// Create a server with a host and port
var server = new _hapi2.default.Server();

server.connection({
  host: 'localhost',
  port: port
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(request, reply) {

    return reply((0, _sample2.default)(_namesUtil2.default));
  }
});

// Start the server
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

var state = {
  lastPresenterEvent: {}
};

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