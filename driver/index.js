'use strict';

const { io } = require('socket.io-client');
const confirmReceipt = require('../handlers/receipt');
const sendReceipt = require('../handlers/sendReceipt');


const socket = io('http://localhost:3002/shipping');

socket.on('connect', () => {
  console.log(`Connected to socket: ${socket.id}`);
});

socket.on('RECEIVED', (payload) => {
  confirmReceipt(payload);
});

socket.on('PICK_ME_UP', (payload) => {
  sendReceipt(socket, 'PICK_ME_UP', 'Driver');

  setTimeout(() => {
    socket.emit('IN_TRANSIT', payload);
  }, 2000);

  setTimeout(() => {
    socket.emit('DELIVERED', payload);
  }, 5000);
});
