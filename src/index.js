import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { prisma } from './prisma.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Connexion Socket
io.on('connection', (socket) => {
  console.log('🟢 Connecté:', socket.id);

  socket.on('send_message', async (data) => {
    const message = await prisma.message.create({
      data: {
        content: data.text,
        sender: data.sender,
      },
    });

    io.emit('receive_message', {
      id: message.id,
      text: message.content,
      sender: message.sender,
      time: message.createdAt,
    });
  });
});

// Historique
app.get('/messages', async (req, res) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  });
  res.json(messages);
});

// 🔹 Endpoint pour créer un message test
app.post('/test-message', async (req, res) => {
  const message = await prisma.message.create({
    data: {
      content: 'Ceci est un message de test !',
      sender: 'Bot Test',
    },
  });

  io.emit('receive_message', {
    id: message.id,
    text: message.content,
    sender: message.sender,
    time: message.createdAt,
  });

  res.json({ ok: true, message });
});

server.listen(4000, () => {
  console.log('🚀 Backend prêt sur http://localhost:4000');
});
