import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useLanguage } from '../../context/LanguageContext';
import { AvatarBuilder } from './AvatarBuilder';
import { HowToPlayModal } from './HowToPlayModal';
import { AboutModal } from './AboutModal';
import { LanguageSelector } from '../Common/LanguageSelector';
import { Footer } from '../Common/Footer';
import { getRandomAvatar } from '../../utils/avatarGenerator';
import { soundEngine } from '../../utils/soundEngine';
import { Palette, Play, Users, PlusCircle, Sparkles, HelpCircle, Heart, Key, ArrowRight, X } from 'lucide-react';

export function Lobby({ onRoomJoined, onStartSandbox }) {
  const { socket, isConnected } = useSocket();
  const { t } = useLanguage();

  const [playerName, setPlayerName] = useState(() => localStorage.getItem('drawitout_name') || 'Művész' + Math.floor(Math.random() * 100));
  const [avatar, setAvatar] = useState(() => {
    try {
      const saved = localStorage.getItem('drawitout_avatar');
      return saved ? JSON.parse(saved) : getRandomAvatar();
    } catch (e) {
      return getRandomAvatar();
    }
  });

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return !!params.get('room');
  });

  const [roomCodeInput, setRoomCodeInput] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('room') || '').toUpperCase();
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const saveProfile = (name, av) => {
    setPlayerName(name);
    setAvatar(av);
    localStorage.setItem('drawitout_name', name);
    localStorage.setItem('drawitout_avatar', JSON.stringify(av));
  };

  const handleCreateRoom = () => {
    soundEngine.playClick();
    if (!socket || !isConnected) {
      setErrorMessage('Nincs kapcsolat a szerverrel. Kérlek próbáld újra!');
      return;
    }

    if (!playerName.trim()) {
      setErrorMessage('Kérlek adj meg egy nevet!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    saveProfile(playerName, avatar);

    socket.emit(
      'create_room',
      {
        player: { name: playerName.trim(), avatar },
        settings: {
          rounds: 4,
          drawTime: 60,
          language: 'hu',
          gameMode: 'STANDARD',
          category: 'all',
          customWords: [],
          disableProfanityFilter: false,
        },
      },
      (response) => {
        setLoading(false);
        if (response.success) {
          onRoomJoined(response.room);
        } else {
          setErrorMessage(response.error || 'Nem sikerült létrehozni a szobát.');
        }
      }
    );
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    soundEngine.playClick();
    if (!socket || !isConnected) {
      setErrorMessage('Nincs kapcsolat a szerverrel.');
      return;
    }

    if (!playerName.trim()) {
      setErrorMessage('Kérlek adj meg egy nevet!');
      return;
    }

    if (!roomCodeInput.trim()) {
      setErrorMessage('Kérlek add meg a szobakódot!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    saveProfile(playerName, avatar);

    socket.emit(
      'join_room',
      {
        roomId: roomCodeInput.trim().toUpperCase(),
        player: { name: playerName.trim(), avatar },
      },
      (response) => {
        setLoading(false);
        if (response.success) {
          setShowJoinModal(false);
          onRoomJoined(response.room);
        } else {
          setErrorMessage(response.error || 'A csatlakozás nem sikerült.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-3 md:p-6 relative overflow-hidden bg-[#f7f5f0] text-[#1e242b]">
      {/* Gentle, Eye-Friendly Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e2ddd3]/40 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4c9b8]/30 rounded-full blur-3xl pointer-events-none animate-glow" />

      {/* Top Navbar with Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-[960px] glass-panel rounded-3xl p-6 md:p-8 shadow-xl relative z-10 space-y-6 my-auto border border-[#e5e0d5] bg-white/95">
        {/* Header Branding & Quick Info buttons */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { soundEngine.playClick(); setShowHowToPlay(true); }}
              className="px-3.5 py-1.5 rounded-full bg-[#f0ebe1] hover:bg-[#e7e1d5] border border-[#dcd5c8] text-[#2c333a] text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <HelpCircle className="w-4 h-4 text-[#4a7c59]" />
              <span>{t('how_to_play')}</span>
            </button>

            <button
              onClick={() => { soundEngine.playClick(); setShowAbout(true); }}
              className="px-3.5 py-1.5 rounded-full bg-[#eaf2eb] hover:bg-[#deede0] border border-[#c7decb] text-[#2c5234] text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <Heart className="w-4 h-4 fill-current text-[#386641]" />
              <span>{t('about_us')}</span>
            </button>
          </div>

          {/* Light Theme SVG App Logo Banner */}
          <div className="w-full max-w-sm my-1 hover:scale-[1.01] transition-transform duration-300">
            <img src="/logo-light.svg" alt="DrawItOut Logo" className="w-full h-auto drop-shadow-xs" />
          </div>

          <p className="text-[#576270] text-xs md:text-sm max-w-md mx-auto font-medium text-center">
            {t('app_subtitle')}
          </p>
        </div>

        {!isConnected && (
          <div className="bg-[#fff9eb] border border-[#f3e3b3] text-[#8a6d1b] px-4 py-2.5 rounded-xl text-xs md:text-sm text-center font-bold animate-pulse">
            ⚠️ Kapcsolódás a szerverhez... Kérlek várj egy pillanatot!
          </div>
        )}

        {errorMessage && (
          <div className="bg-[#fcf0f0] border border-[#f5c6c6] text-[#b93838] px-4 py-2.5 rounded-xl text-xs md:text-sm text-center font-bold">
            {errorMessage}
          </div>
        )}

        {/* Central Profile Builder */}
        <div className="glass-card rounded-2xl p-5 md:p-6 space-y-5 border border-[#e5e0d5] bg-[#faf8f3]">
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343a40] mb-1.5">
                {t('player_name')}
              </label>
              <input
                type="text"
                maxLength={16}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t('player_name_placeholder')}
                className="w-full bg-white border border-[#d8d3c5] rounded-xl px-4 py-2.5 text-[#1e242b] font-bold text-center text-base focus:outline-none focus:border-[#386641] focus:ring-2 focus:ring-[#386641]/15 transition shadow-2xs"
              />
            </div>

            <AvatarBuilder avatar={avatar} onChange={setAvatar} />
          </div>
        </div>

        {/* Three Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Practice Solo */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              saveProfile(playerName, avatar);
              onStartSandbox(playerName, avatar);
            }}
            className="py-3.5 px-5 rounded-2xl bg-[#f4efe6] hover:bg-[#eae3d5] text-[#2b3036] font-bold text-xs md:text-sm border border-[#d8d1c2] transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-2xs"
          >
            <Palette className="w-4.5 h-4.5 text-[#386641]" />
            <span>{t('practice_solo')}</span>
          </button>

          {/* 2. Create Room */}
          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={loading || !isConnected}
            className="py-3.5 px-5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs md:text-sm shadow-md shadow-[#386641]/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            <span>{loading ? '...' : t('create_room_btn')}</span>
          </button>

          {/* 3. Join with Code */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setShowJoinModal(true);
            }}
            className="py-3.5 px-5 rounded-2xl bg-[#c86d3b] hover:bg-[#b05d2f] text-white font-extrabold text-xs md:text-sm shadow-md shadow-[#c86d3b]/20 transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <Key className="w-4.5 h-4.5" />
            <span>{t('join_room_tab')}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[960px] relative z-10">
        <Footer />
      </div>

      {/* Join Room Code Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md glass-panel rounded-3xl p-6 md:p-8 border border-[#e5e0d5] text-[#1e242b] bg-white relative shadow-xl space-y-6">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#eaf2eb] text-[#386641] flex items-center justify-center mx-auto mb-2">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1e242b]">{t('join_room_tab')}</h3>
              <p className="text-xs text-stone-500 font-semibold">{t('room_code_label')}</p>
            </div>

            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder={t('room_code_placeholder')}
                className="w-full bg-[#f9f8f5] border-2 border-[#dcd5c8] rounded-2xl px-4 py-4 text-center text-2xl font-black tracking-widest text-[#386641] uppercase focus:outline-none focus:border-[#386641] focus:bg-white transition"
              />

              <button
                type="submit"
                disabled={loading || !roomCodeInput.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs md:text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? '...' : t('join_room_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* How to Play & About Modals */}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
