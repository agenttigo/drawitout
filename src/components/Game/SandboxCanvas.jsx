import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { DrawingCanvas } from './DrawingCanvas';
import {
  ArrowLeft,
  Dices,
  Sparkles,
  Eye,
  EyeOff,
  Timer,
  RotateCcw,
  Tag,
  CheckCircle2,
  Clock,
  Shuffle,
  Languages
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { recordPracticeWord } from '../../utils/achievementSystem';

// Import rich localized word dictionaries
import { hungarianWordCategories, hungarianWords } from '../../../server/words/hu.js';
import { englishWordCategories, englishWords } from '../../../server/words/en.js';
import { germanWordCategories, germanWords } from '../../../server/words/de.js';

export function SandboxCanvas({ playerName, avatar, onLeave }) {
  const { t, language } = useLanguage();

  // Dictionary Language state (initialized to the active UI language)
  const [dictionaryLang, setDictionaryLang] = useState(language);
  const manualDictChangeRef = useRef(false);

  // Synchronize dictionary language when main UI language changes (if user hasn't overridden it manually)
  useEffect(() => {
    if (!manualDictChangeRef.current) {
      setDictionaryLang(language);
    }
  }, [language]);

  // Category & Word State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentWord, setCurrentWord] = useState('');
  const [isWordHidden, setIsWordHidden] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  // Timer State (Practice timer: 'off', 60, 80)
  const [timerMode, setTimerMode] = useState('off'); // 'off' | 60 | 80
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Helper to get active category pool based on dictionary language
  const getWordPool = useCallback((cat, dictLang) => {
    let catMap;
    let fallbackAll;

    if (dictLang === 'en') {
      catMap = englishWordCategories;
      fallbackAll = englishWords;
    } else if (dictLang === 'de') {
      catMap = germanWordCategories;
      fallbackAll = germanWords;
    } else {
      catMap = hungarianWordCategories;
      fallbackAll = hungarianWords;
    }

    if (cat && cat !== 'all' && catMap[cat] && catMap[cat].length > 0) {
      return catMap[cat];
    }
    return fallbackAll;
  }, []);

  // Pick a new random word from current category and active dictionary language
  const pickNewWord = useCallback(() => {
    const pool = getWordPool(selectedCategory, dictionaryLang);
    if (!pool || pool.length === 0) return;

    soundEngine.playPop();

    let randomWord = pool[Math.floor(Math.random() * pool.length)];
    // Ensure we don't pick the exact same word if pool has > 1 words
    if (pool.length > 1 && randomWord === currentWord) {
      const filtered = pool.filter((w) => w !== currentWord);
      randomWord = filtered[Math.floor(Math.random() * filtered.length)];
    }

    setCurrentWord(randomWord);
    setIsWordHidden(false);
    setHistoryCount((prev) => prev + 1);
    recordPracticeWord();

    // Reset timer if active
    if (timerMode !== 'off') {
      setTimeLeft(timerMode);
      setIsTimerRunning(true);
      setIsTimeUp(false);
    }
  }, [selectedCategory, dictionaryLang, currentWord, getWordPool, timerMode]);

  // Pick initial word on mount or when category/dictionary language changes
  useEffect(() => {
    pickNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, dictionaryLang]);

  // Timer countdown handler
  useEffect(() => {
    if (timerMode === 'off' || !isTimerRunning) return;

    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      setIsTimeUp(true);
      soundEngine.playVictory();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 6 && prev > 1) {
          soundEngine.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerMode, isTimerRunning, timeLeft]);

  // Handle timer mode change
  const handleTimerModeChange = (mode) => {
    soundEngine.playClick();
    setTimerMode(mode);
    if (mode === 'off') {
      setIsTimerRunning(false);
      setIsTimeUp(false);
    } else {
      setTimeLeft(mode);
      setIsTimerRunning(true);
      setIsTimeUp(false);
    }
  };

  const pool = getWordPool(selectedCategory, dictionaryLang);
  const totalInCat = pool ? pool.length : 0;

  // Category list
  const categories = [
    { id: 'all', label: t('cat_all') },
    { id: 'general', label: t('cat_general') },
    { id: 'animals', label: t('cat_animals') },
    { id: 'food', label: t('cat_food') },
    { id: 'tech', label: t('cat_tech') },
    { id: 'movies', label: t('cat_movies') },
    { id: 'sports', label: t('cat_sports') },
    { id: 'professions', label: t('cat_professions') },
    { id: 'places', label: t('cat_places') },
    { id: 'fantasy', label: t('cat_fantasy') },
    { id: 'vehicles', label: t('cat_vehicles') },
    { id: 'brands', label: t('cat_brands') },
  ];

  return (
    <div className="min-h-screen w-full p-3 sm:p-4 md:p-6 bg-[#f7f5f0] dark:bg-[#121518] text-[#1e242b] dark:text-[#f1f5f9] flex flex-col space-y-3.5 transition-colors duration-300">
      {/* 1. Header Row */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm border border-[#e5e0d5] dark:border-[#2d3848] bg-white/95 dark:bg-[#181f28]/95">
        <button
          onClick={() => {
            soundEngine.playClick();
            onLeave();
          }}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-[#253140] hover:bg-stone-200 dark:hover:bg-[#2e3e52] text-[#1e242b] dark:text-white font-bold text-xs transition border border-stone-200 dark:border-[#334155] touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-stone-300" />
          <span>{t('back_to_lobby')}</span>
        </button>

        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-[#eaf2eb] dark:bg-[#203426] text-[#386641] dark:text-[#6ee7b7] rounded-xl shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#1e242b] dark:text-white tracking-tight">
              {t('sandbox_title')}
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold hidden sm:block">
              {t('sandbox_desc')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSelector />
        </div>
      </div>

      {/* 2. Interactive Practice Control & Word Prompter Card */}
      <div className="glass-panel p-4 rounded-2xl border border-[#e5e0d5] dark:border-[#2d3848] bg-white/95 dark:bg-[#181f28]/95 shadow-sm space-y-3.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
          {/* Topic Category & Dictionary Language Selectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Category Select */}
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600 dark:text-stone-300">
              <Tag className="w-3.5 h-3.5 text-[#386641] dark:text-[#6ee7b7]" />
              <span>{t('sandbox_topic_label')}</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => {
                soundEngine.playClick();
                setSelectedCategory(e.target.value);
              }}
              className="bg-[#faf8f3] dark:bg-[#141b24] border border-stone-300 dark:border-[#334155] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#1e242b] dark:text-white focus:outline-none focus:border-[#386641] dark:focus:border-[#6ee7b7] transition shadow-2xs"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Dictionary Language Select */}
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 ml-1">
              <Languages className="w-3.5 h-3.5 text-[#386641] dark:text-[#6ee7b7]" />
              <span>{t('sandbox_dict_label')}</span>
            </div>

            <select
              value={dictionaryLang}
              onChange={(e) => {
                soundEngine.playClick();
                manualDictChangeRef.current = true;
                setDictionaryLang(e.target.value);
              }}
              className="bg-[#faf8f3] dark:bg-[#141b24] border border-stone-300 dark:border-[#334155] rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#1e242b] dark:text-white focus:outline-none focus:border-[#386641] dark:focus:border-[#6ee7b7] transition shadow-2xs"
            >
              <option value="hu">{t('lang_hu_short')}</option>
              <option value="en">{t('lang_en_short')}</option>
              <option value="de">{t('lang_de_short')}</option>
            </select>

            <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 px-2.5 py-1 bg-stone-100 dark:bg-[#1f2937] rounded-lg border border-stone-200 dark:border-[#374151]">
              {totalInCat} {t('sandbox_word_count')}
            </span>
          </div>

          {/* Practice Timer Controls */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center space-x-1 text-xs font-bold text-stone-600 dark:text-stone-300">
              <Timer className="w-3.5 h-3.5 text-[#c86d3b] dark:text-[#fb923c]" />
              <span>{t('sandbox_timer_label')}</span>
            </div>

            <div className="flex rounded-xl bg-stone-100 dark:bg-[#141b24] p-1 border border-stone-200 dark:border-[#334155]">
              <button
                type="button"
                onClick={() => handleTimerModeChange('off')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  timerMode === 'off'
                    ? 'bg-white dark:bg-[#253140] text-[#1e242b] dark:text-white shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                }`}
              >
                {t('sandbox_timer_off')}
              </button>
              <button
                type="button"
                onClick={() => handleTimerModeChange(60)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  timerMode === 60
                    ? 'bg-[#386641] text-white shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                }`}
              >
                {t('sandbox_timer_60')}
              </button>
              <button
                type="button"
                onClick={() => handleTimerModeChange(80)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  timerMode === 80
                    ? 'bg-[#386641] text-white shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
                }`}
              >
                {t('sandbox_timer_80')}
              </button>
            </div>

            {timerMode !== 'off' && (
              <div
                className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-mono font-black border transition ${
                  isTimeUp
                    ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-300 animate-bounce'
                    : timeLeft <= 10
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 animate-pulse'
                    : 'bg-stone-100 dark:bg-[#253140] text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Main Practice Word Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#faf8f3] via-[#fffdfa] to-[#faf8f3] dark:from-[#141b24] dark:via-[#19222d] dark:to-[#141b24] border border-[#e2ddd3] dark:border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-[#386641] text-white flex items-center justify-center shadow-md shrink-0">
              <Shuffle className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#386641] dark:text-[#6ee7b7]">
                  {t('sandbox_draw_this')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-[#253140] font-bold text-stone-700 dark:text-stone-300">
                  {currentWord ? `${currentWord.length} betű` : ''}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eaf2eb] dark:bg-[#203426] font-extrabold text-[#386641] dark:text-[#6ee7b7]">
                  {dictionaryLang === 'hu' ? '🇭🇺 HU' : dictionaryLang === 'en' ? '🇬🇧 EN' : '🇩🇪 DE'}
                </span>
              </div>

              <div className="flex items-center space-x-3 mt-0.5">
                {isWordHidden ? (
                  <span className="text-xl sm:text-2xl font-black text-stone-400 dark:text-stone-600 tracking-widest select-none">
                    •••••••••••
                  </span>
                ) : (
                  <span className="text-xl sm:text-2xl font-black text-[#1e242b] dark:text-white tracking-tight select-all">
                    {currentWord || '...'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: New Word & Hide/Show */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setIsWordHidden(!isWordHidden);
              }}
              title={isWordHidden ? t('sandbox_show_word') : t('sandbox_hide_word')}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-[#253140] hover:bg-stone-200 dark:hover:bg-[#2e3e52] text-stone-700 dark:text-stone-300 font-bold transition border border-stone-200 dark:border-[#334155] touch-manipulation"
            >
              {isWordHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            {timerMode !== 'off' && isTimeUp && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setTimeLeft(timerMode);
                  setIsTimerRunning(true);
                  setIsTimeUp(false);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-1.5 touch-manipulation"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('sandbox_restart_timer')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={pickNewWord}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 touch-manipulation active:scale-95"
            >
              <Dices className="w-4 h-4 animate-spin-slow" />
              <span>{t('sandbox_new_word')}</span>
            </button>
          </div>
        </div>

        {/* Time's up banner notification if timer expired */}
        {timerMode !== 'off' && isTimeUp && (
          <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 animate-fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>{t('sandbox_time_up')}</span>
            </div>
            <button
              type="button"
              onClick={pickNewWord}
              className="underline hover:no-underline text-rose-800 dark:text-rose-200"
            >
              {t('sandbox_new_word')} →
            </button>
          </div>
        )}
      </div>

      {/* 4. Full Drawing Canvas */}
      <div className="w-full">
        <DrawingCanvas
          isDrawer={true}
          socket={null}
          roomId="SANDBOX"
          onSendReaction={() => {}}
        />
      </div>
    </div>
  );
}
