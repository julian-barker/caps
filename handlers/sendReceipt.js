const dtf = new Intl.DateTimeFormat('en-US', {dateStyle: 'short', timeStyle: 'long'});

module.exports = (socket, event, src) => {
  socket.emit('RECEIVED', {
    event,
    sender: src,
    time: dtf.format(new Date()),
  });
};

