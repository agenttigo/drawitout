// English Word Database - 750+ Clean, Rich & Real Guessable Drawing Words

const baseGeneral = [
  "Sunset", "Guitar", "Ice cream", "Airplane", "Snowman", "Castle", "Lighthouse",
  "Glasses", "Umbrella", "Sailboat", "Piano", "Cactus", "Helicopter", "Dinosaur",
  "Backpack", "Scuba diver", "Astronaut", "Microscope", "Christmas tree", "Hot air balloon", "Campfire",
  "Rainbow", "Volcano", "Waterfall", "Pyramid", "Treasure chest", "Key", "Padlock", "Skateboard",
  "Bicycle", "Motorcycle", "Telescope", "Camera", "Wristwatch", "Compass", "Globe",
  "Crown", "Diamond", "Balloon", "Parachute", "Shoes", "Hat", "Sunglasses", "Gloves", "Boots",
  "Soccer ball", "Tent", "Swing", "Slide", "Mirror", "Lamp", "Painting", "Cake", "Drum",
  "Violin", "Trumpet", "Star", "Full moon", "Sun", "Fluffy cloud", "Lightning", "Snowflake",
  "Pine forest", "Cave", "Beach", "Palm island", "Suspension bridge", "Train station",
  "Windmill", "Royal palace", "Fishing rod", "Ship anchor", "Magic wand", "Gift box",
  "Pencil", "Pen", "Eraser", "Ruler", "Scissors", "Book", "Stamped letter", "Flower pot",
  "Sunflower", "Red rose", "Tulip", "Mushroom", "Seashell", "Sandcastle", "Sled",
  "Ice skates", "Snowboard", "Skis", "Gold medal", "Trophy cup", "National flag",
  "Church bell", "Flashlight", "Fireworks", "Water well", "Piggy bank", "Gold coin",
  "Suitcase", "Wallet", "Television", "Radio", "Coffee maker", "Toaster", "Microwave oven",
  "Refrigerator", "Washing machine", "Vacuum cleaner", "Iron", "Sewing machine", "Hair dryer", "Toothbrush",
  "Soap", "Towel", "Pillow", "Blanket", "Curtain", "Carpet", "Fireplace", "Rocking chair",
  "Garden bench", "Mailbox", "Trash can", "Ladder", "Wheelbarrow", "Shovel", "Rake",
  "Watering can", "Lawn mower", "Hammock", "Bird feeder", "Scarecrow", "Sunbed", "Sun umbrella",
  "Swim ring", "Life jacket", "Surfboard", "Diving goggles", "Flippers", "Canoe", "Kayak",
  "Paddle", "Eyeglass case", "Keychain", "Snow globe", "Padlock key", "Wind chime", "Garden gnome",
  "Bathtub", "Hang glider", "Christmas bauble", "Roller skates", "Photo frame", "Fishing net",
  "Diving mask", "Umbrella stand", "Sparkler", "Coffee pot", "Sandwich maker", "Wine cork",
  "Nutcracker", "Pine cone", "Colored pencils", "Rucksack", "Sugar bowl", "Teapot",
  "Frying pan", "Ancient artifact", "Treasure map", "Pirate ship", "Knight armor", "Crystal ball",
  "Spellbook", "Haunted house", "Space helmet", "Flying saucer", "Board game", "Rubik's cube",
  "Yo-yo", "Teddy bear", "Rubber duck", "Paddle boat", "Ski jump", "Foosball table", "Dartboard",
  "Bowling ball", "Tennis racket", "Boxing gloves", "Soccer goal", "Basketball hoop", "Champion trophy",
  "Alarm clock", "Hourglass", "Wall clock", "Dustpan", "Hammock", "Barbecue grill",
  "Camp kettle", "Camping tent", "Sleeping bag", "Pocket knife", "Water canteen", "Headlamp", "Constellation",
  "Shooting star", "Northern lights", "Solar eclipse", "Weather vane", "Homing pigeon", "Parrot cage",
  "Aquarium", "Guitar case", "Music stand", "Metronome", "Accordion", "Harmonica", "Flute",
  "Oboe", "Harp", "Harpsichord", "Tambourine", "Postcard", "Knitting needle", "Sewing thread", "Thimble",
  "Safety pin", "Shoelace", "Shoehorn", "Tweezers", "Clothes hanger", "Can opener", "Corkscrew",
  "Grater", "Whisk", "Wooden spoon", "Ladle", "Cutting board", "Kitchen scale", "Kitchen timer"
];

const baseAnimals = [
  "African lion", "Striped tiger", "Giant elephant", "Tall giraffe", "Zebra",
  "Chimpanzee", "Gorilla", "Brown bear", "Polar bear", "Giant panda", "Grey wolf",
  "Red fox", "Fluffy bunny", "Squirrel with acorn", "Hedgehog", "Bat",
  "Pet dog", "Tabby cat", "Horse", "Cow", "Fluffy sheep", "Goat",
  "Piglet", "Donkey", "Camel", "Llama", "Kangaroo", "Koala bear",
  "Nile crocodile", "Tortoise", "Green lizard", "Chameleon", "Snake",
  "Tree frog", "Great white shark", "Stingray", "Octopus", "Giant squid",
  "Jellyfish", "Starfish", "Seahorse", "Crayfish", "Lobster",
  "Dolphin", "Blue whale", "Killer whale orca", "Seal", "Walrus", "Sea turtle",
  "Swordfish", "Hammerhead shark", "Electric ray", "Clownfish", "Moray eel",
  "Bald eagle", "Wise owl", "Falcon", "Colorful parrot", "Pink flamingo",
  "Graceful swan", "Wild duck", "Goose", "White stork", "Barn swallow", "Blackbird",
  "Emperor penguin", "Peacock with feathers", "Pelican", "Ostrich", "Wild turkey", "Hummingbird",
  "Woodpecker", "Cormorant", "Seagull", "Puffin", "Kiwi bird",
  "Butterfly", "Ladybug", "Honeybee", "Red ant",
  "Dragonfly", "Spider", "Scorpion", "Grasshopper", "Firefly", "Stag beetle",
  "Stag with antlers", "Deer", "Wild boar", "Otter with fish", "Beaver with log",
  "Meerkat", "Platypus", "Raccoon", "Sloth", "Guinea pig", "Hamster",
  "Cheetah", "Panther", "Jaguar", "Hyena", "Hippopotamus", "Rhinoceros", "Anteater",
  "Armadillo", "Alpaca", "Wombat", "Tasmanian devil", "Arctic fox", "Reindeer",
  "Bison", "Japanese macaque", "Lemur", "Cobra", "Rattlesnake", "Anaconda"
];

const baseFood = [
  "Italian pizza", "Cheeseburger", "Chocolate pancake", "Garlic flatbread", "Chimney cake",
  "Goulash soup", "Crispy french fries", "Ham sandwich", "Hot dog with mustard",
  "Jelly donut", "Vanilla ice cream", "Chocolate muffin", "Chocolate bar", "Layer cake",
  "Strudel", "Sponge cake", "Fresh croissant", "Spaghetti bolognese",
  "Mexican taco", "Burrito with avocado", "Salmon sushi", "Belgian waffle", "Cinnamon apple pie",
  "Wiener schnitzel", "Fisherman's soup", "Stuffed cabbage", "Cottage cheese snack", "Chestnut puree",
  "Plum dumpling", "Cotton candy", "Gingerbread house", "Strawberry soup", "Fried cheese",
  "Shredded pancake", "Plum tart", "Chocolate fondue", "Banana smoothie",
  "Lasagna", "Ramen noodle soup", "Kebab roll", "Grilled sausage", "Gyros in pita",
  "Chicken noodle soup", "Roast pork with potatoes", "Chicken paprikash", "Lentil stew",
  "Cheese platter with grapes", "Fried mushrooms", "Greek salad with feta",
  "Yellow banana", "Red apple", "Sweet orange", "Sour lemon", "Fresh strawberry", "Wild raspberry",
  "Watermelon slice", "Melon", "Grape bunch", "Peach", "Blue plum",
  "Red cherry", "Tropical pineapple", "Green kiwi", "Ripe avocado", "Garden tomato",
  "Green bell pepper", "Cucumber", "Carrot", "Boiled corn on the cob", "Broccoli", "Cauliflower",
  "Beetroot", "Eggplant", "Zucchini", "Garlic braid", "Onion", "Leek",
  "Radish bunch", "Green peas in pod", "Spinach leaf", "Pumpkin", "Chestnut", "Walnut",
  "Hazelnut", "Almond", "Pistachio", "Blueberry", "Grapefruit", "Pomegranate",
  "Cheese block", "Sourdough bread", "Fresh bread roll", "Pretzel", "Brioche",
  "Hot black coffee", "Lemon tea", "Hot chocolate with whipped cream", "Refreshing lemonade",
  "Fresh squeezed juice", "Buttered popcorn", "Honey jar", "Strawberry jam",
  "Fried egg", "Scrambled eggs with ham", "Soft boiled egg", "Iced coffee", "Fruit smoothie",
  "Cappuccino with foam", "Espresso", "Ginger tea", "Mulled wine", "Fruit punch"
];

const baseTech = [
  "Robot", "Laptop", "Smartphone", "Keyboard", "Computer mouse", "Server rack", "Wifi router",
  "Headphones", "Microphone", "Computer monitor", "Flash drive", "Webcam", "Flying drone",
  "Virtual reality headset", "Graphics card", "CPU processor", "Motherboard", "Hard drive",
  "Color printer", "Scanner", "Video projector", "Bluetooth speaker", "Communication satellite",
  "Astronomical telescope", "Electron microscope", "Laser pointer", "Battery", "Powerbank",
  "Smartwatch", "Wireless earbuds", "Game console", "Joystick", "Gaming steering wheel",
  "Database", "Cloud storage", "Program code", "Cyber hacker", "Secret password", "Pixel",
  "Touchscreen", "3D printer", "Hologram", "Supercomputer", "Fiber optic cable",
  "Solar panel", "Wind turbine", "Electric car fast charger", "Quantum computer",
  "Artificial intelligence", "Remote control", "USB cable", "HDMI connector", "Memory card",
  "Lightsaber", "Smart glasses", "Fitness tracker band", "Security camera", "Alarm system",
  "Motion sensor", "Thermal sensor", "Smart thermostat", "Robotic vacuum cleaner", "Cable duct",
  "Network switch", "Server cabinet", "Loudspeaker", "Audio amplifier", "Audio mixing console",
  "Studio microphone with stand", "Green screen background", "LED light strip", "Solar roof"
];

const baseMovies = [
  // 1900s IMDb Classics (1900-1909)
  "A Trip to the Moon", "The Great Train Robbery", "The Haunted House", "Gulliver's Travels",
  "The Impossible Voyage", "Alice in Wonderland", "Life of an American Fireman", "Joan of Arc",
  "Robinson Crusoe", "The Golden Beetle",

  // 1910s IMDb Classics (1910-1919)
  "The Birth of a Nation", "Intolerance", "The Tramp", "Cabiria",
  "Les Miserables", "20,000 Leagues Under the Sea", "The Golem", "The Cabinet of Dr. Caligari",
  "Frankenstein", "Tarzan of the Apes",

  // 1920s IMDb Classics (1920-1929)
  "Metropolis", "Nosferatu", "The Kid", "The Gold Rush",
  "The General", "Battleship Potemkin", "Sunrise", "The Passion of Joan of Arc",
  "The Circus", "Un Chien Andalou",

  // 1930s IMDb Classics (1930-1939)
  "Gone with the Wind", "The Wizard of Oz", "Modern Times", "City Lights",
  "Snow White and the Seven Dwarfs", "King Kong", "M",
  "All Quiet on the Western Front", "Dracula", "The Grand Illusion",

  // 1940s IMDb Classics (1940-1949)
  "Casablanca", "It's a Wonderful Life", "Citizen Kane", "The Great Dictator",
  "Bicycle Thieves", "The Maltese Falcon", "Double Indemnity", "Pinocchio",
  "The Treasure of the Sierra Madre", "The Third Man",

  // 1950s IMDb Classics (1950-1959)
  "Seven Samurai", "12 Angry Men", "Rear Window", "Vertigo",
  "Singin' in the Rain", "Sunset Boulevard", "Ben-Hur", "The Bridge on the River Kwai",
  "The Seventh Seal", "Some Like It Hot",

  // 1960s IMDb Classics (1960-1969)
  "The Good, the Bad and the Ugly", "Psycho", "2001: A Space Odyssey", "Lawrence of Arabia",
  "Once Upon a Time in the West", "To Kill a Mockingbird", "Dr. Strangelove",
  "The Sound of Music", "Mary Poppins", "The Graduate",

  // 1970s IMDb Classics (1970-1979)
  "The Godfather", "The Godfather Part II", "Star Wars: Episode IV - A New Hope", "Jaws",
  "Apocalypse Now", "Taxi Driver", "Alien", "A Clockwork Orange",
  "One Flew Over the Cuckoo's Nest", "Rocky",

  // 1980s IMDb Classics (1980-1989)
  "Star Wars: Episode V - The Empire Strikes Back", "Back to the Future", "The Shining", "Raiders of the Lost Ark",
  "Blade Runner", "The Terminator", "E.T. the Extra-Terrestrial", "Dead Poets Society",
  "Scarface", "Ghostbusters",

  // 1990s IMDb Classics (1990-1999)
  "The Shawshank Redemption", "Pulp Fiction", "Schindler's List", "Fight Club",
  "The Matrix", "Forrest Gump", "The Silence of the Lambs", "Jurassic Park",
  "The Lion King", "Titanic",

  // 2000s IMDb Classics (2000-2009)
  "The Dark Knight", "The Lord of the Rings: The Return of the King", "The Lord of the Rings: The Fellowship of the Ring",
  "Gladiator", "Spirited Away", "Memento", "WALL-E",
  "Inglourious Basterds", "Pirates of the Caribbean: The Curse of the Black Pearl", "Eternal Sunshine of the Spotless Mind",

  // 2010s IMDb Classics (2010-2019)
  "Inception", "Interstellar", "Parasite", "Spider-Man: Into the Spider-Verse",
  "Whiplash", "Coco", "Mad Max: Fury Road", "Avengers: Endgame",
  "Joker", "La La Land",

  // 2020s IMDb Classics (2020-2029)
  "Dune", "Dune: Part Two", "Oppenheimer", "Everything Everywhere All at Once",
  "Spider-Man: No Way Home", "Top Gun: Maverick", "The Batman", "Avatar: The Way of Water",
  "Barbie", "Poor Things"
];

const baseSports = [
  "Soccer match", "Basketball hoop and ball", "Handball", "Volleyball", "Tennis ball and racket", "Table tennis ping pong",
  "Badminton shuttlecock", "Water polo", "Ice hockey with goal", "Billiard pool table with cue", "Bowling pin and ball",
  "Chess match checkmate", "Darts with target board", "Bow and arrow with target", "Shooting rifle target",
  "Swimming competition with starting block", "Diving board tower", "Kayak race course", "Rowing eight boat", "Sailing regatta",
  "Surfing giant ocean wave", "Paragliding from mountain", "Rock climbing with rope", "Caving with helmet lamp",
  "Mountain bike downhill", "Road bicycle race", "Marathon running race", "Hurdle race",
  "High jump", "Long jump", "Pole vault", "Javelin throw", "Discus throw", "Shot put",
  "Boxing match in ring", "Wrestling match", "Judo throw", "Karate chop", "Taekwondo high kick",
  "Fencing with foil and mask", "Show jumping equestrian", "Formula 1 race car", "Go-kart track",
  "Figure skating pirouette", "Speed skating", "Alpine ski slalom", "Cross-country skiing", "Ski jumping off ramp",
  "Bobsled in ice tunnel", "Curling with broom and stone", "Skateboard halfpipe ramp", "Parkour roof jump"
];

const baseProfessions = [
  "Firefighter with hose", "Police officer with badge", "Paramedic with stethoscope", "Surgeon with scalpel",
  "Dentist with drill", "Veterinarian with puppy", "Pharmacist in drugstore", "Architect with blueprints",
  "Mason with trowel", "Carpenter with wooden beam", "Joiner with hand plane", "Plumber with pipe wrench",
  "Electrician with screwdriver", "Car mechanic with lift", "Artist with painting easel",
  "Sculptor with chisel and clay", "Photojournalist with camera", "Cameraman with movie camera",
  "News anchor with microphone", "Journalist with notepad", "Pastry chef with whisk", "Head chef with saucepan",
  "Baker with fresh bread", "Waiter with serving tray", "Bartender with cocktail shaker", "Gardener with pruning shears",
  "Forester with rifle and binoculars", "Scuba diver with air tank", "Airplane pilot", "Flight attendant stewardess",
  "Astronaut in spacesuit", "Ship captain at helm", "Sailor with anchor rope", "Train locomotive engineer",
  "Bus driver with ticket machine", "Ballerina in pointe shoes", "Conductor with baton", "Opera singer",
  "Magician with top hat and rabbit", "Circus acrobat on trapeze", "Juggler with rings",
  "Clown with red nose", "Archaeologist with brush and artifact", "Miner with pickaxe", "Teacher with chalk and blackboard"
];

const basePlaces = [
  "Eiffel Tower in Paris", "Leaning Tower of Pisa", "Roman Colosseum", "Great Pyramid of Giza",
  "Egyptian Sphinx", "Great Wall of China", "Statue of Liberty in New York", "Big Ben clock tower in London",
  "Sydney Opera House", "Taj Mahal palace", "Parthenon in Athens", "Buda Castle",
  "Hungarian Parliament building", "Chain Bridge with stone lion", "Fisherman's Bastion with spires", "Nine-arch bridge",
  "Visegrad hilltop citadel", "Eger medieval fortress", "Lake Balaton marina", "Tihany Abbey on hill",
  "Tropical coral reef", "Desert island with coconut palm", "Sand desert with dunes", "Antarctic glacier with icebergs",
  "Grand Canyon gorge", "Niagara Falls", "Amazon rainforest", "Swiss Alps mountain peak",
  "Volcano crater with lava", "Stalactite cave with underground lake", "Medieval castle with moat", "Coastal lighthouse with beam",
  "Fishing village with wooden pier", "Bustling city with skyscrapers", "Amusement park with ferris wheel", "Rollercoaster with loops",
  "Circus big top tent", "Observatory planetarium dome", "Natural history museum with dinosaur skeleton",
  "Botanical garden greenhouse", "Grand central train station", "International airport with runway"
];

const baseFantasy = [
  "Seven-headed fire breathing dragon", "Winged Pegasus horse", "Unicorn with golden horn",
  "Blazing Phoenix bird", "Centaur half man half horse", "Miner dwarf with long beard",
  "Forest elf with bow", "Golden fish granting three wishes", "Mermaid with fish tail",
  "Mythological siren singing", "Medusa with living snake hair", "Giant Cyclops with one eye",
  "Minotaur bull headed monster", "Leprechaun with pot of gold", "Flying magic carpet",
  "Magic mirror in golden frame", "Philosopher's stone with red glow", "Magic potion bottle steaming",
  "Witch riding broomstick with black cat", "Witch bubbling cauldron", "Magic wand emitting sparkles",
  "Crystal ball with future vision", "Ancient spellbook with parchment pages", "Floating ghost with chains",
  "Skeleton warrior with sword and shield", "Werewolf howling at full moon", "Vampire in black cloak with bats",
  "Giant stone monster Golem", "Frost giant with ice spikes", "Magic lamp with Genie spirit",
  "Treasure vault with mountains of gold", "Enchanted frog prince with crown", "Glass slipper on velvet cushion"
];

const baseVehicles = [
  "Steam train with smoke plume", "High-speed bullet train", "Red double-decker bus", "Yellow school bus",
  "City tram streetcar with pantograph", "Subway metro train in tunnel", "Trolleybus with overhead wires",
  "Ambulance with siren", "Fire truck with ladder", "Police car with flashing lights", "Mail delivery van with parcels",
  "Yellow taxi cab with checker stripe", "Garbage truck with compactor", "Concrete mixer with rotating drum", "Snowplow clearing road",
  "Steamroller on hot asphalt", "Bulldozer with caterpillar tracks", "Excavator digging with bucket", "Construction crane with hook",
  "Farm tractor with plow and trailer", "Combine harvester cutting wheat", "Heavy semi-truck with long trailer",
  "Off-road 4x4 jeep in mud", "Sporty convertible with open top", "Luxury stretch limousine with tinted windows",
  "Camper RV motorhome", "Vintage classic car", "Superbike racing motorcycle", "City scooter with helmet",
  "Electric kick scooter", "Sailing yacht with white sails", "Paddlewheel steamboat", "Luxury ocean cruise liner",
  "Container cargo ship", "Fishing trawler with nets", "Submarine with periscope", "Hovercraft over water",
  "Biplane propeller aircraft", "Passenger airliner airplane", "Supersonic fighter jet",
  "Rescue helicopter with stretcher", "Giant Zeppelin airship", "Hot air balloon with burner",
  "Hang glider with pilot", "Space shuttle with heat shield", "Moon rover vehicle with antenna dish", "Satellite with solar wings"
];

const baseBrands = [
  "Apple", "Microsoft", "Google", "Amazon", "Samsung",
  "Toyota", "Coca-Cola", "Mercedes-Benz", "Disney", "Nike",
  "BMW", "McDonald's", "Tesla", "Louis Vuitton", "Cisco",
  "Instagram", "Adobe", "IBM", "Oracle", "SAP",
  "Facebook", "YouTube", "Chanel", "Gucci", "Porsche",
  "Netflix", "Starbucks", "Sony", "Intel", "Visa",
  "Mastercard", "Hyundai", "Audi", "Ford", "Volkswagen",
  "Lego", "Adidas", "Nintendo", "Ferrari", "Red Bull",
  "Spotify", "Rolex", "Hermès", "Zara", "H&M",
  "L'Oréal", "Pepsi", "PlayStation", "Xbox", "TikTok"
];

export const englishWordCategories = {
  general: baseGeneral,
  animals: baseAnimals,
  food: baseFood,
  tech: baseTech,
  movies: baseMovies,
  brands: baseBrands,
  sports: baseSports,
  professions: baseProfessions,
  places: basePlaces,
  fantasy: baseFantasy,
  vehicles: baseVehicles,
};

export const englishWords = Array.from(new Set([
  ...baseGeneral,
  ...baseAnimals,
  ...baseFood,
  ...baseTech,
  ...baseMovies,
  ...baseBrands,
  ...baseSports,
  ...baseProfessions,
  ...basePlaces,
  ...baseFantasy,
  ...baseVehicles,
]));
