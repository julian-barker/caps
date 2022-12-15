'use strict';

const { Server } = require('socket.io');
const logger = require('./eventLog') ;
const Queue = require('./queue');
const confirmReceipt = require('../handlers/receipt');

const io = new Server();
const messages = new Queue();

const shipping = io.of('/shipping');

shipping.on('connection', (socket) => {
  console.log('Socket connected to shipping namespace!', socket.id);
  socket.on('JOIN', (rooms) => {
    socket.join(rooms);
  });

  socket.onAny((eventName, payload) => {
    logger(eventName, payload);
  });

  socket.on('MESSAGE', payload => {
    const { from, store } = payload;
    console.log(from, store);
    let storeQueue = messages.read(store);
    if(!storeQueue) {
      storeQueue = messages.store(store, new Queue());
    }
    let queue = storeQueue.read(from);
    if(!queue) {
      queue = storeQueue.store(from, new Queue());
    }
    queue.store(payload.messageId, payload);
    console.log('attempting to forwarding message');
    socket.to(store).emit('MESSAGE', payload);
  });

  socket.on('RECEIVED', payload => {
    confirmReceipt(payload);
    const { from, store, messageId } = payload;
    let storeQueue = messages.read(store);
    let queue = storeQueue.read(from);

    if(!queue.read(messageId)) {
      throw 'Received receipt but no messages in the queue!';
    }
    queue.remove(messageId);

    socket.to(store).emit('RECEIVED', payload);
  });

  socket.on('GET_MESSAGES', payload => {
    const { from, stores } = payload;
    stores.forEach(store => {
      let storeQueue = messages.read(store);
      let queue;
      if (storeQueue) {
        queue = storeQueue.read(from);
      }
      if (queue && queue.data) {
        let storeMessageIds = Object.keys(queue.data);
        storeMessageIds.forEach(messageId => {
          console.log('sending queued message');
          socket.emit('MESSAGE', queue.read(messageId));
        });
      }
    });
  });
});

io.listen(3003);

