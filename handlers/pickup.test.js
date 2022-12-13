const eventPool = require('../eventPool');
const handlePickup = require('./pickup');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Handle Pickup Event', () => {
  test('handles pickup', () => {
    const payload = {data:'data'};
    handlePickup(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: Acknowledged - package ready for pickup');
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });
});