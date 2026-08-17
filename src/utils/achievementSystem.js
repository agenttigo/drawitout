// Comprehensive 54+ Badges & Achievement Progression System

export const BADGES = {
  // --- 1. MASTERY & WINS (PRO PLAYERS) ---
  HERO: { id: 'hero', icon: '🛡️', key_title: 'badge_hero_title', key_desc: 'badge_hero_desc', category: 'mastery' },
  VICTOR_1: { id: 'victor_1', icon: '🥇', key_title: 'badge_victor_1_title', key_desc: 'badge_victor_1_desc', category: 'mastery' },
  VICTOR_5: { id: 'victor_5', icon: '⚔️', key_title: 'badge_victor_5_title', key_desc: 'badge_victor_5_desc', category: 'mastery' },
  VICTOR_10: { id: 'victor_10', icon: '🎖️', key_title: 'badge_victor_10_title', key_desc: 'badge_victor_10_desc', category: 'mastery' },
  VICTOR_25: { id: 'victor_25', icon: '🏅', key_title: 'badge_victor_25_title', key_desc: 'badge_victor_25_desc', category: 'mastery' },
  CHAMPION_50: { id: 'champion_50', icon: '🏆', key_title: 'badge_champion_50_title', key_desc: 'badge_champion_50_desc', category: 'mastery' },
  GRANDMASTER: { id: 'grandmaster', icon: '👑', key_title: 'badge_grandmaster_title', key_desc: 'badge_grandmaster_desc', category: 'mastery' },
  SCORE_1000: { id: 'score_1000', icon: '💎', key_title: 'badge_score_1000_title', key_desc: 'badge_score_1000_desc', category: 'mastery' },
  SCORE_5000: { id: 'score_5000', icon: '💰', key_title: 'badge_score_5000_title', key_desc: 'badge_score_5000_desc', category: 'mastery' },
  SCORE_10000: { id: 'score_10000', icon: '🌟', key_title: 'badge_score_10000_title', key_desc: 'badge_score_10000_desc', category: 'mastery' },

  // --- 2. SPEED & PRECISION ---
  SPEEDY: { id: 'speedy', icon: '⚡', key_title: 'badge_speedy_title', key_desc: 'badge_speedy_desc', category: 'speed' },
  SONIC_3S: { id: 'sonic_3s', icon: '🚀', key_title: 'badge_sonic_3s_title', key_desc: 'badge_sonic_3s_desc', category: 'speed' },
  FIRST_GUESSER: { id: 'first_guesser', icon: '🎯', key_title: 'badge_first_guesser_title', key_desc: 'badge_first_guesser_desc', category: 'speed' },
  STREAK_3: { id: 'streak_3', icon: '🔥', key_title: 'badge_streak_3_title', key_desc: 'badge_streak_3_desc', category: 'speed' },
  STREAK_5: { id: 'streak_5', icon: '⚡', key_title: 'badge_streak_5_title', key_desc: 'badge_streak_5_desc', category: 'speed' },
  STREAK_7: { id: 'streak_7', icon: '🌋', key_title: 'badge_streak_7_title', key_desc: 'badge_streak_7_desc', category: 'speed' },
  STREAK_10: { id: 'streak_10', icon: '✨', key_title: 'badge_streak_10_title', key_desc: 'badge_streak_10_desc', category: 'speed' },
  SPEED_DRAW: { id: 'speed_draw', icon: '⏱️', key_title: 'badge_speed_draw_title', key_desc: 'badge_speed_draw_desc', category: 'speed' },

  // --- 3. LOYALTY & RETURNING PLAYERS ---
  DAILY_STREAK_2: { id: 'daily_streak_2', icon: '🌱', key_title: 'badge_daily_streak_2_title', key_desc: 'badge_daily_streak_2_desc', category: 'loyalty' },
  LOYAL_DAILY: { id: 'loyal_daily', icon: '💎', key_title: 'badge_loyal_daily_title', key_desc: 'badge_loyal_daily_desc', category: 'loyalty' },
  DAILY_STREAK_7: { id: 'daily_streak_7', icon: '📅', key_title: 'badge_daily_streak_7_title', key_desc: 'badge_daily_streak_7_desc', category: 'loyalty' },
  DAILY_STREAK_14: { id: 'daily_streak_14', icon: '🔥', key_title: 'badge_daily_streak_14_title', key_desc: 'badge_daily_streak_14_desc', category: 'loyalty' },
  DAILY_STREAK_30: { id: 'daily_streak_30', icon: '👑', key_title: 'badge_daily_streak_30_title', key_desc: 'badge_daily_streak_30_desc', category: 'loyalty' },
  GAMES_10: { id: 'games_10', icon: '🎮', key_title: 'badge_games_10_title', key_desc: 'badge_games_10_desc', category: 'loyalty' },
  VETERAN_10: { id: 'veteran_10', icon: '🎖️', key_title: 'badge_veteran_10_title', key_desc: 'badge_veteran_10_desc', category: 'loyalty' },
  CENTURION: { id: 'centurion', icon: '💯', key_title: 'badge_centurion_title', key_desc: 'badge_centurion_desc', category: 'loyalty' },
  GAMES_250: { id: 'games_250', icon: '🌌', key_title: 'badge_games_250_title', key_desc: 'badge_games_250_desc', category: 'loyalty' },

  // --- 4. PERSEVERANCE & DEDICATION (FOR THOSE WHO DON'T WIN OFTEN BUT NEVER GIVE UP) ---
  NEVER_GIVE_UP: { id: 'never_give_up', icon: '🧗', key_title: 'badge_never_give_up_title', key_desc: 'badge_never_give_up_desc', category: 'perseverance' },
  LAST_SECOND_HERO: { id: 'last_second_hero', icon: '⏳', key_title: 'badge_last_second_title', key_desc: 'badge_last_second_desc', category: 'perseverance' },
  PERSEVERANCE: { id: 'perseverance', icon: '🛡️', key_title: 'badge_perseverance_title', key_desc: 'badge_perseverance_desc', category: 'perseverance' },
  TRY_AGAIN: { id: 'try_again', icon: '🔄', key_title: 'badge_try_again_title', key_desc: 'badge_try_again_desc', category: 'perseverance' },
  DILIGENT_GUESSER: { id: 'diligent_guesser', icon: '📝', key_title: 'badge_diligent_title', key_desc: 'badge_diligent_desc', category: 'perseverance' },
  FAITHFUL_COMPANION: { id: 'faithful_companion', icon: '🤝', key_title: 'badge_faithful_title', key_desc: 'badge_faithful_desc', category: 'perseverance' },
  PRACTICE_MAKES_PERFECT: { id: 'practice_makes_perfect', icon: '🎯', key_title: 'badge_practice_10_title', key_desc: 'badge_practice_10_desc', category: 'perseverance' },
  SANDBOX_50: { id: 'sandbox_50', icon: '📚', key_title: 'badge_practice_50_title', key_desc: 'badge_practice_50_desc', category: 'perseverance' },

  // --- 5. ARTISTIC & DRAWING EXCELLENCE ---
  PICASSO: { id: 'picasso', icon: '🎨', key_title: 'badge_picasso_title', key_desc: 'badge_picasso_desc', category: 'drawing' },
  GENIUS: { id: 'genius', icon: '🌟', key_title: 'badge_genius_title', key_desc: 'badge_genius_desc', category: 'drawing' },
  BLIND_MASTER: { id: 'blind_master', icon: '🙈', key_title: 'badge_blind_master_title', key_desc: 'badge_blind_master_desc', category: 'drawing' },
  ONE_STROKE_MASTER: { id: 'one_stroke_master', icon: '✏️', key_title: 'badge_one_stroke_title', key_desc: 'badge_one_stroke_desc', category: 'drawing' },
  RAINBOW_ARTIST: { id: 'rainbow_artist', icon: '🌈', key_title: 'badge_rainbow_title', key_desc: 'badge_rainbow_desc', category: 'drawing' },
  CLEAN_SLATE: { id: 'clean_slate', icon: '🧹', key_title: 'badge_clean_slate_title', key_desc: 'badge_clean_slate_desc', category: 'drawing' },
  DETAIL_ORIENTED: { id: 'detail_oriented', icon: '🔍', key_title: 'badge_detail_oriented_title', key_desc: 'badge_detail_oriented_desc', category: 'drawing' },

  // --- 6. CREATIVE STUDIO PRO ---
  STUDIO_PRO: { id: 'studio_pro', icon: '🖌️', key_title: 'badge_studio_pro_title', key_desc: 'badge_studio_pro_desc', category: 'studio' },
  LAYER_KING: { id: 'layer_king', icon: '📑', key_title: 'badge_layer_king_title', key_desc: 'badge_layer_king_desc', category: 'studio' },
  TIMELAPSE_DIRECTOR: { id: 'timelapse_director', icon: '🎬', key_title: 'badge_timelapse_title', key_desc: 'badge_timelapse_desc', category: 'studio' },
  SKETCH_ARTIST: { id: 'sketch_artist', icon: '✏️', key_title: 'badge_sketch_artist_title', key_desc: 'badge_sketch_artist_desc', category: 'studio' },

  // --- 7. SOCIAL, TIME & EASTER EGGS ---
  HOST_SUPREME: { id: 'host_supreme', icon: '🏰', key_title: 'badge_host_title', key_desc: 'badge_host_desc', category: 'social' },
  SOCIAL_BUTTERFLY: { id: 'social_butterfly', icon: '💬', key_title: 'badge_social_title', key_desc: 'badge_social_desc', category: 'social' },
  REACTION_KING: { id: 'reaction_king', icon: '🤩', key_title: 'badge_reaction_title', key_desc: 'badge_reaction_desc', category: 'social' },
  POLYGLOT: { id: 'polyglot', icon: '🌍', key_title: 'badge_polyglot_title', key_desc: 'badge_polyglot_desc', category: 'social' },
  NIGHT_OWL: { id: 'night_owl', icon: '🦉', key_title: 'badge_night_owl_title', key_desc: 'badge_night_owl_desc', category: 'social' },
  EARLY_BIRD: { id: 'early_bird', icon: '🌅', key_title: 'badge_early_bird_title', key_desc: 'badge_early_bird_desc', category: 'social' },
  DARK_LAMP_EGG: { id: 'dark_lamp_egg', icon: '💡', key_title: 'badge_dark_lamp_title', key_desc: 'badge_dark_lamp_desc', category: 'social' },
  SUNRISE_EGG: { id: 'sunrise_egg', icon: '☀️', key_title: 'badge_sunrise_title', key_desc: 'badge_sunrise_desc', category: 'social' },
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

// User Stats Tracking Engine for Lifetime Progression
export function getUserStats() {
  try {
    const saved = localStorage.getItem('drawitout_user_stats');
    return saved
      ? JSON.parse(saved)
      : {
          gamesPlayed: 0,
          gamesWon: 0,
          wordsGuessed: 0,
          totalScore: 0,
          streak: 0,
          maxStreak: 0,
          sandboxWordsPracticed: 0,
          studioSaves: 0,
          timelapsesExported: 0,
          dailyStreak: 1,
          lastLoginDate: new Date().toDateString(),
          languagesUsed: ['hu'],
          lossesWithoutQuitting: 0,
          totalGuessesMade: 0,
          reactionsSent: 0,
        };
  } catch {
    return {};
  }
}

export function saveUserStats(stats) {
  try {
    localStorage.setItem('drawitout_user_stats', JSON.stringify(stats));
  } catch (_) {}
}

export function recordGameResult({ won, score = 0, placedOnPodium = false }) {
  const stats = getUserStats();
  stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
  stats.totalScore = (stats.totalScore || 0) + score;

  if (won) {
    stats.gamesWon = (stats.gamesWon || 0) + 1;
    stats.lossesWithoutQuitting = 0;
  } else {
    stats.lossesWithoutQuitting = (stats.lossesWithoutQuitting || 0) + 1;
    unlockBadge('never_give_up');
    if (stats.lossesWithoutQuitting >= 5) {
      unlockBadge('perseverance');
    }
  }

  // Check Game Wins
  if (stats.gamesWon >= 1) unlockBadge('victor_1');
  if (stats.gamesWon >= 5) unlockBadge('victor_5');
  if (stats.gamesWon >= 10) unlockBadge('victor_10');
  if (stats.gamesWon >= 25) unlockBadge('victor_25');
  if (stats.gamesWon >= 50) unlockBadge('champion_50');
  if (stats.gamesWon >= 100) unlockBadge('grandmaster');

  // Check Games Played
  if (stats.gamesPlayed >= 10) unlockBadge('games_10');
  if (stats.gamesPlayed >= 25) unlockBadge('veteran_10');
  if (stats.gamesPlayed >= 100) unlockBadge('centurion');
  if (stats.gamesPlayed >= 250) unlockBadge('games_250');

  // Check Lifetime Score
  if (stats.totalScore >= 1000) unlockBadge('score_1000');
  if (stats.totalScore >= 5000) unlockBadge('score_5000');
  if (stats.totalScore >= 10000) unlockBadge('score_10000');

  saveUserStats(stats);
}

export function recordPracticeWord() {
  const stats = getUserStats();
  stats.sandboxWordsPracticed = (stats.sandboxWordsPracticed || 0) + 1;
  if (stats.sandboxWordsPracticed >= 10) unlockBadge('practice_makes_perfect');
  if (stats.sandboxWordsPracticed >= 50) unlockBadge('sandbox_50');
  saveUserStats(stats);
}

export function checkDailyAndHourlyBadges() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) {
    unlockBadge('night_owl');
  } else if (hour >= 6 && hour < 9) {
    unlockBadge('early_bird');
  }

  const stats = getUserStats();
  const today = new Date().toDateString();
  if (stats.lastLoginDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (stats.lastLoginDate === yesterday) {
      stats.dailyStreak = (stats.dailyStreak || 1) + 1;
      if (stats.dailyStreak >= 2) unlockBadge('daily_streak_2');
      if (stats.dailyStreak >= 3) unlockBadge('loyal_daily');
      if (stats.dailyStreak >= 7) unlockBadge('daily_streak_7');
      if (stats.dailyStreak >= 14) unlockBadge('daily_streak_14');
      if (stats.dailyStreak >= 30) unlockBadge('daily_streak_30');
    } else {
      stats.dailyStreak = 1;
    }
    stats.lastLoginDate = today;
    saveUserStats(stats);
  }
}
