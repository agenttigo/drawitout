import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Trophy, Crown, Play, Hourglass, Lightbulb, Sparkles } from 'lucide-react';
import { AvatarRenderer } from '../../utils/avatarGenerator';
import { soundEngine } from '../../utils/soundEngine';
import { getUnlockedBadges, BADGES } from '../../utils/achievementSystem';

export function PlayerList({
  players = [],
  currentSocketId,
  isHost,
  gameState,
  onStartGame,
  onUsePowerup,
}) {
  const { t } = useLanguage();
  const [usedTimeBoost, setUsedTimeBoost] = useState(false);

  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));

  const handleTimeBoostClick = () => {
    if (usedTimeBoost) return;
    soundEngine.playClick();
    setUsedTimeBoost(true);
    if (onUsePowerup) {
      onUsePowerup('extra_time');
    }
  };

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-4 flex flex-col justify-between space-y-4 border border-[#e5e0d5] dark:border-[#333e4d] shadow-sm bg-white dark:bg-[#161b22] text-[#1e242b] dark:text-[#f1f5f9]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#333e4d] pb-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4.5 h-4.5 text-[#c86d3b] dark:text-[#ea7a3e]" />
          <h3 className="font-bold text-[#1e242b] dark:text-white text-xs md:text-sm">
            {t('players_leaderboard')}
          </h3>
        </div>

        <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#1c232d] px-2 py-0.5 rounded-full border border-stone-200 dark:border-[#333e4d]">
          {t('players_count', { count: players.length })}
        </span>
      </div>

      {/* Players List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[380px]">
        {sortedPlayers.map((player, index) => {
          const isMe = player.id === currentSocketId;
          const isDrawer = player.isDrawer;

          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                isDrawer
                  ? 'bg-[#eaf2eb] dark:bg-[#1f3323] border-[#c7decb] dark:border-[#2e5936] text-[#2c5234] dark:text-[#6ee7b7] font-bold shadow-2xs'
                  : player.hasGuessed
                  ? 'bg-[#f4efe6] dark:bg-[#252a33] border-[#d8d1c2] dark:border-[#384252] text-[#2b3036] dark:text-[#e2e8f0] font-semibold'
                  : isMe
                  ? 'bg-[#f7f3ec] dark:bg-[#222a36] border-[#e2ded4] dark:border-[#3c4a5c] text-[#1e242b] dark:text-white font-bold'
                  : 'bg-stone-50 dark:bg-[#1c232d] border-stone-200 dark:border-[#333e4d] text-stone-700 dark:text-stone-300'
              }`}
            >
              {/* Left Side: Rank & Avatar & Name */}
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 w-4 text-center">
                  #{index + 1}
                </span>

                <div className="w-8 h-8 rounded-xl overflow-hidden bg-white dark:bg-[#121518] flex items-center justify-center border border-stone-200 dark:border-[#333e4d] flex-shrink-0">
                  <AvatarRenderer avatar={player.avatar} size={26} />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs text-[#1e242b] dark:text-white truncate max-w-[90px] md:max-w-[110px]">
                      {player.name}
                    </span>

                    {isMe && (
                      <span className="text-[10px] text-[#386641] dark:text-[#52a061] font-bold">
                        {t('you_tag')}
                      </span>
                    )}

                    {player.isHost && (
                      <Crown className="w-3.5 h-3.5 text-[#e9c46a] fill-current flex-shrink-0" />
                    )}
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center space-x-1">
                    {isDrawer && (
                      <span className="text-[9px] bg-[#386641] dark:bg-[#2e5936] text-white px-1.5 py-0.2 rounded-md font-bold">
                        🎨 {t('drawing_now')}
                      </span>
                    )}

                    {player.hasGuessed && (
                      <span className="text-[9px] bg-[#386641]/15 dark:bg-[#2e5936]/40 text-[#2c5234] dark:text-[#6ee7b7] px-1.5 py-0.2 rounded-md font-bold">
                        ✓ {t('guessed')}
                      </span>
                    )}

                    {/* Unlocked Artist Badges */}
                    <div className="flex space-x-0.5 text-[10px]">
                      {getUnlockedBadges().slice(0, 3).map(bId => {
                        const bObj = Object.values(BADGES).find(b => b.id === bId);
                        return bObj ? <span key={bId} title={t(bObj.key_title)}>{bObj.icon}</span> : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Score */}
              <div className="text-right flex-shrink-0">
                <span className="font-extrabold text-xs text-[#386641] dark:text-[#6ee7b7]">
                  {player.score || 0}
                </span>
                <span className="text-[9px] text-stone-400 dark:text-stone-500 block font-semibold">pt</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spectator Time Boost Power-Up */}
      {gameState === 'DRAWING' && (
        <div className="p-2 bg-stone-50 dark:bg-[#1c232d] border border-stone-200 dark:border-[#333e4d] rounded-xl space-y-1 text-center">
          <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
            ⚡ Party Power-Up
          </span>
          <button
            onClick={handleTimeBoostClick}
            disabled={usedTimeBoost}
            className="w-full py-1.5 px-3 rounded-lg bg-[#c86d3b] hover:bg-[#b05d2f] text-white font-bold text-xs shadow-2xs transition disabled:opacity-50 flex items-center justify-center space-x-1"
          >
            <Hourglass className="w-3.5 h-3.5" />
            <span>{usedTimeBoost ? '✓ +10s Használva' : t('powerup_extra_time')}</span>
          </button>
        </div>
      )}

      {/* Start Game Button for Host */}
      {gameState === 'LOBBY' && isHost && (
        <button
          onClick={() => {
            soundEngine.playClick();
            onStartGame();
          }}
          disabled={players.length < 2}
          className="w-full py-3 rounded-xl bg-[#386641] hover:bg-[#2d5234] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{t('start_game_btn')}</span>
        </button>
      )}

      {gameState === 'LOBBY' && !isHost && (
        <div className="p-3 bg-stone-100 dark:bg-[#1c232d] rounded-xl text-center text-xs font-semibold text-stone-500 dark:text-stone-400 animate-pulse border border-stone-200 dark:border-[#333e4d]">
          {t('waiting_for_host')}
        </div>
      )}
    </div>
  );
}
