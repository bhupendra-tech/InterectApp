const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5000"],
  },
});
io.on("connection", (socket) => {
  console.log("Connected to client ");
  console.log(socket.rooms);
  socket.on("room-id", (roomId, roomName) => {
    socket.join(roomId);
    socket.to(roomId).emit("room-joined", roomName);
  });
  socket.on("message-sent", (roomId, senderName, message) => {
    socket.to(roomId).emit("message-received", senderName, message);
  });
  socket.on("play", (roomId) => {
    socket.to(roomId).emit("play");
  });
  socket.on("pause", (roomId, roomName) => {
    socket.to(roomId).emit("pause", roomName);
  });
  socket.on("leave-room", (roomId, roomName) => {
    socket.to(roomId).emit("leave-room", roomName);
  });
});
