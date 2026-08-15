// Comprehensive Family-Friendly Profanity and Obscenity Filter (100+ Explicit Terms in HU, EN, DE)

export const FORBIDDEN_PATTERNS = [
  // 1. Hungarian explicit profane terms & roots (30+)
  "basz", "fasz", "geci", "kurva", "picsa", "szar", "pina", "segg", "buzi", "dögöl",
  "anyád", "szopj", "szopd", "szopas", "szopom", "szopik", "pisa", "pisal", "kaki", "kakil",
  "szarházi", "gecifej", "faszfej", "seggfej", "kurvaanyád", "faszkalap", "faszszopo", "segglyuk", "buzerans", "ciganyoz",

  // 2. English explicit profane terms & roots (30+)
  "fuck", "shit", "bitch", "cunt", "dick", "pussy", "asshole", "bastard", "nigger", "faggot",
  "whore", "slut", "cock", "penis", "vagina", "motherfucker", "bullshit", "dipshit", "jackass", "dumbass",
  "prick", "twat", "wanker", "blowjob", "handjob", "boobs", "porn", "sex",

  // 3. German explicit profane terms & roots (50+)
  "scheiss", "scheisse", "ficken", "fick", "arschloch", "arsch", "fotze", "wichser", "wichse", "hurensohn",
  "hure", "schlampe", "pimmel", "schwanz", "mutterficker", "miststuck", "kacke", "kacken", "pisse", "pissen",
  "arschgesicht", "spast", "spasti", "penner", "depp", "vollidiot", "schwanzlutscher", "fotzenlecker", "verfickt", "kackhaufen",
  "arschgeige", "hosenscheisser", "schweinehund", "hurenbock", "drecksack", "dreckskerl", "scheisskerl", "sauhund", "mistfink", "dummkopf",
  "flachpfeife", "pissnelke", "kackspast", "wichslappen", "fickdich", "fotzkopf", "arse", "arsschloch", "scheisser"
];

export function isProfane(text) {
  if (!text) return false;
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return FORBIDDEN_PATTERNS.some(pattern => normalized.includes(pattern));
}

export function cleanText(text) {
  if (!text) return text;
  let cleaned = text;
  FORBIDDEN_PATTERNS.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi');
    cleaned = cleaned.replace(regex, '***');
  });
  return cleaned;
}

export function filterCustomWords(wordsArray = []) {
  if (!Array.isArray(wordsArray)) return { validWords: [], rejectedCount: 0 };

  const validWords = [];
  let rejectedCount = 0;

  wordsArray.forEach(word => {
    if (isProfane(word)) {
      rejectedCount++;
    } else {
      validWords.push(word);
    }
  });

  return { validWords, rejectedCount };
}
