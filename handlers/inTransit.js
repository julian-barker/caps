const eventPool = require('../eventPool');
const eventLogger = require('./eventLog');

module.exports = (payload) => {
  eventLogger('IN_TRANSIT', payload);
  console.log('Vendor: Acknowledged - package in transit');
  setTimeout(() => {
    console.log('Driver: Package delivered');
    eventPool.emit('DELIVERED', payload);
  }, 2000);
};