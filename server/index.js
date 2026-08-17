import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { RoomManager } from './game/RoomManager.js';
import { StudioManager } from './game/StudioManager.js';
import { cleanText } from './utils/profanityFilter.js';

const app = express();
app.use(cors());

const server = http.createServer(app);
const roomManager = new RoomManager();
const studioManager = new StudioManager();

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    activeRooms: roomManager.rooms.size,
    activeStudios: studioManager.rooms.size,
  });
});

io.on('connection', (socket) => {
  console.log(`⚡ Player connected: ${socket.id}`);

  // ==========================================
  // GAME ROOM EVENTS
  // ==========================================

  // 1. Create Room
  socket.on('create_room', ({ player, settings }, callback) => {
    try {
      const hostPlayer = { ...player, id: socket.id };
      const room = roomManager.createRoom(hostPlayer, settings);
      socket.join(room.roomId);

      callback({ success: true, room: room.getPublicState() });
      console.log(`📦 Room created: ${room.roomId} by ${player.name} (Filter Disabled: ${room.settings.disableProfanityFilter})`);
    } catch (err) {
      console.error('Error creating room:', err);
      callback({ success: false, error: 'Szerver hiba történt szoba létrehozásakor.' });
    }
  });

  // 2. Join Room
  socket.on('join_room', ({ roomId, player }, callback) => {
    try {
      const room = roomManager.getRoom(roomId);
      if (!room) {
        return callback({ success: false, error: 'Nem található szoba ezzel a kóddal!' });
      }

      if (room.players.length >= room.settings.maxPlayers && !room.players.some(p => p.id === socket.id)) {
        return callback({ success: false, error: 'A szoba megtelt! Max létszám elérve.' });
      }

      const joinedPlayer = room.addPlayer({ ...player, id: socket.id });
      socket.join(room.roomId);

      callback({ success: true, room: room.getPublicState() });

      io.to(room.roomId).emit('game_state_update', room.getPublicState());

      io.to(room.roomId).emit('chat_message', {
        id: Date.now(),
        isSystem: true,
        text: `👋 ${joinedPlayer.name} csatlakozott a szobához!`,
      });

      console.log(`👤 Player ${joinedPlayer.name} joined room ${room.roomId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      callback({ success: false, error: 'Nem sikerült csatlakozni a szobához.' });
    }
  });

  // 3. Update Waiting Room Live Settings (Host only)
  socket.on('update_room_settings', ({ roomId, newSettings }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (player && player.isHost) {
      room.updateSettings(newSettings, io);
      console.log(`⚙️ Room ${roomId} settings updated by host ${player.name}`);
    }
  });

  // 4. Start Game (Host only)
  socket.on('start_game', ({ roomId }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (player && player.isHost) {
      const started = room.startGame(io);
      if (started) {
        console.log(`🚀 Game started in room ${roomId}`);
      }
    }
  });

  // 5. Word Selection
  socket.on('select_word', ({ roomId, word }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      room.selectWord(word, io);
    }
  });

  // 6. Canvas Drawing Broadcast
  socket.on('draw_stroke', ({ roomId, strokeData }) => {
    const room = roomManager.getRoom(roomId);
    if (!room || room.state !== 'DRAWING') return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      room.canvasStrokes.push(strokeData);
      socket.to(roomId).emit('draw_stroke', strokeData);
    }
  });

  socket.on('canvas_fill', ({ roomId, fillData }) => {
    const room = roomManager.getRoom(roomId);
    if (!room || room.state !== 'DRAWING') return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      room.canvasStrokes.push({ type: 'fill', ...fillData });
      socket.to(roomId).emit('canvas_fill', fillData);
    }
  });

  socket.on('canvas_clear', ({ roomId }) => {
    const room = roomManager.getRoom(roomId);
    if (!room || room.state !== 'DRAWING') return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      room.canvasStrokes = [];
      io.to(roomId).emit('canvas_clear');
    }
  });

  socket.on('canvas_undo', ({ roomId }) => {
    const room = roomManager.getRoom(roomId);
    if (!room || room.state !== 'DRAWING') return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      if (room.canvasStrokes.length > 0) {
        room.canvasStrokes.pop();
      }
      io.to(roomId).emit('canvas_restore', room.canvasStrokes);
    }
  });

  // 7. Canvas Theme Change Broadcast
  socket.on('canvas_theme', ({ roomId, theme }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const drawer = room.getCurrentDrawer();
    if (drawer && drawer.id === socket.id) {
      room.setTheme(theme, io);
    }
  });

  // 8. Power-Up Usage
  socket.on('use_powerup', ({ roomId, type }) => {
    const room = roomManager.getRoom(roomId);
    if (room) {
      room.usePowerup(socket.id, type, io);
    }
  });

  // 9. Manual Hint Request
  socket.on('request_hint', ({ roomId }) => {
    const room = roomManager.getRoom(roomId);
    if (room) {
      room.requestManualHint(socket.id, io);
    }
  });

  // 10. Rate Artwork
  socket.on('rate_artwork', ({ roomId, stars }) => {
    const room = roomManager.getRoom(roomId);
    if (room) {
      room.rateArtwork(socket.id, stars, io);
    }
  });

  // 11. Soundboard Audio Meme Broadcast
  socket.on('play_meme_sound', ({ roomId, soundName }) => {
    const room = roomManager.getRoom(roomId);
    if (room) {
      io.to(roomId).emit('play_meme_sound', { soundName, senderId: socket.id });
    }
  });

  // 12. Real-time Chat with Profanity Filter & Guesser Isolation
  socket.on('send_chat', ({ roomId, text }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player || !text || text.trim().length === 0) return;

    // Test guess if game is running and player hasn't guessed yet
    if (room.state === 'DRAWING' && !player.isDrawer && !player.hasGuessed) {
      const isCorrect = room.handleGuess(socket.id, text, io);
      if (isCorrect) return; // Correct guess logic handled by handleGuess
    }

    const disableFilter = room.settings.disableProfanityFilter || false;
    const sanitizedText = disableFilter ? text.trim() : cleanText(text.trim());

    const chatMsg = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      senderId: player.id,
      senderName: player.name,
      text: sanitizedText,
      isDrawer: player.isDrawer,
      hasGuessed: player.hasGuessed,
      timestamp: new Date().toISOString(),
    };

    if (room.state === 'DRAWING' && player.hasGuessed) {
      chatMsg.isGuesserOnly = true;
      room.players.forEach(p => {
        if (p.isDrawer || p.hasGuessed) {
          io.to(p.id).emit('chat_message', chatMsg);
        }
      });
    } else {
      io.to(roomId).emit('chat_message', chatMsg);
    }
  });

  // 13. Live Spectator Emoji Reactions
  socket.on('send_reaction', ({ roomId, emoji }) => {
    const room = roomManager.getRoom(roomId);
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (player) {
      io.to(roomId).emit('live_reaction', {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        emoji,
        senderName: player.name,
        x: Math.floor(Math.random() * 70) + 15,
      });
    }
  });

  // ==========================================
  // CREATOR STUDIO EVENTS (Collaborative Studio)
  // ==========================================

  socket.on('studio_join', ({ roomId, user }, callback) => {
    try {
      const studioRoom = studioManager.createOrJoinStudio(roomId, { ...user, id: socket.id });
      socket.join(`studio_${roomId}`);
      callback({ success: true, studioState: studioManager.getRoomState(roomId) });
      socket.to(`studio_${roomId}`).emit('studio_user_joined', { user: { ...user, id: socket.id } });
      console.log(`🎨 User ${user.name} joined studio room ${roomId}`);
    } catch (err) {
      console.error('Error joining studio room:', err);
      callback({ success: false, error: 'Nem sikerült csatlakozni a stúdióhoz.' });
    }
  });

  socket.on('studio_stroke', ({ roomId, stroke }) => {
    const saved = studioManager.addStroke(roomId, stroke);
    if (saved) {
      socket.to(`studio_${roomId}`).emit('studio_stroke', stroke);
    }
  });

  socket.on('studio_layers_update', ({ roomId, layers }) => {
    studioManager.updateLayers(roomId, layers);
    socket.to(`studio_${roomId}`).emit('studio_layers_update', layers);
  });

  socket.on('studio_cursor_move', ({ roomId, cursor }) => {
    studioManager.updateCursor(roomId, socket.id, cursor);
    socket.to(`studio_${roomId}`).emit('studio_cursor_move', { userId: socket.id, cursor });
  });

  socket.on('studio_clear', ({ roomId }) => {
    studioManager.clearCanvas(roomId);
    io.to(`studio_${roomId}`).emit('studio_clear');
  });

  // ==========================================
  // DISCONNECT HANDLER
  // ==========================================

  socket.on('disconnect', () => {
    console.log(`🔌 Player disconnected: ${socket.id}`);

    // Clean up game rooms
    const leftRooms = roomManager.removePlayerFromAllRooms(socket.id);
    leftRooms.forEach((room) => {
      io.to(room.roomId).emit('game_state_update', room.getPublicState());
      io.to(room.roomId).emit('chat_message', {
        id: Date.now(),
        isSystem: true,
        text: `🔌 Egy játékos lekapcsolódott.`,
      });
    });

    // Clean up studio rooms
    const leftStudios = studioManager.removeUser(socket.id);
    leftStudios.forEach((studioId) => {
      io.to(`studio_${studioId}`).emit('studio_user_left', { userId: socket.id });
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🎨 DrawItOut Socket.io Server running on http://127.0.0.1:${PORT}`);
});
