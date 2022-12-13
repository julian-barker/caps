const eventLogger = require('./eventLog');


console.log = jest.fn();

describe('Handle Event Log', () => {
  test('function logs events with name, time, and payload', () => {
    const payload = {data:'data'};
    const event = 'IN_TRANSIT';
    eventLogger(event, payload);
    expect(console.log).toHaveBeenCalled();
  });
});