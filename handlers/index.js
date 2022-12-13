const handlePickup = require('./pickup');
const handleInTransit = require('./inTransit');
const handleDelivery = require('./delivered');


const timeoutHandlePickup = (payload) => {
  setTimeout(() => {
    handlePickup(payload);
  }, 1000);
};

const timeoutHandleInTransit = (payload) => {
  setTimeout(() => {
    handleInTransit(payload);
  }, 1000);
};

const timeoutHandleDelivery = (payload) => {
  setTimeout(() => {
    handleDelivery(payload);
  }, 1000);
};

module.exports = { 
  timeoutHandlePickup, 
  timeoutHandleInTransit, 
  timeoutHandleDelivery,
};