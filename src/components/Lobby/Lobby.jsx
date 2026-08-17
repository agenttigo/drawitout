import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { ThemeToggle } from '../Common/ThemeToggle';
import { AvatarBuilder } from './AvatarBuilder';
import { HowToPlayModal } from './HowToPlayModal';
import { AboutModal } from './AboutModal';
import { AchievementsModal } from './AchievementsModal';
import { Footer } from '../Common/Footer';
import { soundEngine } from '../../utils/soundEngine';
import {
  Palette,
  PlusCircle,
  Key,
  Trophy,
  HelpCircle,
  Info,
  Film,
} from 'lucide-react';

const SAVED_NAME_KEY = 'drawitout_player_name';
const SAVED_AVATAR_KEY = 'drawitout_player_avatar';

export function Lobby({ onRoomJoined, onStartSandbox, onStartStudio }) {
  const { socket, isConnected } = useSocket();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem(SAVED_NAME_KEY) || 'Művész';
  });

  const [avatar, setAvatar] = useState(() => {
    try {
      const saved = localStorage.getItem(SAVED_AVATAR_KEY);
      return saved ? JSON.parse(saved) : { color: '#fcd34d', costume: 'none', item: 'none', eyes: 'default', mouth: 'happy' };
    } catch {
      return { color: '#fcd34d', costume: 'none', item: 'none', eyes: 'default', mouth: 'happy' };
    }
  });

  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const saveProfile = (name, av) => {
    localStorage.setItem(SAVED_NAME_KEY, name);
    localStorage.setItem(SAVED_AVATAR_KEY, JSON.stringify(av));
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
          onRoomJoined(response.room);
        } else {
          setErrorMessage(response.error || 'Nem sikerült csatlakozni a szobához.');
        }
      }
    );
  };

  return (
    <div className="min-h-screen w-full p-2.5 sm:p-4 md:p-6 bg-[#f7f5f0] dark:bg-[#121518] text-[#1e242b] dark:text-[#f1f5f9] flex flex-col items-center justify-between relative overflow-x-hidden transition-colors duration-200">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e5e0d5]/50 dark:bg-[#386641]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Centered Icon Bar */}
      <div className="w-full max-w-[960px] flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
        <button
          type="button"
          onClick={() => { soundEngine.playClick(); setShowAchievements(true); }}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#1c232d] border border-[#e5e0d5] dark:border-[#333e4d] text-[#2b3036] dark:text-stone-200 hover:bg-[#faf8f3] dark:hover:bg-[#252f3d] hover:border-[#386641] dark:hover:border-[#52a061] shadow-2xs transition flex items-center justify-center touch-manipulation group active:scale-95"
          title={t('achievements_title')}
        >
          <Trophy className="w-4.5 h-4.5 text-[#e9c46a] group-hover:scale-110 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => { soundEngine.playClick(); setShowHowToPlay(true); }}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#1c232d] border border-[#e5e0d5] dark:border-[#333e4d] text-[#2b3036] dark:text-stone-200 hover:bg-[#faf8f3] dark:hover:bg-[#252f3d] hover:border-[#386641] dark:hover:border-[#52a061] shadow-2xs transition flex items-center justify-center touch-manipulation group active:scale-95"
          title={t('how_to_play')}
        >
          <HelpCircle className="w-4.5 h-4.5 text-[#386641] dark:text-[#52a061] group-hover:scale-110 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => { soundEngine.playClick(); setShowAbout(true); }}
          className="p-2.5 rounded-2xl bg-white dark:bg-[#1c232d] border border-[#e5e0d5] dark:border-[#333e4d] text-[#2b3036] dark:text-stone-200 hover:bg-[#faf8f3] dark:hover:bg-[#252f3d] hover:border-[#386641] dark:hover:border-[#52a061] shadow-2xs transition flex items-center justify-center touch-manipulation group active:scale-95"
          title={t('about_us')}
        >
          <Info className="w-4.5 h-4.5 text-[#c86d3b] dark:text-[#ea7a3e] group-hover:scale-110 transition-transform" />
        </button>

        <ThemeToggle />

        <LanguageSelector />
      </div>

      {/* Hero & Profile Section */}
      <div className="w-full max-w-[960px] my-auto py-2 sm:py-4 flex flex-col space-y-3 sm:space-y-4 relative z-10">
        <div className="text-center space-y-2 flex flex-col items-center">
          <img
            src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
            alt="DrawItOut Brand"
            className="h-16 sm:h-22 w-auto object-contain filter drop-shadow-xs"
          />
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-stone-400 font-semibold max-w-lg mx-auto px-2">
            {t('app_subtitle')}
          </p>
        </div>

        {errorMessage && (
          <div className="bg-[#fcf0f0] dark:bg-[#3d1a1a] border border-[#f5c6c6] dark:border-[#7a2e2e] text-[#b93838] dark:text-[#fca5a5] px-3 py-2 rounded-xl text-xs md:text-sm text-center font-bold">
            {errorMessage}
          </div>
        )}

        {/* Central Profile Builder */}
        <div className="glass-card rounded-2xl p-3.5 sm:p-5 md:p-6 space-y-4 border border-[#e5e0d5] dark:border-[#333e4d] bg-[#faf8f3] dark:bg-[#161b22]">
          <div className="max-w-md mx-auto space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#343a40] dark:text-stone-300 mb-1">
                {t('player_name')}
              </label>
              <input
                type="text"
                maxLength={16}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t('player_name_placeholder')}
                className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-4 py-2.5 text-[#1e242b] dark:text-white font-bold text-center text-base focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] focus:ring-2 focus:ring-[#386641]/15 transition shadow-2xs"
              />
            </div>

            <AvatarBuilder avatar={avatar} onChange={setAvatar} />
          </div>
        </div>

        {/* Main Action Buttons (Multiplayer Gameplay as Primary Focus) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 pt-1">
          {/* 1. Create Room (Main Green) */}
          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={loading || !isConnected}
            className="py-4 px-5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] dark:bg-[#2e5936] dark:hover:bg-[#386641] text-white font-black text-sm md:text-base shadow-md shadow-[#386641]/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2.5 touch-manipulation"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{loading ? '...' : t('create_room_btn')}</span>
          </button>

          {/* 2. Join with Code (Main Terracotta) */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setShowJoinModal(true);
            }}
            className="py-4 px-5 rounded-2xl bg-[#c86d3b] hover:bg-[#b05d2f] dark:bg-[#b55c2d] dark:hover:bg-[#c86d3b] text-white font-black text-sm md:text-base shadow-md shadow-[#c86d3b]/20 transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2.5 touch-manipulation"
          >
            <Key className="w-5 h-5" />
            <span>{t('join_room_tab')}</span>
          </button>
        </div>

        {/* Secondary Modes Row (Solo Practice & Creator Studio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5">
          {/* Practice Solo */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              saveProfile(playerName, avatar);
              onStartSandbox(playerName, avatar);
            }}
            className="py-3 px-4 rounded-2xl bg-white dark:bg-[#1c232d] hover:bg-stone-100/80 dark:hover:bg-[#252f3d] text-[#2b3036] dark:text-stone-200 font-bold text-xs sm:text-sm border border-[#d8d1c2] dark:border-[#333e4d] transition flex items-center justify-center space-x-2 shadow-2xs touch-manipulation"
          >
            <Palette className="w-4 h-4 text-[#386641] dark:text-[#52a061]" />
            <span>{t('practice_solo')}</span>
          </button>

          {/* Creator Studio Pro (Extra Feature) */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              saveProfile(playerName, avatar);
              if (onStartStudio) {
                onStartStudio(playerName, avatar);
              } else {
                onStartSandbox(playerName, avatar);
              }
            }}
            className="py-3 px-4 rounded-2xl bg-white dark:bg-[#1c232d] hover:bg-[#eaf2eb] dark:hover:bg-[#252f3d] text-[#2b3036] dark:text-stone-200 hover:text-[#2c5234] dark:hover:text-[#52a061] font-bold text-xs sm:text-sm border border-[#d8d1c2] dark:border-[#333e4d] hover:border-[#386641] dark:hover:border-[#52a061] transition flex items-center justify-center space-x-2 shadow-2xs touch-manipulation"
          >
            <Film className="w-4 h-4 text-[#386641] dark:text-[#52a061]" />
            <span>{t('studio_tab_btn')}</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[960px] relative z-10 mt-3">
        <Footer />
      </div>

      {/* Join Room Code Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md glass-panel rounded-3xl p-5 md:p-8 border border-[#e5e0d5] dark:border-[#333e4d] text-[#1e242b] dark:text-[#f1f5f9] bg-white dark:bg-[#1c232d] relative shadow-xl space-y-5">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition touch-manipulation"
            >
              ✕
            </button>

            <div className="space-y-1 text-center">
              <div className="p-3 bg-[#fff8eb] dark:bg-[#3d2c1e] rounded-2xl text-[#c86d3b] dark:text-[#ea7a3e] inline-block shadow-2xs mb-1">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1e242b] dark:text-white">{t('join_room_tab')}</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
                Add meg a barátodtól kapott 6 betűs szobakódot!
              </p>
            </div>

            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="PL: PLYCF6"
                className="w-full bg-[#faf8f3] dark:bg-[#161b22] border-2 border-stone-200 dark:border-[#333e4d] rounded-2xl py-3 px-4 text-center text-xl font-mono font-black tracking-widest text-[#1e242b] dark:text-white focus:border-[#386641] dark:focus:border-[#52a061] focus:outline-none transition shadow-inner"
              />

              <button
                type="submit"
                disabled={loading || !roomCodeInput.trim() || !isConnected}
                className="w-full py-3.5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-bold text-sm shadow-md transition disabled:opacity-50 touch-manipulation"
              >
                {loading ? '...' : t('join_room_btn')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showAchievements && <AchievementsModal onClose={() => setShowAchievements(false)} />}
    </div>
  );
}
