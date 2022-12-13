'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');

const chance = new Chance();

const { timeoutHandlePickup, timeoutHandleInTransit, timeoutHandleDelivery } = require('./handlers/');

eventPool.on('PICK_ME_UP', timeoutHandlePickup);
eventPool.on('IN_TRANSIT', timeoutHandleInTransit);
eventPool.on('DELIVERED', timeoutHandleDelivery);

let count = 0;
let intervalId = setInterval(() => {
  console.log('\n\nSTARTING SHIPPING PROCESS\n');

  const payload = {
    store: 'Julian.com',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  eventPool.emit('PICK_ME_UP', payload);
  count++;
  if(count >= 3) {
    clearInterval(intervalId);
  }
}, 10000);
