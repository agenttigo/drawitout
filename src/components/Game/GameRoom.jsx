import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from './Header';
import { PlayerList } from './PlayerList';
import { DrawingCanvas } from './DrawingCanvas';
import { ChatBox } from './ChatBox';
import { WordPickerModal } from './WordPickerModal';
import { RoundSummaryModal } from './RoundSummaryModal';
import { PodiumModal } from './PodiumModal';
import { ReactionOverlay } from './ReactionOverlay';
import { ProfanityDisclaimerModal } from '../Lobby/ProfanityDisclaimerModal';
import { Footer } from '../Common/Footer';
import { soundEngine } from '../../utils/soundEngine';
import { unlockBadge } from '../../utils/achievementSystem';
import { Settings, Copy, Check, Play, Users, Clock, Lightbulb, Sparkles, ShieldCheck, ShieldAlert, Zap, EyeOff, Paintbrush, HelpCircle } from 'lucide-react';

export function GameRoom({ initialRoomState, onLeaveRoom }) {
  const { socket } = useSocket();
  const { t } = useLanguage();

  const [gameState, setGameState] = useState(initialRoomState);
  const [messages, setMessages] = useState([]);
  const [wordChoices, setWordChoices] = useState([]);
  const [secretWord, setSecretWord] = useState('');
  const [roundSummaryData, setRoundSummaryData] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [closeGuessAlert, setCloseGuessAlert] = useState('');

  const [copiedInvite, setCopiedInvite] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [customWordsText, setCustomWordsText] = useState(() => (initialRoomState?.customWords || []).join(', '));

  useEffect(() => {
    if (!socket) return;

    const handleStateUpdate = (newState) => {
      setGameState(newState);
      if (newState?.customWords) {
        setCustomWordsText(newState.customWords.join(', '));
      }
    };

    const handleTimerTick = ({ timeLeft }) => {
      setGameState((prev) => prev ? { ...prev, timeLeft } : prev);
      if (timeLeft <= 5 && timeLeft > 0) {
        soundEngine.playTick();
      }
    };

    const handleWordChoices = (choices) => {
      setWordChoices(choices);
    };

    const handleTurnStarted = ({ drawer, maskedWord, drawTime, currentRound, gameMode }) => {
      setWordChoices([]);
      setRoundSummaryData(null);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          isSystem: true,
          text: `🎨 Sorkövetkező: ${drawer.name} rajzol! ${gameMode === 'BLIND' ? '(Vak Rajzolás 🙈)' : ''}`,
        },
      ]);
    };

    const handleTurnEnded = ({ secretWord, players, reason, gallery }) => {
      setRoundSummaryData({ secretWord, players, gallery });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          isSystem: true,
          text: `⏱️ A forduló véget ért! A szó ez volt: "${secretWord}"`,
        },
      ]);
    };

    const handlePlayerGuessed = ({ player, message }) => {
      soundEngine.playCorrect();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          isSystem: true,
          text: message,
        },
      ]);
    };

    const handleCorrectGuess = ({ secretWord, points }) => {
      soundEngine.playCorrect();
      if (gameState?.timeLeft && (gameState.drawTime - gameState.timeLeft) <= 10) {
        unlockBadge('speedy');
      }
    };

    const handleCloseGuess = ({ message }) => {
      soundEngine.playPop();
      setCloseGuessAlert(message);
      setTimeout(() => setCloseGuessAlert(''), 3000);
    };

    const handleHintRevealed = ({ maskedWord }) => {
      setGameState((prev) => prev ? { ...prev, maskedWord } : prev);
    };

    const handleChatMessage = (msg) => {
      soundEngine.playPop();
      setMessages((prev) => [...prev, msg]);
    };

    const handleLiveReaction = (reaction) => {
      setReactions((prev) => [...prev, reaction]);
      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== reaction.id));
      }, 2000);
    };

    const handlePlayMemeSound = ({ soundName }) => {
      soundEngine.playMeme(soundName);
    };

    const handleGameOver = ({ leaderboard, gallery }) => {
      setLeaderboard(leaderboard);
      setGameState((prev) => prev ? { ...prev, gallery } : prev);

      const myScore = leaderboard.find(p => p.id === socket.id)?.score || 0;
      if (myScore >= 1000) {
        unlockBadge('genius');
      }
    };

    socket.on('game_state_update', handleStateUpdate);
    socket.on('timer_tick', handleTimerTick);
    socket.on('word_choices', handleWordChoices);
    socket.on('turn_started', handleTurnStarted);
    socket.on('turn_ended', handleTurnEnded);
    socket.on('player_guessed', handlePlayerGuessed);
    socket.on('correct_guess', handleCorrectGuess);
    socket.on('close_guess', handleCloseGuess);
    socket.on('hint_revealed', handleHintRevealed);
    socket.on('chat_message', handleChatMessage);
    socket.on('live_reaction', handleLiveReaction);
    socket.on('play_meme_sound', handlePlayMemeSound);
    socket.on('game_over', handleGameOver);

    return () => {
      socket.off('game_state_update', handleStateUpdate);
      socket.off('timer_tick', handleTimerTick);
      socket.off('word_choices', handleWordChoices);
      socket.off('turn_started', handleTurnStarted);
      socket.off('turn_ended', handleTurnEnded);
      socket.off('player_guessed', handlePlayerGuessed);
      socket.off('correct_guess', handleCorrectGuess);
      socket.off('close_guess', handleCloseGuess);
      socket.off('hint_revealed', handleHintRevealed);
      socket.off('chat_message', handleChatMessage);
      socket.off('live_reaction', handleLiveReaction);
      socket.off('play_meme_sound', handlePlayMemeSound);
      socket.off('game_over', handleGameOver);
    };
  }, [socket, gameState?.drawTime, gameState?.timeLeft]);

  const currentSocketId = socket?.id;
  const isDrawer = gameState.drawer?.id === currentSocketId;
  const me = gameState.players.find((p) => p.id === currentSocketId);
  const isHost = me?.isHost || false;

  const handleCopyInvite = () => {
    soundEngine.playClick();
    const inviteUrl = `${window.location.origin}/?room=${gameState.roomId}`;
    navigator.clipboard.writeText(`🎮 Csatlakozz a DrawItOut szobámhoz!\nKód: ${gameState.roomId}\nLink: ${inviteUrl}`);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 3000);
  };

  const handleUpdateSetting = (field, value) => {
    if (!isHost || !socket) return;
    socket.emit('update_room_settings', {
      roomId: gameState.roomId,
      newSettings: { [field]: value },
    });
  };

  const handleToggleProfanityFilter = () => {
    if (!isHost) return;
    soundEngine.playClick();
    if (!gameState.disableProfanityFilter) {
      setShowDisclaimerModal(true);
    } else {
      handleUpdateSetting('disableProfanityFilter', false);
    }
  };

  const handleAcceptDisclaimer = () => {
    handleUpdateSetting('disableProfanityFilter', true);
    setShowDisclaimerModal(false);
  };

  const handleCustomWordsBlur = () => {
    if (!isHost) return;
    const rawWords = customWordsText
      .split(',')
      .map(w => w.trim())
      .filter(w => w.length > 0);
    handleUpdateSetting('customWords', rawWords);
  };

  const handleStartGame = () => {
    if (socket) {
      socket.emit('start_game', { roomId: gameState.roomId });
    }
  };

  const handleSelectWord = (word) => {
    setSecretWord(word);
    setWordChoices([]);
    if (socket) {
      socket.emit('select_word', { roomId: gameState.roomId, word });
    }
  };

  const handleSendChat = (text) => {
    if (socket) {
      socket.emit('send_chat', { roomId: gameState.roomId, text });
    }
  };

  const handleSendReaction = (emoji) => {
    if (socket) {
      socket.emit('send_reaction', { roomId: gameState.roomId, emoji });
    }
  };

  const handlePlayMemeSound = (soundName) => {
    if (socket) {
      socket.emit('play_meme_sound', { roomId: gameState.roomId, soundName });
    }
  };

  const handleRateArtwork = (stars) => {
    if (socket) {
      if (stars === 5) {
        unlockBadge('picasso');
      }
      socket.emit('rate_artwork', { roomId: gameState.roomId, stars });
    }
  };

  const handleUsePowerup = (type) => {
    if (socket) {
      socket.emit('use_powerup', { roomId: gameState.roomId, type });
    }
  };

  return (
    <div className="min-h-screen w-full p-3 md:p-6 bg-[#f7f5f0] text-[#1e242b] flex flex-col space-y-4 relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-[#e5e0d5]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto flex flex-col space-y-4 flex-1">
        {/* Header Bar */}
        <Header
          roomCode={gameState.roomId}
          currentRound={gameState.currentRound}
          maxRounds={gameState.maxRounds}
          maskedWord={gameState.maskedWord}
          timeLeft={gameState.timeLeft}
          drawTime={gameState.drawTime}
          isDrawer={isDrawer}
          secretWord={secretWord}
          onLeaveRoom={onLeaveRoom}
        />

        {/* In-Room Pre-Game Waiting Lobby (Előszoba) */}
        {gameState.state === 'LOBBY' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
            {/* Left/Middle Column: Waiting Room Live Settings Panel */}
            <div className="lg:col-span-8 glass-panel rounded-3xl p-6 md:p-8 space-y-6 shadow-sm bg-white border border-[#e5e0d5]">
              {/* Title & Invite Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1e242b] flex items-center space-x-2">
                    <Settings className="w-6 h-6 text-[#386641] animate-spin-slow" />
                    <span>{t('waiting_room_title')}</span>
                  </h2>
                  <p className="text-xs md:text-sm text-stone-500 font-semibold mt-1">
                    {t('waiting_room_subtitle')}
                  </p>
                </div>

                <button
                  onClick={handleCopyInvite}
                  className="py-3 px-5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs md:text-sm shadow-md transition flex items-center justify-center space-x-2"
                >
                  {copiedInvite ? <Check className="w-4 h-4 text-[#eaf2eb]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedInvite ? t('invite_copied_toast') : t('invite_btn')}</span>
                </button>
              </div>

              {/* Host Settings Controls */}
              <div className="space-y-5">
                {!isHost && (
                  <div className="p-3 bg-[#faf8f3] border border-[#e5e0d5] rounded-xl text-xs font-bold text-stone-700 flex items-center space-x-2">
                    <span>{t('host_settings_only')}</span>
                  </div>
                )}

                {/* Game Mode Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#1e242b] mb-1.5">
                    {t('game_mode_label')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('gameMode', 'STANDARD')}
                      className={`py-2.5 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        (gameState.gameMode || 'STANDARD') === 'STANDARD' ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234]' : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#386641]" />
                      <span>{t('mode_standard')}</span>
                    </button>

                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('gameMode', 'BLIND')}
                      className={`py-2.5 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        gameState.gameMode === 'BLIND' ? 'bg-[#fff8eb] border-[#f5e3bc] text-[#9c6615]' : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <EyeOff className="w-4 h-4 text-[#c86d3b]" />
                      <span>{t('mode_blind')}</span>
                    </button>

                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('gameMode', 'BLITZ')}
                      className={`py-2.5 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        gameState.gameMode === 'BLITZ' ? 'bg-[#fff9eb] border-[#f3e3b3] text-[#8a6d1b]' : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-[#e9c46a]" />
                      <span>{t('mode_blitz')}</span>
                    </button>

                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('gameMode', 'ONE_STROKE')}
                      className={`py-2.5 px-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        gameState.gameMode === 'ONE_STROKE' ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234]' : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <Paintbrush className="w-4 h-4 text-[#386641]" />
                      <span>{t('mode_one_stroke')}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Draw Time per Turn */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('draw_time_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.drawTime || 60}
                      onChange={(e) => handleUpdateSetting('drawTime', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value={30}>{t('draw_time_fmt', { count: 30 })}</option>
                      <option value={45}>{t('draw_time_fmt', { count: 45 })}</option>
                      <option value={60}>{t('draw_time_fmt', { count: 60 })}</option>
                      <option value={80}>{t('draw_time_fmt', { count: 80 })}</option>
                      <option value={120}>{t('draw_time_fmt', { count: 120 })}</option>
                    </select>
                  </div>

                  {/* Max Players */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('max_players_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.maxPlayers || 8}
                      onChange={(e) => handleUpdateSetting('maxPlayers', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value={2}>👥 2 {t('players_count', { count: '' })}</option>
                      <option value={4}>👥 4 {t('players_count', { count: '' })}</option>
                      <option value={6}>👥 6 {t('players_count', { count: '' })}</option>
                      <option value={8}>👥 8 {t('players_count', { count: '' })}</option>
                      <option value={12}>👥 12 {t('players_count', { count: '' })}</option>
                      <option value={16}>👥 16 {t('players_count', { count: '' })}</option>
                    </select>
                  </div>

                  {/* Number of Rounds */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('rounds_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.maxRounds || 4}
                      onChange={(e) => handleUpdateSetting('rounds', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value={2}>{t('rounds_count', { count: 2 })}</option>
                      <option value={3}>{t('rounds_count', { count: 3 })}</option>
                      <option value={4}>{t('rounds_count', { count: 4 })}</option>
                      <option value={6}>{t('rounds_count', { count: 6 })}</option>
                      <option value={8}>{t('rounds_count', { count: 8 })}</option>
                      <option value={10}>{t('rounds_count', { count: 10 })}</option>
                    </select>
                  </div>

                  {/* Word Choices Count */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('word_choices_count_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.wordChoicesCount || 3}
                      onChange={(e) => handleUpdateSetting('wordChoicesCount', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value={2}>{t('word_choices_fmt', { count: 2 })}</option>
                      <option value={3}>{t('word_choices_fmt', { count: 3 })}</option>
                      <option value={4}>{t('word_choices_fmt', { count: 4 })}</option>
                    </select>
                  </div>

                  {/* Automatic Hints Count */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('hints_count_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.hintsCount !== undefined ? gameState.hintsCount : 2}
                      onChange={(e) => handleUpdateSetting('hintsCount', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value={0}>{t('hint_none')}</option>
                      <option value={1}>{t('hint_count_fmt', { count: 1 })}</option>
                      <option value={2}>{t('hint_count_fmt', { count: 2 })}</option>
                      <option value={3}>{t('hint_count_fmt', { count: 3 })}</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('category_label')}
                    </label>
                    <select
                      disabled={!isHost}
                      value={gameState.category || 'all'}
                      onChange={(e) => handleUpdateSetting('category', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-[#1e242b] disabled:opacity-80"
                    >
                      <option value="all">{t('cat_all')}</option>
                      <option value="tech">{t('cat_tech')}</option>
                      <option value="movies">{t('cat_movies')}</option>
                      <option value="food">{t('cat_food')}</option>
                      <option value="animals">{t('cat_animals')}</option>
                    </select>
                  </div>
                </div>

                {/* Language, Family Filter & Custom Words Section */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-stone-700">
                      {t('language_label')}
                    </label>

                    {/* Toggle Profanity Badge Button */}
                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={handleToggleProfanityFilter}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 border transition ${
                        gameState.disableProfanityFilter
                          ? 'bg-[#fff8eb] text-[#9c6615] border-[#f5e3bc] hover:bg-[#fdeecb]'
                          : 'bg-[#eaf2eb] text-[#2c5234] border-[#c7decb] hover:bg-[#deede0]'
                      }`}
                    >
                      {gameState.disableProfanityFilter ? (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5 text-[#c86d3b]" />
                          <span>{t('filter_disabled_badge')}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#386641]" />
                          <span>{t('profanity_badge')}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('language', 'hu')}
                      className={`py-1.5 px-2 rounded-xl border text-xs font-bold ${
                        (gameState.language || 'hu') === 'hu' ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234]' : 'bg-white border-stone-200 text-stone-700'
                      }`}
                    >
                      🇭🇺 Magyar
                    </button>
                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('language', 'en')}
                      className={`py-1.5 px-2 rounded-xl border text-xs font-bold ${
                        gameState.language === 'en' ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234]' : 'bg-white border-stone-200 text-stone-700'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      type="button"
                      disabled={!isHost}
                      onClick={() => handleUpdateSetting('language', 'de')}
                      className={`py-1.5 px-2 rounded-xl border text-xs font-bold ${
                        gameState.language === 'de' ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234]' : 'bg-white border-stone-200 text-stone-700'
                      }`}
                    >
                      🇩🇪 Deutsch
                    </button>
                  </div>

                  <input
                    type="text"
                    disabled={!isHost}
                    value={customWordsText}
                    onChange={(e) => setCustomWordsText(e.target.value)}
                    onBlur={handleCustomWordsBlur}
                    placeholder={t('custom_words_placeholder')}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-[#1e242b] font-semibold disabled:opacity-80"
                  />
                </div>
              </div>

              {/* Start Button & Minimum Players Notice */}
              <div className="pt-4 border-t border-stone-200 flex flex-col items-center space-y-3">
                {gameState.players.length < 2 && (
                  <div className="p-3 bg-[#fff8eb] border border-[#f5e3bc] text-[#9c6615] rounded-2xl text-xs font-bold text-center animate-pulse">
                    {t('min_players_notice')}
                  </div>
                )}

                {isHost && (
                  <button
                    onClick={handleStartGame}
                    disabled={gameState.players.length < 2}
                    className="w-full max-w-md py-3.5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-bold text-sm shadow-md transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>{t('start_game_btn')}</span>
                  </button>
                )}

                {!isHost && (
                  <div className="p-4 bg-stone-100 rounded-2xl text-center text-xs font-bold text-stone-600 animate-pulse border border-stone-200 w-full max-w-md">
                    {t('waiting_for_host')}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Connected Player List & Chat */}
            <div className="lg:col-span-4 flex flex-col space-y-4 h-full">
              <div className="h-[280px]">
                <PlayerList
                  players={gameState.players}
                  currentSocketId={currentSocketId}
                  isHost={isHost}
                  gameState={gameState.state}
                  onStartGame={handleStartGame}
                />
              </div>

              <div className="flex-1 min-h-[300px]">
                <ChatBox
                  messages={messages}
                  onSendChat={handleSendChat}
                  onSendReaction={handleSendReaction}
                  onPlayMemeSound={handlePlayMemeSound}
                  isDrawer={false}
                  hasGuessed={false}
                  gameState={gameState.state}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Active Gameplay View (Game Running) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
            {/* Left Column: Player Leaderboard */}
            <div className="lg:col-span-3 flex w-full">
              <PlayerList
                players={gameState.players}
                currentSocketId={currentSocketId}
                isHost={isHost}
                gameState={gameState.state}
                onStartGame={handleStartGame}
                onUsePowerup={handleUsePowerup}
              />
            </div>

            {/* Center Column: Canvas */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full">
              <DrawingCanvas
                isDrawer={isDrawer}
                socket={socket}
                roomId={gameState.roomId}
                gameMode={gameState.gameMode}
                initialTheme={gameState.canvasTheme || 'white'}
                onSendReaction={handleSendReaction}
              />
              <ReactionOverlay reactions={reactions} />
            </div>

            {/* Right Column: Chat Box */}
            <div className="lg:col-span-3 flex w-full">
              <ChatBox
                messages={messages}
                closeGuessAlert={closeGuessAlert}
                onSendChat={handleSendChat}
                onSendReaction={handleSendReaction}
                onPlayMemeSound={handlePlayMemeSound}
                isDrawer={isDrawer}
                hasGuessed={me?.hasGuessed || false}
                gameState={gameState.state}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals & Overlays */}
      {isDrawer && wordChoices.length > 0 && (
        <WordPickerModal
          wordChoices={wordChoices}
          onSelectWord={handleSelectWord}
        />
      )}

      {roundSummaryData && (
        <RoundSummaryModal
          secretWord={roundSummaryData.secretWord}
          players={roundSummaryData.players}
          onRateArtwork={handleRateArtwork}
        />
      )}

      {leaderboard && (
        <PodiumModal
          leaderboard={leaderboard}
          gallery={gameState.gallery || []}
          onReturnLobby={onLeaveRoom}
        />
      )}

      {showDisclaimerModal && (
        <ProfanityDisclaimerModal
          onAccept={handleAcceptDisclaimer}
          onCancel={() => setShowDisclaimerModal(false)}
        />
      )}
    </div>
  );
}
