export const BADGES = {
  SPEEDY: { id: 'speedy', icon: '⚡', key_title: 'badge_speedy_title', key_desc: 'badge_speedy_desc' },
  PICASSO: { id: 'picasso', icon: '🎨', key_title: 'badge_picasso_title', key_desc: 'badge_picasso_desc' },
  GENIUS: { id: 'genius', icon: '🌟', key_title: 'badge_genius_title', key_desc: 'badge_genius_desc' },
  POLYGLOT: { id: 'polyglot', icon: '🌍', key_title: 'badge_polyglot_title', key_desc: 'badge_polyglot_desc' },
  HERO: { id: 'hero', icon: '🛡️', key_title: 'badge_hero_title', key_desc: 'badge_hero_desc' },
};

export function getUnlockedBadges() {
  try {
    const saved = localStorage.getItem('drawitout_badges');
    return saved ? JSON.parse(saved) : ['hero'];
  } catch (e) {
    return ['hero'];
  }
}

export function unlockBadge(badgeId) {
  try {
    const current = getUnlockedBadges();
    if (!current.includes(badgeId)) {
      const updated = [...current, badgeId];
      localStorage.setItem('drawitout_badges', JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (e) {
    return [];
  }
}
