const io = require('socket.io')(3000);

let users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    if (!name || name === '') {
      socket.disconnect();
    } else {
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name + ' Joined');
    }
  })

  socket.on('sent-message', message => {
    socket.broadcast.emit('chat-message', {
      name: users[socket.id],
      message: message
    });
  })

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      socket.broadcast.emit('disconnection', users[socket.id])
    }
    delete users[socket.id]
  })
})