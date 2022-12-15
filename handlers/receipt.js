module.exports = (payload) => {
  console.log(`\nReceipt confirmed: message from ${payload.sender} at ${payload.time}`);
};