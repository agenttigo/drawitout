// Huge English Word Database (2500+ Words)

const baseGeneral = [
  "apple", "car", "house", "tree", "sun", "moon", "star", "cat", "dog", "table",
  "chair", "book", "pen", "phone", "clock", "key", "lamp", "door", "window", "shoe",
  "tshirt", "sunglasses", "hat", "pizza", "icecream", "cake", "coffee", "cup", "plate",
  "waterfall", "volcano", "rainbow", "airplane", "submarine", "rocket", "windmill", "lighthouse",
  "castle", "pyramid", "ferry", "helicopter", "hot air balloon", "wind turbine", "fountain", "bridge", "tunnel", "railway",
  "space station", "bicycle", "scooter", "skateboard", "bag", "backpack", "wallet", "glasses", "ring", "necklace",
  "watch", "comb", "mirror", "soap", "toothbrush", "towel", "pillow", "blanket", "bed", "wardrobe",
  "carpet", "curtain", "picture frame", "vase", "bouquet", "candle", "match", "lighter", "ashtray", "umbrella",
  "gloves", "scarf", "coat", "pants", "skirt", "clothespin", "iron", "vacuum cleaner", "washing machine", "refrigerator",
  "microwave", "toaster", "blender", "coffee maker", "kettle", "pot", "pan", "ladle", "cutting board",
  "grater", "corkscrew", "bottle opener", "can opener", "scissors", "glue", "ruler", "eraser", "sharpener", "notebook",
  "folder", "stapler", "paperclip", "envelope", "stamp", "calendar", "calculator", "bin", "broom",
  "mop", "bucket", "sponge", "tweezers", "hammer", "nail", "screw", "screwdriver", "saw", "pliers",
  "drill", "brush", "ladder", "wheelbarrow", "shovel", "rake", "hoe", "watering can", "lawnmower", "fence"
];

const baseTech = [
  "robot", "laptop", "smartphone", "keyboard", "mouse", "server", "artificial intelligence",
  "wifi", "headphones", "microphone", "monitor", "usb drive", "webcam", "drone", "vr headset",
  "graphics card", "processor", "motherboard", "hard drive", "power supply", "printer", "scanner", "projector",
  "speaker", "router", "modem", "fiber optics", "satellite", "telescope", "microscope", "laser", "battery",
  "charger", "power bank", "smartwatch", "earbuds", "console", "joystick", "gamepad", "steering wheel", "pedal",
  "software", "application", "browser", "firewall", "antivirus", "database", "cloud", "algorithm", "code",
  "cybercriminal", "hacker", "password", "encryption", "pixel", "resolution", "touchscreen", "biometrics",
  "supercomputer", "quantum computer", "3d printer", "simulator", "hologram", "cyberpunk", "nanobot"
];

const baseMovies = [
  "star wars", "harry potter", "avengers", "titanic", "shrek", "matrix", "spider man", "batman",
  "joker", "pikachu", "spongebob", "minecraft", "superman", "pirate", "astronaut", "dinosaur",
  "vampire", "zombie", "ghost", "wizard", "superhero", "ninja", "dragon", "gargoyle", "mummy",
  "frankenstein", "dracula", "minion", "dumbo", "bambi", "pinocchio", "cinderella", "snow white",
  "sleeping beauty", "ariel", "aladdin", "hercules", "mulan", "pocahontas", "tarzan", "nemo", "dory",
  "donkey", "puss in boots", "minions", "gru", "lightning mcqueen", "wall-e", "ratatouille",
  "kung fu panda", "madagascar", "ice age", "dark knight", "inception", "interstellar", "gladiator"
];

const baseFood = [
  "pancake", "hamburger", "french fries", "sandwich", "grapes", "watermelon", "strawberry",
  "banana", "orange", "lemon", "chocolate", "popcorn", "sushi", "donut", "muffin", "hotdog",
  "cookie", "spaghetti", "taco", "croissant", "stew", "fish soup", "stuffed cabbage",
  "sponge cake", "strudel", "biscuit", "pie", "waffle", "brownie", "cheesecake", "cupcake",
  "noodle", "ramen", "soup", "bread", "cheese", "butter", "milk", "juice", "tea", "coffee"
];

const baseAnimals = [
  "elephant", "giraffe", "lion", "tiger", "penguin", "dolphin", "shark", "octopus", "snake", "frog",
  "whale", "eagle", "owl", "rooster", "cow", "horse", "rabbit", "squirrel", "hedgehog", "butterfly", "ladybug",
  "bee", "wasp", "ant", "mosquito", "fly", "spider", "scorpion", "crocodile", "alligator", "turtle",
  "lizard", "chameleon", "iguana", "salamander", "fish", "goldfish", "salmon", "trout", "tuna", "catfish",
  "pike", "carp", "eel", "manta", "stingray", "starfish", "sea urchin", "clam",
  "oyster", "lobster", "crab", "shrimp", "squid", "jellyfish", "coral", "walrus", "seal", "penguin"
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

const enPrefixes = [
  "red", "blue", "green", "yellow", "big", "small", "flying", "magic", "giant", "cute",
  "fast", "slow", "old", "new", "colorful", "shiny", "golden", "silver", "super", "secret",
  "forest", "sea", "sky", "night", "royal", "ice", "fire", "plastic", "wooden", "metal"
];

export const englishWordCategories = {
  general: generateExpandedList(baseGeneral, enPrefixes),
  tech: generateExpandedList(baseTech, enPrefixes.slice(0, 10)),
  movies: generateExpandedList(baseMovies, enPrefixes.slice(0, 10)),
  food: generateExpandedList(baseFood, enPrefixes.slice(0, 10)),
  animals: generateExpandedList(baseAnimals, enPrefixes)
};

export const englishWords = Array.from(new Set([
  ...englishWordCategories.general,
  ...englishWordCategories.tech,
  ...englishWordCategories.movies,
  ...englishWordCategories.food,
  ...englishWordCategories.animals
]));
