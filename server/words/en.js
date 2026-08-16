// English Word Database - Clean, Rich & Real Words (No artificial compound prefixes)

const baseGeneral = [
  "Sunset", "Guitar", "Ice cream", "Airplane", "Snowman", "Castle", "Lighthouse",
  "Glasses", "Umbrella", "Sailboat", "Piano", "Cactus", "Helicopter", "Dinosaur",
  "Backpack", "Scuba diver", "Astronaut", "Microscope", "Christmas tree", "Hot air balloon", "Campfire",
  "Rainbow", "Volcano", "Waterfall", "Pyramid", "Treasure chest", "Key", "Padlock", "Skateboard",
  "Bicycle", "Motorcycle", "Telescope", "Camera", "Wristwatch", "Compass", "Globe",
  "Crown", "Diamond", "Balloon", "Parachute", "Sneakers", "Top hat", "Sunglasses", "Mittens", "Boots",
  "Soccer ball", "Tent", "Swing set", "Slide", "Mirror", "Desk lamp", "Painting", "Birthday cake", "Drums",
  "Violin", "Trumpet", "Star", "Full moon", "Sun", "Cloud", "Lightning bolt", "Snowflake",
  "Pine forest", "Cave", "Sandy beach", "Tropical island", "Suspension bridge", "Train station",
  "Windmill", "Ambulance", "Fire truck", "Police car", "Submarine", "Space rocket",
  "Royal palace", "Fishing rod", "Anchor", "Magic wand", "Gift box", "Pencil",
  "Fountain pen", "Eraser", "Ruler", "Scissors", "Book", "Postcard", "Flower pot", "Sunflower",
  "Red rose", "Tulip", "Mushroom", "Seashell", "Sandcastle", "Sled", "Ice skates",
  "Snowboard", "Skis", "Gold medal", "Trophy cup", "Flag", "Church bell",
  "Flashlight", "Fireworks", "Water well", "Piggy bank", "Gold coin", "Suitcase", "Wallet",
  "Television", "Radio", "Coffee maker", "Toaster", "Microwave oven", "Refrigerator",
  "Washing machine", "Vacuum cleaner", "Iron", "Hair dryer", "Toothbrush", "Soap bar",
  "Towel", "Pillow", "Blanket", "Curtain", "Rug", "Fireplace", "Rocking chair", "Park bench",
  "Mailbox", "Trash can", "Ladder", "Wheelbarrow", "Shovel", "Rake", "Watering can",
  "Lawn mower", "Birdhouse", "Scarecrow", "Sunbed", "Beach umbrella", "Lifebuoy",
  "Life jacket", "Surfboard", "Snorkel mask", "Flippers", "Canoe", "Kayak", "Paddle",
  // 100+ New matching entries:
  "Glasses case", "Keychain", "Snow globe", "Padlock key", "Wind chime", "Garden gnome", "Bathtub",
  "Hang glider", "Christmas bauble", "Roller skates", "Photo frame", "Fishing net", "Diving mask",
  "Umbrella stand", "Sparkler", "Coffee pot", "Sandwich maker", "Wine cork", "Nutcracker",
  "Pinecone", "Colored pencils", "Rucksack", "Sugar bowl", "Teapot", "Pancake pan",
  "Artifact", "Treasure map", "Pirate ship", "Knight armor", "Crystal ball", "Spellbook",
  "Haunted house", "Space helmet", "Flying saucer", "Board game", "Rubik's cube", "Yoyo",
  "Teddy bear", "Rubber duck", "Paddle boat", "Ski jump", "Foosball table", "Dartboard",
  "Bowling ball", "Tennis racket", "Boxing glove", "Soccer goal", "Basketball hoop", "Championship trophy",
  "Alarm clock", "Hourglass", "Wall clock", "Dustpan", "Hammock", "Garden grill",
  "Cauldron", "Camping tent", "Sleeping bag", "Pocket knife", "Water flask", "Headlamp", "Constellation",
  "Shooting star", "Northern lights", "Solar eclipse", "Weather vane", "Homing pigeon", "Birdcage", "Aquarium"
];

const baseTech = [
  "Robot", "Laptop", "Smartphone", "Keyboard", "Computer mouse", "Server rack", "Wifi router",
  "Headphones", "Microphone", "Monitor", "USB flash drive", "Webcam", "Drone",
  "VR headset", "Graphics card", "Processor", "Motherboard", "Hard drive",
  "Color printer", "Scanner", "Projector", "Bluetooth speaker", "Satellite",
  "Telescope", "Electron microscope", "Laser pointer", "Rechargeable battery", "Power bank",
  "Smartwatch", "Wireless earbuds", "Game console", "Joystick", "Steering wheel",
  "Database", "Cloud server", "Source code", "Hacker", "Password", "Pixel",
  "Touchscreen", "3D printer", "Hologram", "Supercomputer", "Fiber optic cable",
  "Solar panel", "Wind turbine", "EV charger", "Quantum computer",
  "Artificial intelligence", "Remote control", "USB cable", "HDMI port", "Memory card"
];

const baseMovies = [
  "Spider-Man", "Batman", "Superman", "Joker", "Harry Potter", "Pikachu", "SpongeBob",
  "Shrek", "Mickey Mouse", "Donald Duck", "Minions", "Gru", "Darth Vader", "Master Yoda",
  "Hulk", "Iron Man", "Thor", "Captain America", "Captain Nemo", "Simba the lion",
  "Aladdin and magic lamp", "Tarzan", "Dumbo the flying elephant", "Pinocchio", "Cinderella",
  "Snow White", "Ninja warrior", "Pirates of the Caribbean", "Wizard apprentice", "Superhero",
  "Fire breathing dragon", "Vampire", "Zombie", "Ghost", "Mummy", "Frankenstein monster",
  "T-Rex dinosaur", "Robin Hood", "Sherlock Holmes", "Count Dracula", "Captain Jack Sparrow",
  "Super Mario", "Luigi", "Sonic the Hedgehog", "Pac-Man", "Minecraft Steve", "Elsa frozen",
  "Olaf snowman", "Donkey from Shrek", "Puss in Boots", "Gandalf wizard", "Gollum",
  "Terminator cyborg", "Gladiator", "Lightning McQueen", "Wall-E robot", "Ratatouille chef"
];

const baseFood = [
  "Italian pizza", "Cheeseburger", "Pancakes with syrup", "French fries", "Ham sandwich",
  "Hot dog with mustard", "Glazed donut", "Vanilla ice cream", "Chocolate muffin", "Chocolate bar",
  "Croissant", "Spaghetti bolognese", "Mexican taco", "Burrito with salsa", "Salmon sushi roll",
  "Belgian waffle", "Apple pie", "Yellow banana", "Red apple", "Sweet orange",
  "Sour lemon", "Fresh strawberry", "Raspberry", "Watermelon slice", "Honey melon",
  "Bunch of grapes", "Peach", "Plum", "Red cherry", "Tropical pineapple", "Green kiwi",
  "Ripe avocado", "Tomato", "Green bell pepper", "Cucumber", "Carrot", "Sweet corn",
  "Cheddar cheese", "Loaf of sourdough bread", "Hot espresso coffee", "Lemon iced tea",
  "Hot cocoa with marshmallows", "Fresh lemonade", "Orange juice", "Buttered popcorn",
  "Salted pretzel", "Honey jar", "Fried egg", "Scrambled eggs", "Vienna schnitzel",
  "Fish soup", "Stuffed cabbage", "Cottage cheese snack", "Dumplings with jam",
  // New matching food:
  "Cotton candy", "Gingerbread house", "Strawberry soup", "Fried cheese", "Kaiserschmarrn",
  "Poppy seed pastry", "Plum pie", "Chocolate fondue", "Banana smoothie"
];

const baseAnimals = [
  "African lion", "Striped tiger", "Giant elephant", "Tall giraffe", "Black and white zebra",
  "Chimpanzee monkey", "Gorilla", "Brown bear", "Polar bear", "Giant panda", "Grey wolf",
  "Red fox", "Fluffy bunny", "Squirrel with acorn", "Hedgehog", "Bat",
  "Pet dog", "Ginger cat", "Galloping horse", "Spotted cow", "Woolly sheep", "Farm goat",
  "Piglet", "Donkey", "Two humped camel", "Llama", "Jumping kangaroo", "Koala bear",
  "Nile crocodile", "Armored sea turtle", "Green lizard", "Color changing chameleon", "Coiling snake",
  "Tree frog", "Bald eagle", "Wise barn owl", "Peregrine falcon", "Colorful parrot",
  "Pink flamingo", "Graceful swan", "Mallard duck", "Goose", "White stork", "Barn swallow",
  "Blackbird", "Emperor penguin", "Playful dolphin", "Blue whale", "Killer whale orca",
  "Great white shark", "Stingray", "Eight armed octopus", "Giant squid", "Glowing jellyfish",
  "Starfish", "Seahorse", "River crab", "Maine lobster", "Colorful butterfly",
  "Seven spotted ladybug", "Honey bee", "Red ant", "Dragonfly", "Garden spider",
  "Scorpion", "Antlered deer", "Wild boar", "Spotted seal", "Walrus with tusks",
  "Sea otter", "Beaver building dam", "Peacock with feathers", "Pelican",
  // New matching animals:
  "Ostrich", "Wild turkey", "Meerkat", "Platypus", "Raccoon", "Sloth",
  "Kangaroo", "Peacock", "Hummingbird", "Guinea pig", "Hamster"
];

export const englishWordCategories = {
  general: baseGeneral,
  tech: baseTech,
  movies: baseMovies,
  food: baseFood,
  animals: baseAnimals,
};

export const englishWords = Array.from(new Set([
  ...baseGeneral,
  ...baseTech,
  ...baseMovies,
  ...baseFood,
  ...baseAnimals,
]));
