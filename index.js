'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');

const chance = new Chance();

const handlePickup = require('./handlers/pickup');
const handleInTransit = require('./handlers/inTransit');
const handleDelivery = require('./handlers/delivered');

eventPool.on('PICK_ME_UP', handlePickup);
eventPool.on('IN_TRANSIT', handleInTransit);
eventPool.on('DELIVERED', handleDelivery);

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
