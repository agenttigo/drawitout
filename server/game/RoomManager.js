import { GameState } from './GameState.js';

export class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomId -> GameState
  }

  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  createRoom(hostPlayer, settings = {}) {
    let roomId = this.generateRoomCode();
    while (this.rooms.has(roomId)) {
      roomId = this.generateRoomCode();
    }

    const room = new GameState(roomId, hostPlayer, settings);
    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId) {
    if (!roomId) return null;
    return this.rooms.get(roomId.toUpperCase()) || null;
  }

  joinRoom(roomId, player) {
    const room = this.getRoom(roomId);
    if (!room) {
      return { success: false, error: 'A megadott szobakód nem létezik!' };
    }

    if (room.state !== 'LOBBY' && !room.players.some(p => p.id === player.id)) {
      return { success: false, error: 'A játék már folyamatban van ebben a szobában!' };
    }

    const addedPlayer = room.addPlayer(player);
    return { success: true, room, player: addedPlayer };
  }

  removePlayerFromAllRooms(socketId) {
    const affectedRooms = [];
    this.rooms.forEach((room, roomId) => {
      const removed = room.removePlayer(socketId);
      if (removed) {
        affectedRooms.push(room);
        if (room.players.length === 0) {
          room.clearTimer();
          this.rooms.delete(roomId);
        }
      }
    });
    return affectedRooms;
  }
}
