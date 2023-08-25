const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

const userRooms = new Map();

io.on("connection", (socket) => {
  console.log("Användare ansluten", socket.id);

  const roomId = uuidv4();

  socket.on("enter_room", (room) => {
    socket.join(room);
    userRooms.set(socket.id, room);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("user_connected", (username) => {
    socket.broadcast.emit("user_connected_message", username);
  });

  socket.on("enter_new_room", (newRoom) => {
    socket.join(newRoom);
    console.log("Du är nu i ett nytt rum");

    // socket.emit("custom_room_created", newRoom);
  });

  socket.on("send_to_user", (message) => {
    const room = userRooms.get(socket.id);

    if (room) {
      io.to(socket.id).emit("message", { text: message, sender: socket.id });
    }
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("disconnect", () => {
    const room = userRooms.get(socket.id);
    if (room) {
      socket.leave(room);
      userRooms.delete(socket.id);
    }
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servern lyssnar på port ${PORT}`);
});
