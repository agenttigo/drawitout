import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Send, MessageSquare, ShieldCheck, Flame, Volume2, Lock } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

const MEME_SOUND_LIST = [
  { id: 'applause', label: '👏 Taps' },
  { id: 'cheer', label: '🎉 Éljenzés' },
  { id: 'laugh', label: '😂 Nevetés' },
  { id: 'gasp', label: '😮 Hüledezés' },
  { id: 'tada', label: '🎺 Ta-Da!' },
  { id: 'pop', label: '🎈 Pop!' },
];

export function ChatBox({
  messages = [],
  closeGuessAlert = '',
  onSendChat,
  onSendReaction,
  onPlayMemeSound,
  isDrawer,
  hasGuessed,
  gameState,
}) {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, closeGuessAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (isDrawer) return;

    soundEngine.playClick();
    onSendChat(inputText.trim());
    setInputText('');
  };

  const isInputDisabled = isDrawer;

  const getPlaceholder = () => {
    if (isDrawer) return t('chat_placeholder_drawer');
    if (gameState === 'LOBBY') return t('chat_placeholder_lobby');
    if (hasGuessed) return t('chat_placeholder_guessed');
    return t('chat_placeholder');
  };

  return (
    <div className="w-full h-full glass-panel rounded-2xl p-4 flex flex-col justify-between space-y-3 border border-[#e5e0d5] shadow-sm bg-white text-[#1e242b]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-[#386641]" />
          <h3 className="font-bold text-[#1e242b] text-xs md:text-sm">
            {t('chat_title')}
          </h3>
        </div>

        {hasGuessed ? (
          <span className="text-[10px] font-bold text-[#2c5234] bg-[#eaf2eb] px-2 py-0.5 rounded-full border border-[#c7decb] flex items-center space-x-1 animate-pulse">
            <Lock className="w-3 h-3 text-[#386641]" />
            <span>{t('guesser_chat_badge')}</span>
          </span>
        ) : (
          <span className="text-[10px] font-bold text-[#2c5234] bg-[#eaf2eb] px-2 py-0.5 rounded-full border border-[#c7decb] flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-[#386641]" />
            <span>{t('chat_family_badge')}</span>
          </span>
        )}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[300px] min-h-[180px]">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-stone-400 font-medium italic text-center p-4">
            {t('empty_chat')}
          </div>
        ) : (
          messages.map((msg) => {
            if (msg.isSystem) {
              return (
                <div
                  key={msg.id}
                  className="p-2 rounded-xl bg-[#faf8f3] border border-[#e5e0d5] text-[#2c333a] text-xs font-bold text-center animate-fade-in shadow-2xs"
                >
                  {msg.text}
                </div>
              );
            }

            const isIsolatedGuesserMsg = msg.isGuesserOnly || msg.hasGuessed;

            return (
              <div
                key={msg.id}
                className={`p-2 rounded-xl text-xs space-y-0.5 border ${
                  isIsolatedGuesserMsg
                    ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234] font-semibold'
                    : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-[#386641]">
                      {msg.senderName}
                    </span>
                    {isIsolatedGuesserMsg && (
                      <span className="text-[9px] bg-[#386641] text-white px-1.5 py-0.2 rounded-md font-bold flex items-center space-x-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Nyertes Chat</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] text-stone-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="font-medium break-words">{msg.text}</p>
              </div>
            );
          })
        )}

        {closeGuessAlert && (
          <div className="p-2 rounded-xl bg-[#fff8eb] border border-[#f5e3bc] text-[#9c6615] text-xs font-bold text-center flex items-center justify-center space-x-1 animate-pulse">
            <Flame className="w-4 h-4 text-[#c86d3b]" />
            <span>{closeGuessAlert}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Meme Soundboard Bar */}
      <div className="flex items-center space-x-1 overflow-x-auto py-1 border-t border-stone-200 custom-scrollbar">
        <Volume2 className="w-3.5 h-3.5 text-[#386641] flex-shrink-0 mr-0.5" />
        {MEME_SOUND_LIST.map((snd) => (
          <button
            key={snd.id}
            type="button"
            onClick={() => { soundEngine.playClick(); onPlayMemeSound(snd.id); }}
            className="px-2 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-[10px] border border-stone-200 transition flex-shrink-0"
          >
            {snd.label}
          </button>
        ))}
      </div>

      {/* Emoji Reactions Bar */}
      <div className="flex items-center justify-between px-1 py-1 border-t border-stone-200">
        {['👏', '❤️', '🔥', '😂', '😮', '🎉', '💩'].map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => {
              soundEngine.playPop();
              onSendReaction(emoji);
            }}
            className="text-base hover:scale-125 transition-transform active:scale-95"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2 pt-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isInputDisabled}
          placeholder={getPlaceholder()}
          className={`flex-1 border rounded-xl px-3 py-2 text-xs font-medium focus:outline-none transition disabled:opacity-50 ${
            hasGuessed
              ? 'bg-[#eaf2eb] border-[#c7decb] text-[#2c5234] placeholder-[#2c5234]/60 focus:border-[#386641]'
              : 'bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400 focus:border-[#386641] focus:bg-white'
          }`}
        />
        <button
          type="submit"
          disabled={isInputDisabled || !inputText.trim()}
          className="px-3.5 py-2 rounded-xl bg-[#386641] hover:bg-[#2d5234] text-white transition font-bold disabled:opacity-50 shadow-2xs"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
