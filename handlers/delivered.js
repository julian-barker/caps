const eventPool = require('../eventPool');
const eventLogger = require('./eventLog');

module.exports = (payload) => {
  eventLogger('DELIVERED', payload);
  console.log('Vendor: Acknowledged - package delivered');
  // setTimeout(() => {
  //   console.log('Driver -> Vendor: Package delivered');
  //   eventPool.emit('DELIVERED', payload);
  // }, 2000);
};