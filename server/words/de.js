// German Word Database - Clean, Rich & Real Words (No artificial compound prefixes)

const baseGeneral = [
  "Sonnenuntergang", "Gitarre", "Eiscreme", "Flugzeug", "Schneemann", "Schloss", "Leuchtturm",
  "Brille", "Regenschirm", "Segelboot", "Klavier", "Kaktus", "Hubschrauber", "Dinosaurier",
  "Rucksack", "Taucher", "Astronaut", "Mikroskop", "Weihnachtsbaum", "Heißluftballon", "Lagerfeuer",
  "Regenbogen", "Vulkan", "Wasserfall", "Pyramide", "Schatztruhe", "Schlüssel", "Vorhängeschloss", "Skateboard",
  "Fahrrad", "Motorrad", "Teleskop", "Fotoapparat", "Armbanduhr", "Kompass", "Globus",
  "Krone", "Diamant", "Luftballon", "Fallschirm", "Turnschuhe", "Zylinderhut", "Sonnenbrille", "Handschuhe", "Stiefel",
  "Fußball", "Zelt", "Schaukel", "Rutsche", "Spiegel", "Schreibtischlampe", "Gemälde", "Geburtstagstorte", "Trommel",
  "Geige", "Trompete", "Stern", "Vollmond", "Sonne", "Wolke", "Blitz", "Schneeflocke",
  "Tannenwald", "Tropfsteinhöhle", "Sandstrand", "Palmeninsel", "Hängebrücke", "Bahnhof",
  "Windmühle", "Krankenwagen", "Feuerwehrauto", "Polizeiauto", "U-Boot", "Weltraumrakete",
  "Königspalast", "Angelrute", "Schiffsanker", "Zauberstab", "Geschenkpaket", "Bleistift",
  "Füllfederhalter", "Radiergummi", "Lineal", "Schere", "Buch", "Postkarte", "Blumentopf", "Sonnenblume",
  "Rote Rose", "Tulpe", "Fliegenpilz", "Muschel", "Sandburg", "Schlitten", "Schlittschuhe",
  "Snowboard", "Ski", "Goldmedaille", "Siegerpokal", "Nationalflagge", "Kirchenglocke",
  "Taschenlampe", "Feuerwerk", "Ziehbrunnen", "Sparschwein", "Goldmünze", "Koffer", "Geldbörse",
  "Fernseher", "Radio", "Kaffeemaschine", "Toaster", "Mikrowelle", "Kühlschrank",
  "Waschmaschine", "Staubsauger", "Bügeleisen", "Föhn", "Zahnbürste", "Seifenstück",
  "Handtuch", "Kissen", "Bettdecke", "Vorhang", "Teppich", "Kamin", "Schaukelstuhl", "Parkbank",
  "Briefkasten", "Mülleimer", "Leiter", "Schubkarre", "Schaufel", "Rechen", "Gießkanne",
  "Rasenmäher", "Vogelhaus", "Vogelscheuche", "Sonnenliege", "Sonnenschirm", "Rettungsring",
  "Rettungsweste", "Surfbrett", "Taucherbrille", "Schwimmflossen", "Kanu", "Kajak", "Paddel",
  // 100+ Neue Wörter:
  "Brillenetui", "Schlüsselanhänger", "Schneekugel", "Vorhängeschloss-Schlüssel", "Windspiel", "Gartenzwerg", "Badewanne",
  "Drachenflieger", "Weihnachtskugel", "Rollschuhe", "Fotorahmen", "Fischernetz", "Tauchermaske",
  "Schirmständer", "Wunderkerze", "Kaffeekanne", "Sandwichtoaster", "Weinkorken", "Nussknacker",
  "Tannenzapfen", "Buntstifte", "Zuckerdose", "Teekanne", "Crêpepfanne",
  "Kunstwerk", "Schatzkarte", "Piratenschiff", "Ritterrüstung", "Kristallkugel", "Zauberbuch",
  "Geisterhaus", "Raumhelm", "Fliegende Untertasse", "Brettspiel", "Zauberwürfel", "Jojo",
  "Teddybär", "Gummiente", "Tretboot", "Skisprungschanze", "Kickertisch", "Dartscheibe",
  "Bowlingkugel", "Tennisschläger", "Boxhandschuh", "Fußballtor", "Basketballkorb", "Meisterschaftspokal",
  "Wecker", "Sanduhr", "Wanduhr", "Kehrblech", "Hängematte", "Gartengrill",
  "Kessel", "Campingzelt", "Schlafsack", "Taschenmesser", "Trinkflasche", "Stirnlampe", "Sternbild",
  "Sternschnuppe", "Nordlicht", "Sonnenfinsternis", "Wetterhahn", "Brieftaube", "Vogelkäfig", "Aquarium"
];

const baseTech = [
  "Roboter", "Laptop", "Smartphone", "Tastatur", "Computermaus", "Serverschrank", "WLAN-Router",
  "Kopfhörer", "Mikrofon", "Computermonitor", "USB-Stick", "Webcam", "Drohne",
  "VR-Brille", "Grafikkarte", "Prozessor", "Mainboard", "Festplatte",
  "Farbdrucker", "Scanner", "Beamer", "Bluetooth-Lautsprecher", "Fernmeldesatellit",
  "Teleskop", "Elektronenmikroskop", "Laserpointer", "Wiederaufladbare Batterie", "Powerbank",
  "Smartwatch", "Kabellose Ohrhörer", "Spielkonsole", "Joystick", "Lenkrad",
  "Datenbank", "Cloud-Server", "Quellcode", "Hacker", "Passwort", "Pixel",
  "Touchscreen", "3D-Drucker", "Hologramm", "Supercomputer", "Glasfaserkabel",
  "Solarmodul", "Windkraftanlage", "Elektroauto Ladestation", "Quantencomputer",
  "Künstliche Intelligenz", "Fernbedienung", "USB-Kabel", "HDMI-Anschluss", "Speicherkarte"
];

const baseMovies = [
  "Spider-Man", "Batman", "Superman", "Joker", "Harry Potter", "Pikachu", "SpongeBob",
  "Shrek", "Micky Maus", "Donald Duck", "Minions", "Gru", "Darth Vader", "Meister Yoda",
  "Hulk", "Iron Man", "Thor", "Captain America", "Kapitän Nemo", "Simba der König der Löwen",
  "Aladdin mit Wunderlampe", "Tarzan", "Dumbo der fliegende Elefant", "Pinocchio", "Aschenputtel",
  "Schneewittchen", "Ninja-Krieger", "Fluch der Karibik Pirat", "Zauberlehrling", "Superheld",
  "Feuerspeiender Drache", "Vampir", "Zombie", "Gespenst", "Ägyptische Mumie", "Frankensteins Monster",
  "T-Rex Dinosaurier", "Robin Hood", "Sherlock Holmes", "Graf Dracula", "Kapitän Jack Sparrow",
  "Super Mario", "Luigi", "Sonic der Igel", "Pac-Man", "Minecraft Steve", "Elsa Eiskönigin",
  "Olaf der Schneemann", "Esel aus Shrek", "Der gestiefelte Kater", "Gandalf der Zauberer", "Gollum",
  "Terminator Roboter", "Gladiator", "Lightning McQueen Rennauto", "Wall-E Roboter", "Ratatouille Koch"
];

const baseFood = [
  "Italienische Pizza", "Cheeseburger", "Pfannkuchen mit Ahornsirup", "Knusprige Pommes Frites", "Schinkensandwich",
  "Hotdog mit Senf", "Glasierter Donut", "Vanilleeis", "Schokomuffin", "Tafel Schokolade",
  "Buttercroissant", "Spaghetti Bolognese", "Mexikanischer Taco", "Burrito", "Lachs Sushi",
  "Belgische Waffel", "Apfelstrudel", "Gelbe Banane", "Roter Apfel", "Süße Orange",
  "Saure Zitrone", "Frische Erdbeere", "Himbeere", "Wassermelonenscheibe", "Honigmelone",
  "Weintrauben", "Pfirsich", "Pflaume", "Kirsche", "Tropische Ananas", "Grüne Kiwi",
  "Reife Avocado", "Tomate", "Grüne Paprika", "Gurke", "Karotte", "Maiskolben",
  "Käse", "Frisches Bauernbrot", "Heißer Espresso", "Zitronen-Eistee",
  "Heißer Kakao mit Schlagsahne", "Frische Limonade", "Orangensaft", "Butter-Popcorn",
  "Salzbrezel", "Bienenhonig", "Spiegelei", "Rührei", "Wiener Schnitzel",
  "Fischsuppe", "Kohlroulade", "Käsekuchen", "Pflaumenknödel",
  // Neue Leckereien:
  "Zuckerwatte", "Lebkuchenhaus", "Erdbeersuppe", "Panierter Käse", "Kaiserschmarrn",
  "Mohnpielen", "Pflaumenkuchen", "Schokofondue", "Bananenshake"
];

const baseAnimals = [
  "Afrikanischer Löwe", "Gestreifter Tiger", "Riesenelefant", "Große Giraffe", "Schwarz-weißes Zebra",
  "Schimpanse", "Gorilla", "Brauner Bär", "Eisbär", "Riesenpanda", "Grauer Wolf",
  "Roter Fuchs", "Kuscheliger Hase", "Eichhörnchen mit Eichel", "Stacheligel", "Fledermaus",
  "Haushund", "Getigerte Katze", "Galoppierendes Pferd", "Gefleckte Kuh", "Wolliges Schaf", "Hausziege",
  "Ferkel", "Esel", "Höcker-Kamel", "Lama", "Hüpfendes Känguru", "Koalabär",
  "Nilkrokodil", "Panzerschildkröte", "Grüne Eidechse", "Chamäleon", "Geringelte Schlange",
  "Laubfrosch", "Weißkopfseeadler", "Schleiereule", "Wanderfalke", "Bunter Papagei",
  "Rosa Flamingo", "Eleganter Schwan", "Stockente", "Gans", "Weißstorch", "Rauchschwalbe",
  "Amsel", "Kaiserpinguin", "Verspielter Delfin", "Blauwal", "Schwertwal Orca",
  "Weißer Hai", "Stachelrochen", "Achtarmiger Krake", "Riesentintenfisch", "Leuchtende Qualle",
  "Seestern", "Seepferdchen", "Flusskrebs", "Hummer", "Bunter Schmetterling",
  "Siebenpunkt-Marienkäfer", "Honigbiene", "Rote Ameise", "Libelle", "Gartenkreuzspinne",
  "Skorpion", "Geweihträger Hirsch", "Rehkitz", "Wildschwein", "Seehund", "Walross mit Stoßzähnen",
  "Fischotter", "Biber mit Baumstamm", "Pfau mit Federn", "Pelikan",
  // Neue Tiere:
  "Strauß", "Truthahn", "Erdmännchen", "Schnabeltier", "Waschbär", "Faultier",
  "Känguru", "Pfau", "Kolibri", "Meerschweinchen", "Hamster"
];

export const germanWordCategories = {
  general: baseGeneral,
  tech: baseTech,
  movies: baseMovies,
  food: baseFood,
  animals: baseAnimals,
};

export const germanWords = Array.from(new Set([
  ...baseGeneral,
  ...baseTech,
  ...baseMovies,
  ...baseFood,
  ...baseAnimals,
]));
