module.exports = (payload) => {
  console.log(`Receipt confirmed: message from ${payload.sender} at ${payload.time}`);
};