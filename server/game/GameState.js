import { hungarianWords, hungarianWordCategories } from '../words/hu.js';
import { englishWords, englishWordCategories } from '../words/en.js';
import { germanWords, germanWordCategories } from '../words/de.js';
import { filterCustomWords, cleanText } from '../utils/profanityFilter.js';

function getLevenshteinDistance(a, b) {
  if (!a || !b) return 99;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export class GameState {
  constructor(roomId, hostPlayer, settings = {}) {
    this.roomId = roomId;

    const formattedHost = {
      id: hostPlayer.id,
      name: hostPlayer.name,
      avatar: hostPlayer.avatar || {},
      score: 0,
      roundScore: 0,
      isDrawer: false,
      hasGuessed: false,
      isHost: true, // EXPLICITLY SET ROOM CREATOR AS HOST
      connected: true,
    };

    this.players = [formattedHost];

    const disableFilter = settings.disableProfanityFilter || false;

    let validCustomWords = settings.customWords || [];
    if (!disableFilter) {
      const filtered = filterCustomWords(settings.customWords || []);
      validCustomWords = filtered.validWords;
    }

    this.settings = {
      rounds: settings.rounds || 4,
      drawTime: settings.gameMode === 'BLITZ' ? 20 : (settings.drawTime || 60),
      maxPlayers: settings.maxPlayers || 8,
      wordChoicesCount: settings.wordChoicesCount || 3,
      hintsCount: settings.hintsCount !== undefined ? settings.hintsCount : 2,
      language: settings.language || 'hu',
      gameMode: settings.gameMode || 'STANDARD',
      category: settings.category || 'all',
      customWords: validCustomWords,
      disableProfanityFilter: disableFilter,
      ...settings,
    };

    this.state = 'LOBBY';
    this.currentRound = 1;
    this.drawerIndex = 0;
    this.currentWord = '';
    this.wordChoices = [];
    this.maskedWord = '';
    this.hintsRevealed = [];
    this.timeLeft = 0;
    this.timerInterval = null;
    this.canvasStrokes = [];
    this.canvasTheme = 'white';
    this.galleryArtworks = [];
    this.artworkRatings = [];
  }

  updateSettings(newSettings, io) {
    if (this.state !== 'LOBBY') return;

    if (newSettings.disableProfanityFilter !== undefined) {
      this.settings.disableProfanityFilter = newSettings.disableProfanityFilter;
    }
    if (newSettings.rounds !== undefined) this.settings.rounds = Number(newSettings.rounds);
    if (newSettings.drawTime !== undefined) this.settings.drawTime = Number(newSettings.drawTime);
    if (newSettings.maxPlayers !== undefined) this.settings.maxPlayers = Number(newSettings.maxPlayers);
    if (newSettings.wordChoicesCount !== undefined) this.settings.wordChoicesCount = Number(newSettings.wordChoicesCount);
    if (newSettings.hintsCount !== undefined) this.settings.hintsCount = Number(newSettings.hintsCount);
    if (newSettings.gameMode !== undefined) this.settings.gameMode = newSettings.gameMode;
    if (newSettings.category !== undefined) this.settings.category = newSettings.category;
    if (newSettings.language !== undefined) this.settings.language = newSettings.language;

    if (newSettings.customWords !== undefined) {
      if (!this.settings.disableProfanityFilter) {
        const filtered = filterCustomWords(newSettings.customWords || []);
        this.settings.customWords = filtered.validWords;
      } else {
        this.settings.customWords = newSettings.customWords;
      }
    }

    if (io) {
      io.to(this.roomId).emit('game_state_update', this.getPublicState());
    }
  }

  addPlayer(player) {
    if (this.players.length >= this.settings.maxPlayers) {
      return null; // Room full
    }

    const existing = this.players.find(p => p.id === player.id);
    const cleanName = this.settings.disableProfanityFilter ? player.name : cleanText(player.name);

    if (existing) {
      existing.connected = true;
      existing.name = cleanName;
      existing.avatar = player.avatar;
      return existing;
    }

    const isHost = this.players.length === 0;
    const newPlayer = {
      id: player.id,
      name: cleanName || `Player-${this.players.length + 1}`,
      avatar: player.avatar || {},
      score: 0,
      roundScore: 0,
      isDrawer: false,
      hasGuessed: false,
      isHost: isHost,
      connected: true,
    };

    this.players.push(newPlayer);
    return newPlayer;
  }

  removePlayer(socketId) {
    const index = this.players.findIndex(p => p.id === socketId);
    if (index === -1) return null;

    const removedPlayer = this.players[index];
    this.players.splice(index, 1);

    if (removedPlayer.isHost && this.players.length > 0) {
      this.players[0].isHost = true;
    }

    if (removedPlayer.isDrawer && (this.state === 'DRAWING' || this.state === 'WORD_SELECTION')) {
      this.endTurnEarly('Drawer disconnected');
    }

    if (this.players.length < 2 && this.state !== 'LOBBY' && this.state !== 'GAME_OVER') {
      this.resetToLobby();
    }

    return removedPlayer;
  }

  resetToLobby() {
    this.clearTimer();
    this.state = 'LOBBY';
    this.currentRound = 1;
    this.drawerIndex = 0;
    this.currentWord = '';
    this.canvasStrokes = [];
    this.canvasTheme = 'white';
    this.galleryArtworks = [];
    this.players.forEach(p => {
      p.score = 0;
      p.roundScore = 0;
      p.isDrawer = false;
      p.hasGuessed = false;
    });
  }

  getWordPool() {
    const lang = this.settings.language || 'hu';
    let catMap = hungarianWordCategories;
    let fallbackWords = hungarianWords;

    if (lang === 'en') {
      catMap = englishWordCategories;
      fallbackWords = englishWords;
    } else if (lang === 'de') {
      catMap = germanWordCategories;
      fallbackWords = germanWords;
    }
    
    let pool = [];
    if (this.settings.category && catMap[this.settings.category]) {
      pool = [...catMap[this.settings.category]];
    } else {
      pool = [...fallbackWords];
    }

    if (Array.isArray(this.settings.customWords) && this.settings.customWords.length > 0) {
      pool = [...pool, ...this.settings.customWords];
    }
    return pool;
  }

  getRandomWords(count = 3) {
    const pool = this.getWordPool();
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  startGame(io) {
    if (this.players.length < 2) return false;
    this.currentRound = 1;
    this.drawerIndex = 0;
    this.galleryArtworks = [];
    this.players.forEach(p => {
      p.score = 0;
      p.roundScore = 0;
    });
    this.startWordSelection(io);
    return true;
  }

  startWordSelection(io) {
    this.clearTimer();
    this.state = 'WORD_SELECTION';
    this.canvasStrokes = [];
    this.canvasTheme = 'white';
    this.artworkRatings = [];
    
    this.players.forEach(p => {
      p.isDrawer = false;
      p.hasGuessed = false;
      p.roundScore = 0;
    });

    if (this.drawerIndex >= this.players.length) {
      this.drawerIndex = 0;
      this.currentRound++;
    }

    if (this.currentRound > this.settings.rounds) {
      this.endGame(io);
      return;
    }

    const currentDrawer = this.players[this.drawerIndex];
    if (!currentDrawer || !currentDrawer.connected) {
      this.drawerIndex++;
      this.startWordSelection(io);
      return;
    }

    currentDrawer.isDrawer = true;
    const choiceCount = this.settings.wordChoicesCount || 3;
    this.wordChoices = this.getRandomWords(choiceCount);
    this.timeLeft = 15;

    io.to(this.roomId).emit('game_state_update', this.getPublicState());
    io.to(currentDrawer.id).emit('word_choices', this.wordChoices);

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      io.to(this.roomId).emit('timer_tick', { timeLeft: this.timeLeft });

      if (this.timeLeft <= 0) {
        const autoWord = this.wordChoices[0] || 'apple';
        this.selectWord(autoWord, io);
      }
    }, 1000);
  }

  selectWord(word, io) {
    if (this.state !== 'WORD_SELECTION') return;
    this.clearTimer();

    this.currentWord = word.trim();
    this.hintsRevealed = [];
    this.generateMaskedWord();
    this.state = 'DRAWING';
    this.timeLeft = this.settings.gameMode === 'BLITZ' ? 20 : (parseInt(this.settings.drawTime, 10) || 60);

    io.to(this.roomId).emit('turn_started', {
      drawer: this.getCurrentDrawer(),
      maskedWord: this.maskedWord,
      drawTime: this.timeLeft,
      currentRound: this.currentRound,
      maxRounds: this.settings.rounds,
      gameMode: this.settings.gameMode,
    });

    io.to(this.roomId).emit('game_state_update', this.getPublicState());

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      io.to(this.roomId).emit('timer_tick', { timeLeft: this.timeLeft });

      const totalTime = this.settings.gameMode === 'BLITZ' ? 20 : (this.settings.drawTime || 60);
      const hintsLimit = this.settings.hintsCount !== undefined ? this.settings.hintsCount : 2;

      if (hintsLimit > 0 && this.hintsRevealed.length < hintsLimit) {
        const stepInterval = totalTime / (hintsLimit + 1);
        const nextHintThreshold = totalTime - stepInterval * (this.hintsRevealed.length + 1);

        if (this.timeLeft <= nextHintThreshold) {
          this.revealHint(io);
        }
      }

      if (this.timeLeft <= 0) {
        this.endTurn(io, 'Time expired');
      }
    }, 1000);
  }

  generateMaskedWord() {
    this.maskedWord = this.currentWord
      .split('')
      .map((char, idx) => {
        if (char === ' ' || char === '-') return char;
        if (this.hintsRevealed.includes(idx)) return char;
        return '_';
      })
      .join(' ');
  }

  revealHint(io) {
    const unrevealedIndices = [];
    this.currentWord.split('').forEach((char, idx) => {
      if (char !== ' ' && char !== '-' && !this.hintsRevealed.includes(idx)) {
        unrevealedIndices.push(idx);
      }
    });

    if (unrevealedIndices.length > 1) {
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      this.hintsRevealed.push(randomIndex);
      this.generateMaskedWord();
      io.to(this.roomId).emit('hint_revealed', { maskedWord: this.maskedWord });
    }
  }

  usePowerup(socketId, type, io) {
    const player = this.players.find(p => p.id === socketId);
    if (!player || this.state !== 'DRAWING') return;

    if (type === 'extra_time') {
      this.timeLeft += 10;
      io.to(this.roomId).emit('timer_tick', { timeLeft: this.timeLeft });
      io.to(this.roomId).emit('chat_message', {
        id: Date.now(),
        isSystem: true,
        text: `⏳ ${player.name} használt egy +10mp Idő Bővítést!`,
      });
    } else if (type === 'super_hint') {
      this.revealHint(io);
      io.to(this.roomId).emit('chat_message', {
        id: Date.now(),
        isSystem: true,
        text: `💡 Szuper-Tipp Betű aktiválva!`,
      });
    }
  }

  requestManualHint(socketId, io) {
    const drawer = this.getCurrentDrawer();
    if (drawer && drawer.id === socketId && this.state === 'DRAWING') {
      this.revealHint(io);
    }
  }

  setTheme(theme, io) {
    this.canvasTheme = theme;
    io.to(this.roomId).emit('canvas_theme_change', { theme });
    io.to(this.roomId).emit('game_state_update', this.getPublicState());
  }

  rateArtwork(socketId, stars, io) {
    if (!this.artworkRatings.some(r => r.socketId === socketId)) {
      this.artworkRatings.push({ socketId, stars });
      const drawer = this.getCurrentDrawer();
      if (drawer) {
        const bonus = stars * 20;
        drawer.score += bonus;
        drawer.roundScore = (drawer.roundScore || 0) + bonus;
        io.to(this.roomId).emit('game_state_update', this.getPublicState());
      }
    }
  }

  handleGuess(socketId, text, io) {
    if (this.state !== 'DRAWING') return false;

    const player = this.players.find(p => p.id === socketId);
    if (!player || player.isDrawer || player.hasGuessed) return false;

    const normalizedGuess = text.trim().toLowerCase();
    const normalizedTarget = this.currentWord.trim().toLowerCase();
    const stripAccents = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const gClean = stripAccents(normalizedGuess);
    const tClean = stripAccents(normalizedTarget);

    if (gClean === tClean) {
      player.hasGuessed = true;
      const totalTime = this.settings.gameMode === 'BLITZ' ? 20 : (this.settings.drawTime || 60);
      const timeRatio = Math.max(0.1, this.timeLeft / totalTime);
      const points = Math.round(150 + timeRatio * 350);
      player.roundScore = points;
      player.score += points;

      const drawer = this.getCurrentDrawer();
      if (drawer) {
        const drawerBonus = Math.round(50 + timeRatio * 100);
        drawer.roundScore = (drawer.roundScore || 0) + drawerBonus;
        drawer.score += drawerBonus;
      }

      io.to(player.id).emit('correct_guess', { secretWord: this.currentWord, points });

      io.to(this.roomId).emit('player_guessed', {
        player: { id: player.id, name: player.name, score: player.score },
        message: `🎉 ${player.name} kitalálta a szót! (+${points} pont)`,
      });

      io.to(this.roomId).emit('game_state_update', this.getPublicState());

      const nonDrawers = this.players.filter(p => !p.isDrawer && p.connected);
      const allGuessed = nonDrawers.every(p => p.hasGuessed);

      if (allGuessed) {
        this.endTurn(io, 'All players guessed!');
      }

      return true;
    } else {
      const dist = getLevenshteinDistance(gClean, tClean);
      if (dist <= 2 && gClean.length > 3) {
        io.to(player.id).emit('close_guess', { message: '🔥 Közel jársz a megoldáshoz!' });
      }
    }

    return false;
  }

  endTurnEarly(reason) {
    this.clearTimer();
    this.state = 'ROUND_SUMMARY';
  }

  endTurn(io, reason) {
    this.clearTimer();
    this.state = 'ROUND_SUMMARY';

    const drawer = this.getCurrentDrawer();
    if (drawer) {
      this.galleryArtworks.push({
        id: Date.now(),
        round: this.currentRound,
        drawerName: drawer.name,
        word: this.currentWord,
        strokes: [...this.canvasStrokes],
        theme: this.canvasTheme,
      });
    }

    io.to(this.roomId).emit('turn_ended', {
      reason,
      secretWord: this.currentWord,
      players: this.players,
      gallery: this.galleryArtworks,
    });

    io.to(this.roomId).emit('game_state_update', this.getPublicState());

    setTimeout(() => {
      this.drawerIndex++;
      this.startWordSelection(io);
    }, 6000);
  }

  endGame(io) {
    this.clearTimer();
    this.state = 'GAME_OVER';

    const rankedPlayers = [...this.players].sort((a, b) => b.score - a.score);
    io.to(this.roomId).emit('game_over', {
      leaderboard: rankedPlayers,
      gallery: this.galleryArtworks,
    });

    io.to(this.roomId).emit('game_state_update', this.getPublicState());
  }

  getCurrentDrawer() {
    return this.players.find(p => p.isDrawer) || this.players[this.drawerIndex] || null;
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getPublicState() {
    return {
      roomId: this.roomId,
      state: this.state,
      currentRound: this.currentRound,
      maxRounds: this.settings.rounds,
      drawTime: this.settings.drawTime,
      maxPlayers: this.settings.maxPlayers,
      wordChoicesCount: this.settings.wordChoicesCount,
      hintsCount: this.settings.hintsCount,
      language: this.settings.language,
      gameMode: this.settings.gameMode,
      category: this.settings.category,
      disableProfanityFilter: this.settings.disableProfanityFilter,
      customWords: this.settings.customWords,
      timeLeft: this.timeLeft,
      maskedWord: this.maskedWord,
      canvasTheme: this.canvasTheme,
      drawer: this.getCurrentDrawer(),
      gallery: this.galleryArtworks,
      players: this.players.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        score: p.score,
        roundScore: p.roundScore,
        isDrawer: p.isDrawer,
        hasGuessed: p.hasGuessed,
        isHost: p.isHost,
        connected: p.connected,
      })),
    };
  }
}
