import { Server as SocketServer } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface Room {
  id: string;
  name: string;
}

let activeRooms: Room[] = [];

let userRooms = new Map();

export function setupSocket(server: any) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const roomId = uuidv4();
    console.log(`Användare: ${socket.id} är ansluten till rum: ${roomId}`);
    console.log(io.sockets.adapter.rooms);

    socket.on("enter_room", (room) => {
      socket.join(room);
      userRooms.set(socket.id, room);
    });

    socket.on("user_connected", (username) => {
      // socket.broadcast.emit("user_connected_message", username);
      socket.to(roomId).emit("user_connected_message", username);
    });

    socket.on("enter_new_room", (newRoom) => {
      socket.join(newRoom);
      console.log("Du är nu i ett nytt rum");

      // socket.emit("custom_room_created", newRoom);
    });

    socket.on("send_to_user", (message) => {
      const room = userRooms.get(socket.id);

      if (room) {
        message.sender = socket.id;
        io.to(socket.id).emit("message", { text: message, sender: socket.id });
        // io.to(room).emit("message", message);
      }
    });

    socket.on("join_room", (data) => {
      const { username, room } = data;

      createRoom(io, room, username);
      joinRoom(socket, username, room);
      socket.to(room).emit("user_connected_message", username, room); //La till detta nu
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

    socket.on("send_message", async (data) => {
      const { room } = data;
      io.to(room).emit("receive_message", data); // Use 'to' instead of 'in' to send to a specific room
    });

    socket.on("get_active_rooms", () => {
      socket.emit("active_rooms", activeRooms);
    });

    socket.on("user_typing", ({ username, room, isTyping }) => {
      socket.to(room).emit("typing_indicator", { username, isTyping });
    });
  });

  function joinRoom(socket: any, username: string, room: string) {
    // Add the user to the room
    socket.join(room);
  }
  function createRoom(io: any, roomName: string, username: string) {
    const roomId = uuidv4();
    const newRoom = { id: roomId, name: roomName, username: username };
    console.log(`Rum "${roomName}" (ID: ${roomId}) `);
  }
}
