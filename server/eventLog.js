module.exports = (event, payload) => {
  const eventObj = {
    event,
    time: new Date(),
    payload,
  };

  console.log('\nEvent: ', eventObj, '\n');
};