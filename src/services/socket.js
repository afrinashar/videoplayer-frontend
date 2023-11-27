// socket.js
const socketIO = require('socket.io');

// Initialize a function that takes the HTTP server as an argument
const setupSocket = (httpServer) => {
  const io = socketIO(httpServer);

  // Handle connections when a new client connects
  io.on('connection', (socket) => {
    console.log('User connected');

    // Handle joining a room based on the videoId
    socket.on('join', (videoId) => {
      console.log(`User joined room for video ${videoId}`);
      socket.join(videoId);
    });

    // Handle comments
    socket.on('comment', (comment) => {
      console.log(`New comment in room for video ${comment.videoId}: ${comment.text}`);

      // Broadcast the comment to all clients in the room
      io.to(comment.videoId).emit('comment', { text: comment.text });
    });

    // Handle video synchronization
    socket.on('syncVideo', (data) => {
      console.log(`Sync video for video ${data.videoId}, currentTime: ${data.currentTime}`);

      // Broadcast the synchronized time to all clients in the room
      io.to(data.videoId).emit('syncVideo', data.currentTime);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = { setupSocket };
