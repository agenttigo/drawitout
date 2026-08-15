import React from 'react';

export const AVATAR_COLORS = [
  '#386641', // Sage Green
  '#c86d3b', // Soft Terracotta
  '#d4a373', // Warm Sand
  '#e9c46a', // Soft Sun Gold
  '#6b705c', // Muted Olive
  '#4a5568', // Soft Slate
  '#e76f51', // Soft Coral
  '#4a7c59', // Forest Sage
  '#b5651d', // Bronze Earth
  '#576270', // Slate Grey
  '#2c5234', // Deep Pine
  '#d97706', // Warm Amber
];

export const EYES_STYLES = ['happy', 'cool', 'surprised', 'star', 'wink', 'default', 'sparkle', 'cute', 'sleeping', 'heart'];
export const MOUTH_STYLES = ['smile', 'open', 'tongue', 'cat', 'straight', 'bigsmile', 'whistle', 'droll'];
export const ACCESSORY_STYLES = ['none', 'beret', 'crown', 'glasses', 'headphones', 'cap', 'bunny_ears', 'wizard_hat', 'party_hat', 'cat_ears', 'flower'];
export const COSTUME_STYLES = ['none', 'apron', 'cape', 'hoodie', 'ninja', 'tuxedo', 'spacesuit'];
export const ITEM_STYLES = ['pencil', 'brush', 'wand', 'palette', 'spray', 'none'];

export const PRESET_HEROES = [
  { name: '🎨 Mesterfestő', color: '#386641', eyes: 'happy', mouth: 'bigsmile', accessory: 'beret', costume: 'apron', item: 'brush' },
  { name: '🥷 Nindzsa Rajzoló', color: '#4a5568', eyes: 'cool', mouth: 'straight', accessory: 'none', costume: 'ninja', item: 'pencil' },
  { name: '🧙‍♂️ Varázsló Skiccelő', color: '#e9c46a', eyes: 'sparkle', mouth: 'smile', accessory: 'wizard_hat', costume: 'none', item: 'wand' },
  { name: '🦸‍♂️ Szuperhős Művész', color: '#c86d3b', eyes: 'star', mouth: 'bigsmile', accessory: 'crown', costume: 'cape', item: 'pencil' },
  { name: '👨‍🚀 Űrhajós Skiccelő', color: '#d4a373', eyes: 'cute', mouth: 'open', accessory: 'headphones', costume: 'spacesuit', item: 'spray' },
  { name: '🐰 Tapsi Nyuszi', color: '#e76f51', eyes: 'heart', mouth: 'tongue', accessory: 'bunny_ears', costume: 'none', item: 'brush' },
];

export function getRandomAvatar() {
  return {
    color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    eyes: EYES_STYLES[Math.floor(Math.random() * EYES_STYLES.length)],
    mouth: MOUTH_STYLES[Math.floor(Math.random() * MOUTH_STYLES.length)],
    accessory: ACCESSORY_STYLES[Math.floor(Math.random() * ACCESSORY_STYLES.length)],
    costume: COSTUME_STYLES[Math.floor(Math.random() * COSTUME_STYLES.length)],
    item: ITEM_STYLES[Math.floor(Math.random() * ITEM_STYLES.length)],
  };
}

export function AvatarRenderer({ avatar, size = 80, className = '' }) {
  const {
    color = '#386641',
    eyes = 'happy',
    mouth = 'smile',
    accessory = 'none',
    costume = 'apron',
    item = 'brush',
  } = avatar || {};

  const renderEyes = () => {
    switch (eyes) {
      case 'cool':
        return <path d="M30 45h16M54 45h16" stroke="#fff" strokeWidth="6" strokeLinecap="round" />;
      case 'surprised':
        return (
          <>
            <circle cx="36" cy="42" r="7" fill="#fff" />
            <circle cx="64" cy="42" r="7" fill="#fff" />
          </>
        );
      case 'star':
        return (
          <>
            <text x="28" y="48" fill="#fff" fontSize="16" fontWeight="bold">★</text>
            <text x="56" y="48" fill="#fff" fontSize="16" fontWeight="bold">★</text>
          </>
        );
      case 'wink':
        return (
          <>
            <circle cx="36" cy="42" r="5" fill="#fff" />
            <path d="M58 44l10-4" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          </>
        );
      case 'sparkle':
        return (
          <>
            <circle cx="36" cy="42" r="6" fill="#fff" />
            <circle cx="38" cy="40" r="2" fill="#000" />
            <circle cx="64" cy="42" r="6" fill="#fff" />
            <circle cx="66" cy="40" r="2" fill="#000" />
          </>
        );
      case 'cute':
        return (
          <>
            <circle cx="36" cy="42" r="7" fill="#fff" />
            <circle cx="38" cy="40" r="3" fill="#000" />
            <circle cx="64" cy="42" r="7" fill="#fff" />
            <circle cx="66" cy="40" r="3" fill="#000" />
            <circle cx="28" cy="48" r="4" fill="#e76f51" opacity="0.6" />
            <circle cx="72" cy="48" r="4" fill="#e76f51" opacity="0.6" />
          </>
        );
      case 'sleeping':
        return (
          <>
            <path d="M30 44c4 4 10 4 12 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M58 44c4 4 10 4 12 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        );
      case 'heart':
        return (
          <>
            <text x="28" y="48" fill="#e76f51" fontSize="16" fontWeight="bold">♥</text>
            <text x="56" y="48" fill="#e76f51" fontSize="16" fontWeight="bold">♥</text>
          </>
        );
      case 'happy':
      default:
        return (
          <>
            <path d="M30 44c2-4 8-4 10 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M60 44c2-4 8-4 10 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (mouth) {
      case 'open':
        return <path d="M40 58c0 8 20 8 20 0Z" fill="#fff" />;
      case 'tongue':
        return (
          <g>
            <path d="M40 58c0 6 20 6 20 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M46 60c0 4 8 4 8 0" fill="#e76f51" />
          </g>
        );
      case 'cat':
        return <path d="M40 58c3 3 6 0 10 0c3 0 6 3 10 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case 'straight':
        return <path d="M40 60h20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />;
      case 'bigsmile':
        return <path d="M36 56c4 10 24 10 28 0" fill="#fff" stroke="#fff" strokeWidth="2" />;
      case 'whistle':
        return <circle cx="50" cy="58" r="4" fill="none" stroke="#fff" strokeWidth="3" />;
      case 'droll':
        return (
          <g>
            <path d="M40 58c4 6 20 6 20 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="58" cy="64" r="2.5" fill="#4a7c59" />
          </g>
        );
      case 'smile':
      default:
        return <path d="M40 58c4 6 20 6 20 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />;
    }
  };

  const renderCostume = () => {
    switch (costume) {
      case 'apron':
        return (
          <g fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5">
            <path d="M36 68 L64 68 L68 96 L32 96 Z" rx="4" />
            <rect x="42" y="76" width="16" height="14" rx="2" fill="#e2e8f0" />
            <circle cx="46" cy="82" r="2" fill="#c86d3b" />
            <circle cx="54" cy="84" r="2" fill="#386641" />
          </g>
        );
      case 'cape':
        return (
          <path d="M20 54 C10 80, 10 100, 24 106 L76 106 C90 100, 90 80, 80 54 Z" fill="#c86d3b" />
        );
      case 'hoodie':
        return (
          <g fill="#386641">
            <path d="M26 66 C26 96, 74 96, 74 66 Z" />
            <circle cx="44" cy="74" r="2" fill="#fff" />
            <circle cx="56" cy="74" r="2" fill="#fff" />
          </g>
        );
      case 'ninja':
        return (
          <g fill="#4a5568">
            <rect x="30" y="70" width="40" height="26" rx="4" />
            <rect x="34" y="80" width="32" height="6" fill="#c86d3b" />
          </g>
        );
      case 'tuxedo':
        return (
          <g fill="#212529">
            <path d="M30 68 L70 68 L66 98 L34 98 Z" />
            <polygon points="50,68 44,78 56,78" fill="#fff" />
            <polygon points="50,72 44,68 56,68" fill="#c86d3b" />
          </g>
        );
      case 'spacesuit':
        return (
          <g fill="#f4efe6" stroke="#e5e0d5" strokeWidth="2">
            <rect x="28" y="66" width="44" height="30" rx="8" />
            <circle cx="50" cy="80" r="6" fill="#386641" stroke="none" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  const renderItem = () => {
    switch (item) {
      case 'pencil':
        return (
          <g transform="translate(68, 55) rotate(20)">
            <rect x="0" y="0" width="10" height="34" fill="#e9c46a" rx="2" />
            <polygon points="0,34 10,34 5,44" fill="#d4a373" />
            <polygon points="3,40 7,40 5,44" fill="#212529" />
            <rect x="0" y="0" width="10" height="6" fill="#c86d3b" />
          </g>
        );
      case 'brush':
        return (
          <g transform="translate(68, 55) rotate(25)">
            <rect x="2" y="0" width="6" height="30" fill="#6b705c" rx="1" />
            <rect x="1" y="24" width="8" height="6" fill="#d4a373" />
            <path d="M1 30 C1 38, 9 38, 9 30 Z" fill="#386641" />
          </g>
        );
      case 'wand':
        return (
          <g transform="translate(68, 50) rotate(15)">
            <rect x="3" y="0" width="4" height="36" fill="#212529" rx="1" />
            <text x="-4" y="0" fill="#e9c46a" fontSize="16" fontWeight="bold">★</text>
          </g>
        );
      case 'palette':
        return (
          <g transform="translate(64, 60)">
            <ellipse cx="14" cy="14" rx="14" ry="10" fill="#d4a373" />
            <circle cx="8" cy="10" r="2.5" fill="#c86d3b" />
            <circle cx="14" cy="8" r="2.5" fill="#386641" />
            <circle cx="20" cy="12" r="2.5" fill="#e9c46a" />
          </g>
        );
      case 'spray':
        return (
          <g transform="translate(68, 58)">
            <rect x="0" y="6" width="12" height="24" fill="#c86d3b" rx="2" />
            <rect x="4" y="0" width="4" height="6" fill="#d4a373" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  const renderAccessory = () => {
    switch (accessory) {
      case 'beret':
        return (
          <g fill="#c86d3b">
            <ellipse cx="50" cy="22" rx="26" ry="8" />
            <circle cx="50" cy="14" r="3" />
          </g>
        );
      case 'crown':
        return <polygon points="30,22 36,10 50,18 64,10 70,22" fill="#e9c46a" stroke="#d4a373" strokeWidth="2" />;
      case 'glasses':
        return (
          <g stroke="#fff" strokeWidth="3" fill="rgba(255,255,255,0.2)">
            <rect x="24" y="34" width="22" height="16" rx="4" />
            <rect x="54" y="34" width="22" height="16" rx="4" />
            <line x1="46" y1="42" x2="54" y2="42" strokeWidth="3" />
          </g>
        );
      case 'headphones':
        return (
          <g fill="none" stroke="#e5e0d5" strokeWidth="5">
            <path d="M20 50 C20 18, 80 18, 80 50" />
            <rect x="14" y="40" width="10" height="20" rx="3" fill="#386641" stroke="none" />
            <rect x="76" y="40" width="10" height="20" rx="3" fill="#386641" stroke="none" />
          </g>
        );
      case 'cap':
        return (
          <g fill="#c86d3b">
            <path d="M22 28 C22 14, 78 14, 78 28 Z" />
            <path d="M15 28 h70 v4 h-70 Z" fill="#b05d2f" />
          </g>
        );
      case 'bunny_ears':
        return (
          <g fill="#e76f51" stroke="#c86d3b" strokeWidth="2">
            <ellipse cx="36" cy="14" rx="6" ry="16" />
            <ellipse cx="36" cy="14" rx="3" ry="10" fill="#f4efe6" />
            <ellipse cx="64" cy="14" rx="6" ry="16" />
            <ellipse cx="64" cy="14" rx="3" ry="10" fill="#f4efe6" />
          </g>
        );
      case 'wizard_hat':
        return (
          <g fill="#386641" stroke="#2c5234" strokeWidth="2">
            <polygon points="50,2 30,24 70,24" />
            <ellipse cx="50" cy="24" rx="28" ry="4" fill="#2c5234" />
            <text x="46" y="16" fill="#e9c46a" fontSize="10">★</text>
          </g>
        );
      case 'party_hat':
        return (
          <g fill="#e9c46a">
            <polygon points="50,4 34,24 66,24" />
            <circle cx="50" cy="4" r="4" fill="#c86d3b" />
          </g>
        );
      case 'cat_ears':
        return (
          <g fill="#6b705c" stroke="#4a5568" strokeWidth="2">
            <polygon points="24,26 30,10 42,24" />
            <polygon points="76,26 70,10 58,24" />
          </g>
        );
      case 'flower':
        return (
          <g fill="#e76f51">
            <circle cx="74" cy="20" r="5" />
            <circle cx="70" cy="16" r="4" fill="#e9c46a" />
          </g>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 115"
      className={`overflow-visible transition-transform duration-200 hover:scale-105 ${className}`}
    >
      {/* Superhero Cape Background */}
      {costume === 'cape' && renderCostume()}

      {/* Main Body Blob */}
      <rect x="22" y="24" width="56" height="74" rx="28" fill={color} />

      {/* Feet */}
      <ellipse cx="36" cy="100" rx="10" ry="6" fill="#212529" opacity="0.8" />
      <ellipse cx="64" cy="100" rx="10" ry="6" fill="#212529" opacity="0.8" />

      {/* Costume Overlay */}
      {costume !== 'cape' && renderCostume()}

      {/* Hands */}
      <circle cx="20" cy="65" r="7" fill={color} />
      <circle cx="80" cy="65" r="7" fill={color} />

      {/* Handheld Tool */}
      {renderItem()}

      {/* Face (Eyes & Mouth) */}
      {renderEyes()}
      {renderMouth()}

      {/* Hat / Head Accessory */}
      {renderAccessory()}
    </svg>
  );
}
