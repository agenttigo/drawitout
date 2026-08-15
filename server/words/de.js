// Huge German Word Database (2500+ Words)

const baseGeneral = [
  "apfel", "auto", "haus", "baum", "sonne", "mond", "stern", "katze", "hund", "tisch",
  "stuhl", "buch", "stift", "telefon", "uhr", "schlüssel", "lampe", "tür", "fenster", "schuh",
  "tshirt", "sonnenbrille", "hut", "käse", "pizza", "eis", "kuchen", "kaffee", "tasse", "teller",
  "wasserfall", "vulkan", "regenbogen", "flugzeug", "u-boot", "rakete", "windmühle", "leuchtturm",
  "schloss", "pyramide", "fähre", "hubschrauber", "heißluftballon", "windrad", "brunnen", "brücke", "tunnel", "eisenbahn",
  "raumstation", "fahrrad", "roller", "skateboard", "tasche", "rucksack", "geldbörse", "brille", "ring", "halskette",
  "armbanduhr", "kamm", "spiegel", "seife", "zahnbürste", "handtuch", "kissen", "decke", "bett", "kleiderschrank",
  "teppich", "vorhang", "bilderrahmen", "vase", "blumenstrauß", "kerze", "streichholz", "feuerzeug", "aschenbecher", "regenschirm",
  "handschuhe", "schal", "mantel", "hose", "rock", "wäscheklammer", "bÜgeleisen", "staubsauger", "waschmaschine", "kühlschrank",
  "mikrowelle", "toaster", "mixer", "kaffeemaschine", "wasserkocher", "topf", "pfanne", "schöpflöffel", "schneidebrett",
  "reibe", "korkenzieher", "flaschenöffner", "dosenöffner", "schere", "kleber", "lineal", "radiergummi", "anspitzer", "heft",
  "ordner", "hefter", "büroklammer", "umschlag", "briefmarke", "kalender", "taschenrechner", "papierkorb", "besen",
  "wischmop", "eimer", "schwamm", "pinzette", "hammer", "nagel", "schraube", "schraubenzieher", "säge", "zange",
  "bohrer", "bürste", "leiter", "schubkarre", "schaufel", "harke", "hacke", "gießkanne", "rasenmäher", "zaun"
];

const baseTech = [
  "roboter", "laptop", "smartphone", "tastatur", "maus", "server", "künstliche intelligenz",
  "wlan", "kopfhörer", "mikrofon", "monitor", "usb-stick", "webcam", "drohne", "vr-brille",
  "grafikkarte", "prozessor", "mainboard", "festplatte", "netzteil", "drucker", "scanner", "beamer",
  "lautsprecher", "router", "modem", "glasfaser", "satellit", "teleskop", "mikroskop", "laser", "akku",
  "ladegerät", "powerbank", "smartwatch", "ohrhörer", "konsole", "joystick", "gamepad", "lenkrad", "pedal",
  "software", "anwendung", "browser", "firewall", "antivirus", "datenbank", "cloud", "algorithmus", "code",
  "hacker", "passwort", "verschlüsselung", "pixel", "auflösung", "touchscreen", "biometrie",
  "supercomputer", "quantencomputer", "3d-drucker", "simulator", "hologramm", "nanobot"
];

const baseMovies = [
  "star wars", "harry potter", "avengers", "titanic", "shrek", "matrix", "spiderman", "batman",
  "joker", "pikachu", "spongebob", "minecraft", "superman", "pirat", "astronaut", "dinosaurier",
  "vampir", "zombie", "geist", "zauberer", "superheld", "ninja", "drache", "gargoyle", "mumie",
  "frankenstein", "dracula", "minion", "dumbo", "bambi", "pinocchio", "aschenputtel", "schneewittchen",
  "dornröschen", "arielle", "aladdin", "herkules", "mulan", "pocahontas", "tarzan", "nemo", "dory",
  "esel", "der gestiefelte kater", "minions", "gru", "lightning mcqueen", "wall-e", "ratatouille",
  "kung fu panda", "madagaskar", "eiszeit", "inception", "interstellar", "gladiator"
];

const baseFood = [
  "pfannkuchen", "hamburger", "pommes frites", "sandwich", "trauben", "wassermelone", "erdbeere",
  "banane", "orange", "zitrone", "schokolade", "popcorn", "sushi", "donut", "muffin", "hotdog",
  "keks", "spaghetti", "taco", "croissant", "eintopf", "fischsuppe", "kohlroulade",
  "strudel", "waffel", "brownie", "käsekuchen", "cupcake", "nudeln", "ramen", "suppe", "brot",
  "käse", "butter", "milch", "saft", "tee", "kaffee", "schnitzel", "wurst", "brezel"
];

const baseAnimals = [
  "elefant", "giraffe", "löwe", "tiger", "pinguin", "delfin", "hai", "krake", "schlange", "frosch",
  "wal", "adler", "eule", "hahn", "kuh", "pferd", "hase", "einhörnchen", "igel", "schmetterling", "marienkäfer",
  "biene", "wespe", "ameise", "mücke", "fliege", "spinne", "skorpion", "krokodil", "alligator", "schildkröte",
  "eidechse", "chamäleon", "leguan", "salamander", "fisch", "goldfisch", "lachs", "forelle", "thunfisch", "wels",
  "hecht", "karpfen", "aal", "rochen", "seestern", "seeigel", "muschel",
  "austern", "hummer", "krabbe", "garnele", "tintenfisch", "qualle", "koralle", "walross", "robbe"
];

function generateExpandedList(baseList, prefixes) {
  const result = new Set([...baseList]);
  baseList.forEach(item => {
    prefixes.forEach(prefix => {
      result.add(`${prefix} ${item}`);
    });
  });
  return Array.from(result);
}

const dePrefixes = [
  "roter", "blauer", "grüner", "gelber", "großer", "kleiner", "fliegender", "magischer", "riesiger", "süßer",
  "schneller", "langsamer", "alter", "neuer", "bunter", "glänzender", "goldener", "silberner", "super", "geheimer",
  "wald", "see", "himmel", "nacht", "königs", "eis", "feuer", "plastik", "holz", "metall"
];

export const germanWordCategories = {
  general: generateExpandedList(baseGeneral, dePrefixes),
  tech: generateExpandedList(baseTech, dePrefixes.slice(0, 10)),
  movies: generateExpandedList(baseMovies, dePrefixes.slice(0, 10)),
  food: generateExpandedList(baseFood, dePrefixes.slice(0, 10)),
  animals: generateExpandedList(baseAnimals, dePrefixes)
};

export const germanWords = Array.from(new Set([
  ...germanWordCategories.general,
  ...germanWordCategories.tech,
  ...germanWordCategories.movies,
  ...germanWordCategories.food,
  ...germanWordCategories.animals
]));
