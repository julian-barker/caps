const handlePickup = require('./pickup');
const handleInTransit = require('./inTransit');
const handleDelivery = require('./delivered');

const delay = 2000;

const timeoutHandlePickup = (payload) => {
  setTimeout(() => {
    handlePickup(payload);
  }, delay);
};

const timeoutHandleInTransit = (payload) => {
  setTimeout(() => {
    handleInTransit(payload);
  }, delay);
};

const timeoutHandleDelivery = (payload) => {
  setTimeout(() => {
    handleDelivery(payload);
  }, delay);
};

module.exports = { 
  timeoutHandlePickup, 
  timeoutHandleInTransit, 
  timeoutHandleDelivery,
};