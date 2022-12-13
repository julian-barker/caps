const eventPool = require('../eventPool');
const eventLogger = require('./eventLog');

module.exports = (payload) => {
  eventLogger('PICK_ME_UP', payload);
  console.log('Driver: Acknowledged - package ready for pickup');
  setTimeout(() => {
    console.log('Driver: Package picked up and in transit');
    eventPool.emit('IN_TRANSIT', payload);
  }, 2000);
};