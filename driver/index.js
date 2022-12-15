'use strict';

const { io } = require('socket.io-client');
const confirmReceipt = require('../handlers/receipt');
const sendReceipt = require('../handlers/sendReceipt');


const socket = io('http://localhost:3003/shipping');
const stores = ['1-800-flowers', 'acme-widgets'];

socket.on('connect', () => {
  console.log(`Connected to socket: ${socket.id}`);

  socket.emit('JOIN', stores);
  socket.emit('GET_MESSAGES', {
    from: 'vendor',
    stores,
  });
});

socket.on('MESSAGE', (payload) => {
  console.log('received a message', payload);
  sendReceipt(socket, payload, 'driver');

  setTimeout(() => {
    console.log('Sending "in transit"');
    payload.message = 'In transit.';
    socket.emit('IN_TRANSIT', payload);
  }, 2000);

  setTimeout(() => {
    console.log('Sending "delivered"');
    payload.message = 'Delivered successfully!';
    socket.emit('MESSAGE', payload);
  }, 5000);
});

socket.on('RECEIVED', (payload) => {
  confirmReceipt(payload);
});
