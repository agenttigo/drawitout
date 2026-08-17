// German Word Database - 750+ Clean, Rich & Real Guessable Drawing Words

const baseGeneral = [
  "Sonnenuntergang", "Gitarre", "Eiscreme", "Flugzeug", "Schneemann", "Burg", "Leuchtturm",
  "Brille", "Regenschirm", "Segelboot", "Klavier", "Kaktus", "Hubschrauber", "Dinosaurier",
  "Rucksack", "Taucher", "Astronaut", "Mikroskop", "Weihnachtsbaum", "Heißluftballon", "Lagerfeuer",
  "Regenbogen", "Vulkan", "Wasserfall", "Pyramide", "Schatztruhe", "Schlüssel", "Vorhängeschloss", "Skateboard",
  "Fahrrad", "Motorrad", "Teleskop", "Kamera", "Armbanduhr", "Kompass", "Globus",
  "Krone", "Diamant", "Luftballon", "Fallschirm", "Schuhe", "Hut", "Sonnenbrille", "Handschuhe", "Stiefel",
  "Fußball", "Zelt", "Schaukel", "Rutsche", "Spiegel", "Lampe", "Gemälde", "Kuchen", "Trommel",
  "Geige", "Trompete", "Stern", "Vollmond", "Sonne", "Schäfchenwolke", "Blitz", "Schneeflocke",
  "Tannenwald", "Tropfsteinhöhle", "Strand", "Palmeninsel", "Hängebrücke", "Bahnhof",
  "Windmühle", "Königspalast", "Angelrute", "Schiffsanker", "Zauberstab", "Geschenkbox",
  "Bleistift", "Kugelschreiber", "Radiergummi", "Lineal", "Schere", "Buch", "Brief mit Briefmarke", "Blumentopf",
  "Sonnenblume", "Rote Rose", "Tulpe", "Pilz", "Muschel", "Sandburg", "Schlitten",
  "Schlittschuhe", "Snowboard", "Ski", "Goldmedaille", "Siegerpokal", "Nationalflagge",
  "Kirchenglocke", "Taschenlampe", "Feuerwerk", "Ziehbrunnen", "Sparschwein", "Goldmünze",
  "Koffer", "Geldbörse", "Fernseher", "Radio", "Kaffeemaschine", "Toaster", "Mikrowelle",
  "Kühlschrank", "Waschmaschine", "Staubsauger", "Bügeleisen", "Nähmaschine", "Föhn", "Zahnbürste",
  "Seife", "Handtuch", "Kissen", "Bettdecke", "Vorhang", "Teppich", "Kamin", "Schaukelstuhl",
  "Gartenbank", "Briefkasten", "Mülleimer", "Leiter", "Schubkarre", "Schaufel", "Rechen",
  "Gießkanne", "Rasenmäher", "Hängematte", "Vogelhäuschen", "Vogelscheuche", "Sonnenliege", "Sonnenschirm",
  "Schwimmring", "Rettungsweste", "Surfbrett", "Taucherbrille", "Schwimmflossen", "Kanu", "Kajak",
  "Ruder", "Brillenetui", "Schlüsselanhänger", "Schneekugel", "Schlüsselloch", "Windspiel", "Gartenzwerg",
  "Badewanne", "Drachenflieger", "Weihnachtskugel", "Rollschuhe", "Bilderrahmen", "Fischernetz",
  "Tauchmaske", "Schirmständer", "Wunderkerze", "Kaffeekanne", "Sandwichtoaster", "Weinkorken",
  "Nussknacker", "Tannenzapfen", "Buntstifte", "Wanderrucksack", "Zuckerdose", "Teekanne",
  "Bratpfanne", "Kunstschatz", "Schatzkarte", "Piratenschiff", "Ritterrüstung", "Kristallkugel",
  "Zauberbuch", "Spukhaus", "Raumfahrt-Helm", "Fliegende Untertasse", "Brettspiel", "Zauberwürfel",
  "Jo-Jo", "Teddybär", "Gummiente", "Tretboot", "Skisprungschanze", "Tischkicker", "Dartscheibe",
  "Bowlingkugel", "Tennisschläger", "Boxhandschuhe", "Fußballtor", "Basketballkorb", "Meisterpokal",
  "Wecker", "Sanduhr", "Wanduhr", "Kehrschaufel", "Gartengrill",
  "Campingkessel", "Campingzelt", "Schlafsack", "Taschenmesser", "Trinkflasche", "Stirnlampe", "Sternbild",
  "Sternschnuppe", "Nordlicht", "Sonnenfinsternis", "Wetterhahn", "Brieftaube", "Papageienkäfig",
  "Aquarium", "Gitarrenkoffer", "Notenständer", "Metronom", "Akkordeon", "Mundharmonika", "Flöte",
  "Oboe", "Harfe", "Cembalo", "Tamburin", "Postkarte", "Stricknadel", "Nähgarn", "Fingerhut",
  "Sicherheitsnadel", "Schnürsenkel", "Schuhlöffel", "Pinzette", "Kleiderbügel", "Dosenöffner", "Korkenzieher",
  "Reibe", "Schneebesen", "Kochlöffel", "Schöpfkelle", "Schneidebrett", "Küchenwaage", "Küchenuhr"
];

const baseAnimals = [
  "Afrikanischer Löwe", "Gestreifter Tiger", "Riesenelefant", "Giraffe", "Zebra",
  "Schimpanse", "Gorilla", "Braunbär", "Eisbär", "Riesenpanda", "Grauer Wolf",
  "Roter Fuchs", "Kuscheliger Hase", "Eichhörnchen mit Eichel", "Stacheliges Igel", "Fledermaus",
  "Haushund", "Getigerte Katze", "Pferd", "Kuh", "Schaf", "Hausziege",
  "Ferkel", "Esel", "Kamel", "Lama", "Hüpfendes Känguru", "Koalabär",
  "Nilkrokodil", "Schildkröte", "Grüne Eidechse", "Chamäleon", "Schlange",
  "Laubfrosch", "Weißer Hai", "Stachelrochen", "Oktopus", "Riesenkrake",
  "Leuchtende Qualle", "Seestern", "Seepferdchen", "Flusskrebs", "Hummer",
  "Delfin", "Blauwal", "Schwertwal Orca", "Seehund", "Walross", "Meeresschildkröte",
  "Schwertfisch", "Hammerhai", "Zitterrochen", "Clownfisch", "Muräne",
  "Weißkopfseeadler", "Weise Eule", "Wanderfalke", "Bunter Papagei", "Rosa Flamingo",
  "Eleganter Schwan", "Stockente", "Gans", "Weißstorch", "Rauchschwalbe", "Amsel",
  "Kaiserpinguin", "Pfau mit Federn", "Pelikan", "Strauß", "Wildtruthahn", "Kolibri",
  "Specht am Baum", "Kormoran", "Möwe", "Papageitaucher", "Kiwivogel",
  "Schmetterling", "Marienkäfer", "Honigbiene", "Rote Waldameise",
  "Libelle", "Kreuzspinne", "Skorpion", "Heuschrecke", "Glühwürmchen", "Hirschkäfer",
  "Hirsch mit Geweih", "Rehkitz", "Wildschwein", "Otter mit Fisch", "Biber mit Baumstamm",
  "Erdmännchen", "Schnabeltier", "Waschbär", "Faultier", "Meerschweinchen", "Hamster",
  "Gepard", "Panther", "Jaguar", "Hyäne", "Flusspferd", "Nashorn", "Ameisenbär",
  "Gürteltier", "Alpaka", "Wombat", "Tasmanischer Teufel", "Polarfuchs", "Rentier",
  "Bison", "Japanischer Makak", "Lemur", "Kobra", "Klapperschlange", "Anakonda"
];

const baseFood = [
  "Italienische Pizza", "Cheeseburger", "Schokoladenpfannkuchen", "Knoblauch-Langos", "Baumkuchen",
  "Gulaschsuppe im Kessel", "Knusprige Pommes frites", "Schinkensandwich", "Hotdog mit Senf",
  "Marmeladen-Krapfen", "Vanilleeis", "Schokomuffin", "Tafel Schokolade", "Schichttorte",
  "Apfelstrudel", "Biskuitkuchen", "Frisches Croissant", "Spaghetti Bolognese",
  "Mexikanischer Taco", "Avocado Burrito", "Lachs Sushi", "Belgische Waffel", "Apfelkuchen mit Zimt",
  "Wiener Schnitzel", "Fischersuppe", "Kohlroulade", "Quarkriegel", "Kastanienpüree",
  "Zwetschgenknödel", "Zuckerwatte", "Lebkuchenhaus", "Erdbeercremesuppe", "Gebackener Käse",
  "Kaiserschmarrn", "Mohnnudeln", "Pflaumenkuchen", "Schokofondue", "Bananen-Milchshake",
  "Lasagne", "Ramen Nudelsuppe", "Kebab Döner", "Bratwurst", "Gyros im Fladenbrot",
  "Hühnersuppe mit Nudeln", "Schweinebraten mit Knödeln", "Hühnerpaprikasch", "Linseneintopf",
  "Käseplatte mit Weintrauben", "Panierte Champignons", "Griechischer Salat mit Feta",
  "Gelbe Banane", "Roter Apfel", "Süße Orange", "Saure Zitrone", "Frische Erdbeere", "Waldhimbeere",
  "Wassermelonenscheibe", "Honigmelone", "Weintrauben", "Pfirsich", "Blaue Pflaume",
  "Rote Kirsche", "Tropische Ananas", "Grüne Kiwi", "Reife Avocado", "Gartentomate",
  "Grüne Paprika", "Salatgurke", "Karotte", "Gekochter Maiskolben", "Brokkoli", "Blumenkohl",
  "Rote Bete", "Aubergine", "Zucchini", "Knoblauchzopf", "Zwiebel", "Lauch",
  "Radieschenbund", "Erbsen in der Schote", "Spinatblatt", "Kürbis", "Esskastanie", "Walnuss",
  "Haselnuss", "Mandel", "Pistazie", "Blaubeere", "Grapefruit", "Granatapfel",
  "Käselaib", "Sauerteigbrot", "Frische Semmel", "Salzbrezel", "Hefezopf",
  "Heißer schwarzer Kaffee", "Zitronentee", "Heiße Schokolade mit Sahne", "Erfrischende Limonade",
  "Frisch gepresster Saft", "Butterpopcorn", "Honigglas", "Erdbeermarmelade",
  "Spiegelei", "Rührei mit Schinken", "Weichgekochtes Ei", "Eiskaffee", "Frucht-Smoothie",
  "Cappuccino mit Milchschaum", "Espresso", "Ingwertee", "Glühwein", "Fruchtbowle"
];

const baseTech = [
  "Roboter", "Laptop", "Smartphone", "Tastatur", "Computermaus", "Serverrack", "WLAN-Router",
  "Kopfhörer", "Mikrofon", "Computermonitor", "USB-Stick", "Webcam", "Drohne",
  "Virtual-Reality-Brille", "Grafikkarte", "Prozessor CPU", "Hauptplatine", "Festplatte",
  "Farbdrucker", "Scanner", "Beamer Projektor", "Bluetooth-Lautsprecher", "Fernmeldesatellit",
  "Astronomisches Teleskop", "Elektronenmikroskop", "Laserpointer", "Batterie", "Powerbank",
  "Smartwatch", "Kabellose Ohrhörer", "Spielkonsole", "Joystick", "Gaming-Lenkrad",
  "Datenbank", "Cloud-Speicher", "Programmiercode", "Cyber-Hacker", "Geheimes Passwort", "Pixel",
  "Touchscreen", "3D-Drucker", "Hologramm", "Supercomputer", "Glasfaserkabel",
  "Solarpanel", "Windkraftanlage", "Schnellladesäule für Elektroautos", "Quantencomputer",
  "Künstliche Intelligenz", "Fernbedienung", "USB-Kabel", "HDMI-Stecker", "Speicherkarte",
  "Lichtschwert", "Smarte Datenbrille", "Fitnessarmband", "Überwachungskamera", "Alarmanlage",
  "Bewegungsmelder", "Wärmesensor", "Smartes Thermostat", "Saugroboter", "Kabelkanal",
  "Netzwerk-Switch", "Serverschrank", "Lautsprecherbox", "Audio-Verstärker", "Mischpult",
  "Studiomikrofon mit Ständer", "Greenscreen-Hintergrund", "LED-Lichtstreifen", "Solardach"
];

const baseMovies = [
  // 1900er IMDb Klassiker (1900-1909)
  "Die Reise zum Mond", "Der große Eisenbahnraub", "Das Schloss des Teufels", "Gullivers Reisen",
  "Die unmögliche Reise", "Alice im Wunderland", "Einsatz der Feuerwehr", "Jeanne d'Arc",
  "Robinson Crusoe", "Der Goldkäfer",

  // 1910er IMDb Klassiker (1910-1919)
  "Die Geburt einer Nation", "Intoleranz", "Der Vagabund", "Cabiria",
  "Die Elenden", "20.000 Meilen unter dem Meer", "Der Golem", "Das Cabinet des Dr. Caligari",
  "Frankenstein", "Tarzan bei den Affen",

  // 1920er IMDb Klassiker (1920-1929)
  "Metropolis", "Nosferatu", "Der Spitzbube", "Goldrausch",
  "Der General", "Panzerkreuzer Potemkin", "Sonnenaufgang", "Die Passion der Jungfrau von Orleans",
  "Der Zirkus", "Ein andalusischer Hund",

  // 1930er IMDb Klassiker (1930-1939)
  "Vom Winde verweht", "Der Zauberer von Oz", "Moderne Zeiten", "Lichter der Großstadt",
  "Schneewittchen und die sieben Zwerge", "King Kong", "M – Eine Stadt sucht einen Mörder",
  "Im Westen nichts Neues", "Dracula", "Die große Illusion",

  // 1940er IMDb Klassiker (1940-1949)
  "Casablanca", "Ist das Leben nicht schön?", "Citizen Kane", "Der große Diktator",
  "Fahrraddiebe", "Die Spur des Falken", "Frau ohne Gewissen", "Pinocchio",
  "Der Schatz der Sierra Madre", "Der dritte Mann",

  // 1950er IMDb Klassiker (1950-1959)
  "Die sieben Samurai", "Die zwölf Geschworenen", "Das Fenster zum Hof", "Vertigo – Aus dem Reich der Toten",
  "Du sollst mein Glücksstern sein", "Boulevard der Dämmerung", "Ben-Hur", "Die Brücke am Kwai",
  "Das siebente Siegel", "Manche mögen's heiß",

  // 1960er IMDb Klassiker (1960-1969)
  "Zwei glorreiche Halunken", "Psycho", "2001: Odyssee im Weltraum", "Lawrence von Arabien",
  "Spiel mir das Lied vom Tod", "Wer die Nachtigall stört", "Dr. Seltsam",
  "Meine Lieder – meine Träume", "Mary Poppins", "Die Reifeprüfung",

  // 1970er IMDb Klassiker (1970-1979)
  "Der Pate", "Der Pate II", "Krieg der Sterne", "Der weiße Hai",
  "Apocalypse Now", "Taxi Driver", "Alien – Das unheimliche Wesen aus einer fremden Welt", "Uhrwerk Orange",
  "Einer flog über das Kuckucksnest", "Rocky",

  // 1980er IMDb Klassiker (1980-1989)
  "Das Imperium schlägt zurück", "Zurück in die Zukunft", "Shining", "Jäger des verlorenen Schatzes",
  "Blade Runner", "Terminator", "E.T. – Der Außerirdische", "Der Club der toten Dichter",
  "Scarface", "Ghostbusters – Die Geisterjäger",

  // 1990er IMDb Klassiker (1990-1999)
  "Die Verurteilten", "Pulp Fiction", "Schindlers Liste", "Fight Club",
  "Matrix", "Forrest Gump", "Das Schweigen der Lämmer", "Jurassic Park",
  "Der König der Löwen", "Titanic",

  // 2000er IMDb Klassiker (2000-2009)
  "The Dark Knight", "Der Herr der Ringe: Die Rückkehr des Königs", "Der Herr der Ringe: Die Gefährten",
  "Gladiator", "Chihiros Reise ins Zauberland", "Memento", "WALL-E",
  "Inglourious Basterds", "Fluch der Karibik", "Vergiss mein nicht!",

  // 2010er IMDb Klassiker (2010-2019)
  "Inception", "Interstellar", "Parasite", "Spider-Man: A New Universe",
  "Whiplash", "Coco – Lebendiger als das Leben!", "Mad Max: Fury Road", "Avengers: Endgame",
  "Joker", "La La Land",

  // 2020er IMDb Klassiker (2020-2029)
  "Dune", "Dune: Part Two", "Oppenheimer", "Everything Everywhere All at Once",
  "Spider-Man: No Way Home", "Top Gun: Maverick", "The Batman", "Avatar: The Way of Water",
  "Barbie", "Poor Things"
];

const baseSports = [
  "Fußballspiel", "Basketballkorb und Ball", "Handball", "Volleyball", "Tennisball und Schläger", "Tischtennis Ping-Pong",
  "Badminton Federball", "Wasserball", "Eishockey mit Tor", "Billardtisch mit Queue", "Bowlingkugel und Kegel",
  "Schachpartie Schachmatt", "Darts mit Zielscheibe", "Bogen und Pfeil mit Zielscheibe", "Sportschießen",
  "Schwimmwettkampf mit Startblock", "Sprungturm Wasserspringen", "Kajak-Rennstrecke", "Ruder-Achter", "Segelregatta",
  "Surfen auf Riesenwelle", "Gleitschirmfliegen vom Berg", "Klettern mit Seil", "Höhlenforschung mit Helmlampe",
  "Mountainbike Downhill", "Straßenradrennen", "Marathonlauf", "Hürdenlauf",
  "Hochsprung", "Weitsprung", "Stabhochsprung", "Speerwurf", "Diskuswurf", "Kugelstoßen",
  "Boxkampf im Ring", "Ringen", "Judo Wurf", "Karateschlag", "Taekwondo Fußtritt",
  "Fechten mit Degen und Maske", "Springreiten Pferdesport", "Formel 1 Rennwagen", "Go-Kart-Bahn",
  "Eiskunstlauf Pirouette", "Eisschnelllauf", "Ski Alpin Slalom", "Skilanglauf", "Skispringen von der Schanze",
  "Viererbob im Eiskanal", "Curling mit Besen und Stein", "Skateboard Halfpipe-Rampe", "Parkour Dachsprung"
];

const baseProfessions = [
  "Feuerwehrmann mit Schlauch", "Polizist mit Dienstmarke", "Notarzt mit Stethoskop", "Chirurg mit Skalpell",
  "Zahnarzt mit Bohrer", "Tierarzt mit Welpen", "Apotheker in Apotheke", "Architekt mit Bauplan",
  "Maurer mit Kelle", "Zimmermann mit Holzbalken", "Tischler mit Hobel", "Klempner mit Rohrzange",
  "Elektriker mit Schraubendreher", "Automechaniker mit Hebebühne", "Maler mit Staffelei",
  "Bildhauer mit Meißel und Ton", "Fotojournalist mit Kamera", "Kameramann mit Filmkamera",
  "Nachrichtensprecher mit Mikrofon", "Journalist mit Notizblock", "Konditor mit Schneebesen", "Chefkoch mit Topf",
  "Bäcker mit frischem Brot", "Kellner mit Serviertablett", "Barkeeper mit Cocktailshaker", "Gärtner mit Gartenschere",
  "Förster mit Gewehr und Fernglas", "Taucher mit Sauerstoffflasche", "Flugzeugpilot", "Flugbegleiterin Stewardess",
  "Astronaut im Raumanzug", "Schiffskapitän am Steuer", "Matrose mit Ankertau", "Lokomotivführer",
  "Busfahrer mit Fahrkartenautomat", "Ballerina in Spitzenschuhen", "Dirigent mit Taktstock", "Opernsänger",
  "Zauberer mit Zylinder und Kaninchen", "Zirkusakrobat am Trapez", "Jongleur mit Ringen",
  "Clown mit roter Nase", "Archäologe mit Pinsel und Fundstück", "Bergmann mit Spitzhacke", "Lehrer mit Kreide und Tafel"
];

const basePlaces = [
  "Eiffelturm in Paris", "Schiefer Turm von Pisa", "Römisches Kolosseum", "Große Pyramide von Gizeh",
  "Ägyptische Sphinx", "Chinesische Mauer", "Freiheitsstatue in New York", "Big Ben Uhrturm in London",
  "Sydney Opernhaus", "Taj Mahal Palast", "Parthenon in Athen", "Budaer Burgpalast",
  "Ungarisches Parlamentsgebäude", "Kettenbrücke mit Steinlöwen", "Fischerbastei mit Türmen", "Neunbogenbrücke",
  "Burg Visegrad auf dem Hügel", "Historische Festung Eger", "Yachthafen am Plattensee", "Abtei Tihany auf der Halbinsel",
  "Tropisches Korallenriff", "Einsame Insel mit Kokospalme", "Sandwüste mit Dünen", "Antarktischer Gletscher mit Eisbergen",
  "Grand Canyon Schlucht", "Niagarafälle", "Amazonas Regenwald", "Schweizer Alpengipfel",
  "Vulkankrater mit Lava", "Tropfsteinhöhle mit unterirdischem See", "Mittelalterliche Ritterburg mit Wassergraben", "Leuchtturm an der Steilküste",
  "Fischerdorf mit Holzsteg", "Lebendige Großstadt mit Wolkenkratzern", "Freizeitpark mit Riesenrad", "Achterbahn mit Looping",
  "Großes Zirkuszelt", "Sternwarte Planetarium", "Naturkundemuseum mit Dinosaurierskelett",
  "Botanischer Garten mit Palmenhaus", "Hauptbahnhof mit Bahnsteigen", "Internationaler Flughafen mit Startbahn"
];

const baseFantasy = [
  "Siebenköpfiger feuerspeiender Drache", "Geflügeltes Pegasus Pferd", "Einhorn mit goldenem Horn",
  "Flammender Phönix Vogel", "Zentaur halb Mensch halb Pferd", "Bergmann-Zwerg mit langem Bart",
  "Waldelfe mit Bogen", "Goldfisch mit drei Wünschen", "Meerjungfrau mit Fischflosse",
  "Mythologische Sirene", "Medusa mit lebendem Schlangenhaar", "Riesiger Zyklop mit einem Auge",
  "Minotaurus Stiermensch", "Kobold mit Topf voller Gold", "Fliegender Zauberteppich",
  "Zauberspiegel im Goldrahmen", "Stein der Weisen mit rotem Glanz", "Zaubertrankflasche mit Rauch",
  "Hexe auf Besenstiel mit schwarzer Katze", "Hexenkessel mit Blasen", "Zauberstab mit Sternenstaub",
  "Kristallkugel mit Zukunftsbild", "Altes Zauberbuch mit Pergamentseiten", "Schwebendes Gespenst mit Ketten",
  "Skelettkrieger mit Schwert und Schild", "Werwolf der den Vollmond anheult", "Vampir im schwarzen Umhang mit Fledermäusen",
  "Riesiger Steinmonster Golem", "Frostriese mit Eiszapfen", "Wunderlampe mit Dschinn-Geist",
  "Schatzkammer mit Goldbergen", "Verzauberter Froschkönig mit Krone", "Glasschuh auf Samtkissen"
];

const baseVehicles = [
  "Dampflokomotive mit Rauchwolke", "Hochgeschwindigkeitszug Magnetschwebebahn", "Roter Doppeldeckerbus", "Gelber Schulbus",
  "Straßenbahn mit Stromabnehmer", "U-Bahn im Tunnel", "Oberleitungsbus Trolleybus",
  "Krankenwagen mit Blaulicht und Sirene", "Feuerwehrauto mit Drehleiter", "Polizeiwagen mit Sirene", "Post-Lieferwagen mit Paketen",
  "Gelbes Taxi mit Karomuster", "Müllwagen mit Müllpresse", "Betonmischer mit rotierender Trommel", "Schneepflug beim Räumen",
  "Dampfwalze auf heißem Asphalt", "Planierraupe Bulldozer", "Bagger mit Schaufel", "Bau-Kran mit Lasthaken",
  "Traktor mit Pflug und Anhänger", "Mähdrescher bei der Weizenernte", "Schwerer LKW-Sattelzug",
  "Geländewagen im Schlamm", "Sportliches Cabriolet mit offenem Verdeck", "Luxus-Stretchlimousine mit getönten Scheiben",
  "Wohnmobil Campingbus", "Oldtimer Oldtimer-Auto", "Supersport-Rennmotorrad", "Motorroller mit Schutzhelm",
  "Elektrischer Tretroller", "Segelyacht mit weißen Segeln", "Raddampfer mit Schaufelrad", "Luxus-Kreuzfahrtschiff",
  "Containerschiff Frachtschiff", "Fischkutter mit Schleppnetzen", "U-Boot mit Periskop", "Luftkissenboot über Wasser",
  "Doppeldecker-Flugzeug", "Passagierflugzeug", "Überschall-Kampfflugzeug",
  "Rettungshubschrauber mit Trage", "Riesiges Zeppelin-Luftschiff", "Heißluftballon mit Korb und Gasbrenner",
  "Hängegleiter mit Pilot", "Raumfähre Space Shuttle", "Mondauto Mondrover mit Antennenschüssel", "Satellit mit Solarsegeln"
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

export const germanWordCategories = {
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

export const germanWords = Array.from(new Set([
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
