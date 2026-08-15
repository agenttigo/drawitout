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
    <div className="w-full h-full glass-panel rounded-2xl p-4 flex flex-col justify-between space-y-4 border border-[#e5e0d5] shadow-sm bg-white text-[#1e242b]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center space-x-2">
          <Trophy className="w-4.5 h-4.5 text-[#c86d3b]" />
          <h3 className="font-bold text-[#1e242b] text-xs md:text-sm">
            {t('players_leaderboard')}
          </h3>
        </div>

        <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
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
                  ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234] font-bold shadow-2xs'
                  : player.hasGuessed
                  ? 'bg-[#f4efe6] border-[#d8d1c2] text-[#2b3036] font-semibold'
                  : isMe
                  ? 'bg-[#f7f3ec] border-[#e2ded4] text-[#1e242b] font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              {/* Left Side: Rank & Avatar & Name */}
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-xs font-bold text-stone-500 w-4 text-center">
                  #{index + 1}
                </span>

                <div className="w-8 h-8 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-stone-200 flex-shrink-0">
                  <AvatarRenderer avatar={player.avatar} size={26} />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs truncate max-w-[90px] md:max-w-[110px]">
                      {player.name}
                    </span>

                    {isMe && (
                      <span className="text-[10px] text-[#386641] font-bold">
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
                      <span className="text-[9px] bg-[#386641] text-white px-1.5 py-0.2 rounded-md font-bold">
                        🎨 {t('drawing_now')}
                      </span>
                    )}

                    {player.hasGuessed && (
                      <span className="text-[9px] bg-[#386641]/15 text-[#2c5234] px-1.5 py-0.2 rounded-md font-bold">
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
                <span className="font-extrabold text-xs text-[#386641]">
                  {player.score || 0}
                </span>
                <span className="text-[9px] text-stone-400 block font-semibold">pt</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spectator Time Boost Power-Up */}
      {gameState === 'DRAWING' && (
        <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-center">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
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
        <div className="p-3 bg-stone-100 rounded-xl text-center text-xs font-semibold text-stone-500 animate-pulse border border-stone-200">
          {t('waiting_for_host')}
        </div>
      )}
    </div>
  );
}
