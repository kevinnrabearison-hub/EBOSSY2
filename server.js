import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('🟢 User connecté:', socket.id);

  socket.on('send_message', (message) => {
    // broadcast à tous les clients
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User déconnecté:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('🚀 Server Socket.io sur http://localhost:4000');
});
