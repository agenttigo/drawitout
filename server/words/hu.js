// Huge Hungarian Word Database (2500+ Words)

const baseGeneral = [
  "alma", "autó", "ház", "fa", "nap", "hold", "csillag", "macska", "kutya", "asztal",
  "szék", "könyv", "toll", "telefon", "óra", "kulcs", "lámpa", "ajtó", "ablak", "cipő",
  "póló", "napszemüveg", "kalap", "sajt", "pizza", "fagylalt", "tortafény", "kávé", "csésze", "tányér",
  "vízesés", "vulkán", "szivárvány", "repülőgép", "tengeralattjáró", "rakéta", "szélmalom", "világítótorony",
  "kastély", "piramis", "komp", "helikopter", "hőlégballon", "szélturbina", "szökökút", "híd", "alagút", "vasút",
  "űrállomás", "kerékpár", "roller", "gördeszka", "táska", "hátizsák", "pénztárca", "szemüveg", "gyűrű", "nyaklánc",
  "karóra", "fésű", "tükör", "szappan", "fogkefe", "törölköző", "párna", "takaró", "ágy", "szekrény",
  "szőnyeg", "függöny", "képkeret", "váza", "virágcsokor", "gyertya", "gyufa", "öngyújtó", "hamutartó", "esernyő",
  "kesztyű", "sál", "kabát", "nadrág", "szoknya", "ruhacsipesz", "vasaló", "porszívó", "mosógép", "hűtőszekrény",
  "mikrohullámú sütő", "kenyérpirító", "turmixgép", "kávéfőző", "vízforraló", "fazék", "serpenyő", "merőkanál", "vágódeszka",
  "reszelő", "dugóhúzó", "sörnyitó", "konzervnyitó", "olló", "ragasztó", "vonalzó", "radír", "hegyező", "füzet",
  "mappa", "tűzőgép", "gémkapocs", "boríték", "bélyeg", "naptár", "számológép", "irattartó", "szemetes", "seprű",
  "felmosó", "vödör", "szivacs", "csipesz", "kalapács", "szög", "csavar", "csavarhúzó", "fűrész", "fogó",
  "fúró", "kefe", "létra", "talicska", "ásó", "gereblye", "kapa", "locsolókanna", "fűnyíró", "kerítés"
];

const baseTech = [
  "robot", "laptop", "okostelefon", "billentyűzet", "egér", "szerver", "mesterséges intelligencia",
  "wifi", "fejhallgató", "mikrofon", "monitor", "pendrive", "webkamera", "drón", "virtuális szemüveg",
  "videókártya", "processzor", "alaplap", "merevlemez", "tápegység", "nyomtató", "szkenner", "projektor",
  "hangszóró", "router", "modem", "száloptika", "műhold", "teleszkóp", "mikroszkóp", "lézer", "akkumulátor",
  "töltő", "powerbank", "okosóra", "fülhallgató", "konzol", "joystick", "gamepad", "kormány", "pedál",
  "szoftver", "alkalmazás", "böngésző", "tűzfal", "vírusirtó", "adatbázis", "felhő", "algoritmus", "kód",
  "kiberbűnöző", "hacker", "jelszó", "titkosítás", "pixel", "felbontás", "érintőképernyő", "biometria",
  "szuperszámítógép", "kvantumszámítógép", "3d nyomtató", "szimulátor", "hologram", "kiberpont", "nanobot"
];

const baseMovies = [
  "star wars", "harry potter", "avengers", "titanic", "shrek", "matrix", "pókember", "batman",
  "joker", "pikachu", "spongyabob", "minecraft", "superman", "kalóz", "űrhajós", "dinoszaurusz",
  "vampír", "zombi", "szellem", "varázsló", "szuperhős", "nindzsa", "sárkány", "gargoyle", "múmia",
  "frankenstein", "dracula", "kedvenc", "dumbo", "bambi", "pinokkió", "hamupipőke", "hófehérke",
  "csipkerózsika", "ariel", "aladdin", "herkules", "mulan", "pocahontas", "tarzan", "nemó", "dory",
  "shrek", "fiona", "szamár", "csizmás kandúr", "minyonok", "gru", "villám mcqueen", "wall-e", "ratatouille",
  "kung fu panda", "madagaszkár", "jégkorszak", "sötét lovag", "eredet", "csillagok között", "gladiátor"
];

const baseFood = [
  "gulyásleves", "lángos", "kürtőskalács", "palacsinta", "hamburger", "sült krumpli", "szendvics",
  "szőlő", "dinnye", "eper", "banán", "narancs", "citrom", "csokoládé", "popcorn", "sushi", "donut",
  "muffin", "hotdog", "cookie", "spagetti", "taco", "croissant", "pörkölt", "halászlé", "töltött káposzta",
  "somlói galuska", "dobostorta", "zserbó", "rétes", "beigli", "pogácsa", "briós", "kalács", "fánk",
  "túró rudi", "gesztenyepüré", "gombóc", "nokedli", "tarhonya", "húsleves", "gyümölcsleves", "bableves",
  "lencseleves", "jókai bableves", "brassói", "rántott hús", "rántott sajt", "lecsó", "paprikás krumpli"
];

const baseAnimals = [
  "elefánt", "zsiráf", "oroszlán", "tigris", "pingvin", "delfin", "cápa", "polip", "kígyó", "béka",
  "bálna", "sas", "bagoly", "kakas", "tehén", "ló", "nyúl", "mókus", "süni", "pillangó", "katicabogár",
  "méhecske", "darázs", "hangya", "szúnyog", "légy", "pók", "skorpió", "krokodil", "alligátor", "teknős",
  "gyík", "kaméleon", "iguan", "szalamandra", "hal", "aranyhal", "lazac", "pisztráng", "tonhal", "harcsa",
  "csuka", "kárász", "ponty", "angolna", "manta", "rája", "tengeri csillag", "tengeri sün", "kagyló",
  "osztriga", "homár", "rák", "garneéla", "tintahal", "kalmár", "medúza", "korall", "szivacs", "rozmár"
];

// Helper to expand list to 2500+ items using prefixes and descriptive combinations
function generateExpandedList(baseList, prefixes) {
  const result = new Set([...baseList]);
  baseList.forEach(item => {
    prefixes.forEach(prefix => {
      result.add(`${prefix} ${item}`);
    });
  });
  return Array.from(result);
}

const huPrefixes = [
  "piros", "kék", "zöld", "sárga", "nagy", "kis", "repülő", "varázslatos", "óriás", "aranyos",
  "gyors", "lassú", "régi", "új", "színes", "fényes", "arany", "ezüst", "szuper", "titkos",
  "erdei", "tengeri", "égi", "éjszakai", "királyi", "jeges", "tüzes", "műanyag", "fa", "fém"
];

export const hungarianWordCategories = {
  general: generateExpandedList(baseGeneral, huPrefixes),
  tech: generateExpandedList(baseTech, huPrefixes.slice(0, 10)),
  movies: generateExpandedList(baseMovies, huPrefixes.slice(0, 10)),
  food: generateExpandedList(baseFood, huPrefixes.slice(0, 10)),
  animals: generateExpandedList(baseAnimals, huPrefixes)
};

export const hungarianWords = Array.from(new Set([
  ...hungarianWordCategories.general,
  ...hungarianWordCategories.tech,
  ...hungarianWordCategories.movies,
  ...hungarianWordCategories.food,
  ...hungarianWordCategories.animals
]));
