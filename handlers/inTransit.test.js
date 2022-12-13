const eventPool = require('../eventPool');
const handleInTransit = require('./inTransit');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Handle In Transit Event', () => {
  test('handles In Transit', () => {
    const payload = {data:'data'};
    handleInTransit(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: Package picked up and in transit');
    expect(console.log).toHaveBeenCalledWith('Vendor: Acknowledged - package in transit');
    expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});