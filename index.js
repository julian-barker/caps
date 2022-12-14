'use strict';

const { Server } = require('socket.io');
const logger = require('./handlers/eventLog') ;

const io = new Server();

const shipping = io.of('/shipping');

shipping.on('connection', (socket) => {
  console.log('Socket connected to shipping namespace!', socket.id);

  socket.onAny((eventName, payload) => {
    logger(eventName, payload);
    socket.broadcast.emit(eventName, payload);
  });
});

io.listen(3002);


