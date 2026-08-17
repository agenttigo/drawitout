export class StudioManager {
  constructor() {
    this.rooms = new Map();
  }

  createOrJoinStudio(roomId, user) {
    let room = this.rooms.get(roomId);
    if (!room) {
      room = {
        roomId,
        createdAt: Date.now(),
        layers: [
          { id: 'layer-bg', name: 'Háttér (Background)', visible: true, opacity: 1, locked: false },
          { id: 'layer-1', name: '1. Réteg (Layer 1)', visible: true, opacity: 1, locked: false },
        ],
        strokes: [],
        users: new Map(),
      };
      this.rooms.set(roomId, room);
    }

    room.users.set(user.id, {
      id: user.id,
      name: user.name || 'Alkotó',
      avatar: user.avatar || {},
      color: user.color || '#386641',
      cursor: { x: -100, y: -100 },
      lastActive: Date.now(),
    });

    return room;
  }

  addStroke(roomId, stroke) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    room.strokes.push(stroke);
    return stroke;
  }

  updateLayers(roomId, layers) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    room.layers = layers;
    return layers;
  }

  updateCursor(roomId, userId, cursor) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const user = room.users.get(userId);
    if (user) {
      user.cursor = cursor;
      user.lastActive = Date.now();
    }
  }

  clearCanvas(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.strokes = [];
  }

  removeUser(socketId) {
    const affectedRooms = [];
    for (const [roomId, room] of this.rooms.entries()) {
      if (room.users.has(socketId)) {
        room.users.delete(socketId);
        affectedRooms.push(roomId);
        if (room.users.size === 0) {
          this.rooms.delete(roomId);
        }
      }
    }
    return affectedRooms;
  }

  getRoomState(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    return {
      roomId: room.roomId,
      layers: room.layers,
      strokes: room.strokes,
      users: Array.from(room.users.values()),
    };
  }
}
