import React from 'react';
import { AvatarRenderer, AVATAR_COLORS, EYES_STYLES, MOUTH_STYLES, ACCESSORY_STYLES, COSTUME_STYLES, ITEM_STYLES } from '../../utils/avatarGenerator';
import { useLanguage } from '../../context/LanguageContext';
import { Shuffle, Palette, Sparkles, Shirt, Wand2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function AvatarBuilder({ avatar, onChange }) {
  const { t } = useLanguage();

  const presetHeroes = [
    { key: 'preset_master_painter', name: t('preset_master_painter'), color: '#386641', eyes: 'happy', mouth: 'bigsmile', accessory: 'beret', costume: 'apron', item: 'brush' },
    { key: 'preset_ninja_drawer', name: t('preset_ninja_drawer'), color: '#4a5568', eyes: 'cool', mouth: 'straight', accessory: 'none', costume: 'ninja', item: 'pencil' },
    { key: 'preset_wizard_sketcher', name: t('preset_wizard_sketcher'), color: '#e9c46a', eyes: 'sparkle', mouth: 'smile', accessory: 'wizard_hat', costume: 'none', item: 'wand' },
    { key: 'preset_superhero_artist', name: t('preset_superhero_artist'), color: '#c86d3b', eyes: 'star', mouth: 'bigsmile', accessory: 'crown', costume: 'cape', item: 'pencil' },
    { key: 'preset_astronaut_sketcher', name: t('preset_astronaut_sketcher'), color: '#d4a373', eyes: 'cute', mouth: 'open', accessory: 'headphones', costume: 'spacesuit', item: 'spray' },
    { key: 'preset_bunny_artist', name: t('preset_bunny_artist'), color: '#e76f51', eyes: 'heart', mouth: 'tongue', accessory: 'bunny_ears', costume: 'none', item: 'brush' },
  ];

  const handleRandomize = () => {
    soundEngine.playClick();
    onChange({
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      eyes: EYES_STYLES[Math.floor(Math.random() * EYES_STYLES.length)],
      mouth: MOUTH_STYLES[Math.floor(Math.random() * MOUTH_STYLES.length)],
      accessory: ACCESSORY_STYLES[Math.floor(Math.random() * ACCESSORY_STYLES.length)],
      costume: COSTUME_STYLES[Math.floor(Math.random() * COSTUME_STYLES.length)],
      item: ITEM_STYLES[Math.floor(Math.random() * ITEM_STYLES.length)],
    });
  };

  const handlePresetSelect = (hero) => {
    soundEngine.playClick();
    onChange({
      color: hero.color,
      eyes: hero.eyes,
      mouth: hero.mouth,
      accessory: hero.accessory,
      costume: hero.costume,
      item: hero.item,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 w-full text-[#1e242b] dark:text-[#f1f5f9]">
      {/* Main Avatar Preview */}
      <div className="relative group">
        <div className="w-28 h-32 md:w-32 md:h-36 p-2 rounded-3xl bg-[#faf8f3] dark:bg-[#121518] border-2 border-[#e5e0d5] dark:border-[#333e4d] flex items-center justify-center shadow-xs">
          <AvatarRenderer avatar={avatar} size={90} />
        </div>

        <button
          type="button"
          onClick={handleRandomize}
          className="absolute -top-2 -right-2 p-2.5 bg-[#386641] hover:bg-[#2d5234] rounded-full text-white shadow-md hover:scale-110 active:scale-95 transition touch-manipulation"
          title="Random"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Hero Presets (Scrollable on mobile) */}
      <div className="w-full space-y-1">
        <label className="block text-xs font-bold text-[#343a40] dark:text-stone-300 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#e9c46a]" />
          <span>{t('avatar_presets')}</span>
        </label>
        <div className="flex flex-wrap gap-1.5 justify-center overflow-x-auto py-0.5 custom-scrollbar">
          {presetHeroes.map((hero) => (
            <button
              key={hero.key}
              type="button"
              onClick={() => handlePresetSelect(hero)}
              className="py-1 px-2.5 rounded-xl bg-[#eaf2eb] dark:bg-[#1f3323] hover:bg-[#deede0] dark:hover:bg-[#28422d] border border-[#c7decb] dark:border-[#2e5936] text-[11px] font-extrabold text-[#2c5234] dark:text-[#6ee7b7] transition touch-manipulation active:scale-95 flex-shrink-0"
            >
              {hero.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="w-full space-y-1">
        <div className="flex items-center text-xs font-bold text-[#343a40] dark:text-stone-300 space-x-1">
          <Palette className="w-3.5 h-3.5 text-[#386641] dark:text-[#52a061]" />
          <span>{t('avatar_color')}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 py-0.5">
          {AVATAR_COLORS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => { soundEngine.playClick(); onChange({ ...avatar, color: c }); }}
              className={`w-6 h-6 md:w-6 md:h-6 rounded-full transition-transform touch-manipulation ${
                avatar.color === c ? 'scale-125 ring-2 ring-[#386641] dark:ring-[#52a061] shadow-2xs' : 'opacity-85 hover:opacity-100 hover:scale-110 active:scale-95'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Costume & Handheld Item */}
      <div className="w-full grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-stone-600 dark:text-stone-300 mb-1 font-bold flex items-center space-x-1">
            <Shirt className="w-3.5 h-3.5 text-[#386641] dark:text-[#52a061]" />
            <span>{t('avatar_costume')}</span>
          </label>
          <select
            value={avatar.costume || 'apron'}
            onChange={(e) => { soundEngine.playClick(); onChange({ ...avatar, costume: e.target.value }); }}
            className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-2 py-2 text-[#1e242b] dark:text-white font-bold focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] touch-manipulation"
          >
            {COSTUME_STYLES.map(c => (
              <option key={c} value={c}>{t(`costume_${c}`)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-stone-600 dark:text-stone-300 mb-1 font-bold flex items-center space-x-1">
            <Wand2 className="w-3.5 h-3.5 text-[#386641] dark:text-[#52a061]" />
            <span>{t('avatar_item')}</span>
          </label>
          <select
            value={avatar.item || 'brush'}
            onChange={(e) => { soundEngine.playClick(); onChange({ ...avatar, item: e.target.value }); }}
            className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-2 py-2 text-[#1e242b] dark:text-white font-bold focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] touch-manipulation"
          >
            {ITEM_STYLES.map(i => (
              <option key={i} value={i}>{t(`item_${i}`)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Eyes & Mouth & Accessories */}
      <div className="w-full grid grid-cols-3 gap-2 text-xs">
        <div>
          <label className="block text-stone-600 dark:text-stone-300 mb-1 font-semibold">{t('avatar_eyes')}</label>
          <select
            value={avatar.eyes}
            onChange={(e) => { soundEngine.playClick(); onChange({ ...avatar, eyes: e.target.value }); }}
            className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-1.5 py-2 text-[#1e242b] dark:text-white font-semibold focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] touch-manipulation"
          >
            {EYES_STYLES.map(style => (
              <option key={style} value={style}>{t(`eyes_${style}`)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-stone-600 dark:text-stone-300 mb-1 font-semibold">{t('avatar_mouth')}</label>
          <select
            value={avatar.mouth}
            onChange={(e) => { soundEngine.playClick(); onChange({ ...avatar, mouth: e.target.value }); }}
            className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-1.5 py-2 text-[#1e242b] dark:text-white font-semibold focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] touch-manipulation"
          >
            {MOUTH_STYLES.map(style => (
              <option key={style} value={style}>{t(`mouth_${style}`)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-stone-600 dark:text-stone-300 mb-1 font-semibold">{t('avatar_hat')}</label>
          <select
            value={avatar.accessory}
            onChange={(e) => { soundEngine.playClick(); onChange({ ...avatar, accessory: e.target.value }); }}
            className="w-full bg-white dark:bg-[#1c232d] border border-[#d8d3c5] dark:border-[#333e4d] rounded-xl px-1.5 py-2 text-[#1e242b] dark:text-white font-semibold focus:outline-none focus:border-[#386641] dark:focus:border-[#52a061] touch-manipulation"
          >
            {ACCESSORY_STYLES.map(acc => (
              <option key={acc} value={acc}>{t(`hat_${acc}`)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
