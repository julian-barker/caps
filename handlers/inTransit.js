const eventPool = require('../eventPool');
const eventLogger = require('./eventLog');

module.exports = (payload) => {
  eventLogger('IN_TRANSIT', payload);
  console.log('Driver: Package picked up and in transit');
  console.log('Vendor: Acknowledged - package in transit');

  eventPool.emit('DELIVERED', payload);
};