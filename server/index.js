const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("Användare ansluten", socket.id);

  socket.on("enter_room", (room) => {
    socket.join(room);
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

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servern lyssnar på port ${PORT}`);
});
