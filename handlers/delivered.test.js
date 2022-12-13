// const eventPool = require('../eventPool');
const handleDelivery = require('./delivered');

describe('Handle Delivery Event', () => {
  console.log = jest.fn();
  test('function handles delivery', () => {
    const payload = {data:'data'};
    handleDelivery(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: Package delivered');
    expect(console.log).toHaveBeenCalledWith('Vendor: Acknowledged - package delivered');
  });
});