const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Användare ansluten', socket.id);

    
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
