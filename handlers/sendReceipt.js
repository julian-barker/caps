const dtf = new Intl.DateTimeFormat('en-US', {dateStyle: 'short', timeStyle: 'long'});

module.exports = (socket, payload, sender) => {
  console.log('sending receipt');
  socket.emit('RECEIVED', {
    store: payload.store,
    messageId: payload.messageId,
    sender,
    from: payload.from,
    time: dtf.format(new Date()),
  });
};

