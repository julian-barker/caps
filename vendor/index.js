'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const confirmReceipt = require('../handlers/receipt');
const sendReceipt = require('../handlers/sendReceipt');

const socket = io('http://localhost:3002/shipping');
const chance = new Chance();

socket.on('connect', () => {
  console.log(`Connected to socket: ${socket.id}`);
});

socket.on('RECEIVED', (payload) => {
  confirmReceipt(payload);
});

socket.on('IN_TRANSIT', (payload) => {
  sendReceipt(socket, 'IN_TRANSIT', 'Vendor');
});

socket.on('DELIVERED', (payload) => {
  sendReceipt(socket, 'DELIVERED', 'Vendor');

  console.log('Thank You!')
});


let count = 0;
let intervalId = setInterval(() => {
  console.log('\n\nSTARTING SHIPPING PROCESS\n');

  const payload = {
    store: 'Julian.com',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  socket.emit('PICK_ME_UP', payload);
  count++;
  if(count >= 3) {
    clearInterval(intervalId);
    process.exit();
  }
}, 10000);

