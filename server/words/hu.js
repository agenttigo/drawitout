// Hungarian Word Database - 750+ Clean, Rich & Real Guessable Drawing Words

const baseGeneral = [
  // Hétköznapi tárgyak, otthon, kiegészítők
  "Naplemente", "Gitár", "Fagylalt", "Repülőgép", "Hóember", "Várkastély", "Világítótorony",
  "Szemüveg", "Esernyő", "Vitorláshajó", "Zongora", "Kaktusz", "Helikopter", "Dinoszaurusz",
  "Hátizsák", "Búvár", "Asztronauta", "Mikroszkóp", "Karácsonyfa", "Hőlégballon", "Tábortűz",
  "Szivárvány", "Vulkán", "Vízesés", "Piramis", "Kincsesláda", "Kulcs", "Lakat", "Gördeszka",
  "Kerékpár", "Motorbicikli", "Távcső", "Fényképezőgép", "Karóra", "Iránytű", "Földgömb",
  "Korona", "Gyémánt", "Lufi", "Ejtőernyő", "Cipő", "Kalap", "Napszemüveg", "Kesztyű", "Csizma",
  "Focilabda", "Sátor", "Hinta", "Csúszda", "Tükör", "Lámpa", "Festmény", "Torta", "Dob",
  "Hegedű", "Trombita", "Csillag", "Telihold", "Napocska", "Bárányfelhő", "Villám", "Hópehely",
  "Fenyőerdő", "Cseppkőbarlang", "Tengerpart", "Pálmasziget", "Függőhíd", "Vasútállomás",
  "Szélmalom", "Királyi palota", "Horgászbot", "Hajóhorgony", "Varázspálca", "Ajándékdoboz",
  "Ceruza", "Toll", "Radír", "Vonalzó", "Olló", "Könyv", "Bélyeges levél", "Virágcserép",
  "Napraforgó", "Piros rózsa", "Tulipán", "Gomba", "Kagylóhéj", "Homokvár", "Szánkó",
  "Jégkorcsolya", "Snowboard", "Síléc", "Aranyérem", "Győztes kupa", "Nemzeti zászló",
  "Templomharang", "Zseblámpa", "Tűzijáték", "Kerekeskút", "Malacpersely", "Aranytallér",
  "Bőrönd", "Pénztárca", "Televízió", "Rádió", "Kávéfőző", "Kenyérpirító", "Mikrohullámú sütő",
  "Hűtőszekrény", "Mosógép", "Porszívó", "Vasaló", "Varrógép", "Hajszárító", "Fogkefe",
  "Szappan", "Törölköző", "Párna", "Paplan", "Függöny", "Szőnyeg", "Kandalló", "Hintaszék",
  "Kerti pad", "Postaláda", "Szemeteskuka", "Létra", "Talicska", "Ásó", "Gereblye",
  "Locsolókanna", "Fűnyíró", "Hintaágy", "Madáretető", "Madárijesztő", "Napágy", "Napernyő",
  "Úszógumi", "Mentőmellény", "Szörfdeszka", "Búvárszemüveg", "Békatalp", "Kenu", "Kajak",
  "Evező", "Szemüvegtok", "Kulcstartó", "Hógömb", "Lakatkulcs", "Szélcsengő", "Kertitörpe",
  "Fürdőkád", "Sárkányrepülő", "Karácsonyi gömb", "Görkorcsolya", "Fényképkeret", "Horgászháló",
  "Búvármaszk", "Esernyőtartó", "Csillagszóró", "Kávéskanna", "Szendvicssütő", "Borosdugó",
  "Diótörő", "Fenyőtoboz", "Színes ceruzák", "Hátitáska", "Cukortartó", "Teáskanna",
  "Palacsintasütő", "Műkincs", "Kincses térkép", "Kalózhajó", "Lovagi páncél", "Varázsgömb",
  "Varázskönyv", "Kísértetház", "Űrsisak", "Repülőcsészealj", "Társasjáték", "Rubik kocka",
  "Jojó", "Plüssmaci", "Gumikacsa", "Vízibicikli", "Síugrósánc", "Csocsóasztal", "Darts tábla",
  "Bowling golyó", "Teniszütő", "Boxkesztyű", "Focikapu", "Kosárlabdapalánk", "Bajnoki serleg",
  "Ébresztőóra", "Homokóra", "Falióra", "Szemeteslapát", "Függőágy", "Kerti grill",
  "Bogrács", "Tábori sátor", "Hálózsák", "Zsebkés", "Kulacs", "Fejlámpa", "Csillagkép",
  "Hullócsillag", "Északi fény", "Napfogyatkozás", "Szélkakas", "Postagalamb", "Papagájkalitka",
  "Akvárium", "Gitártok", "Kottaállvány", "Metronóm", "Harmonika", "Szájharmonika", "Furulya",
  "Oboa", "Hárfa", "Csembaló", "Csörgődob", "Képeslap", "Kötőtű", "Varrócérna", "Gyűszű",
  "Biztostű", "Cipőfűző", "Cipőkanál", "Csipesz", "Ruhafogas", "Konzervnyitó", "Dugóhúzó",
  "Reszelő", "Habverő", "Fakanál", "Merőkanál", "Vágódeszka", "Konyhai mérleg", "Időzítő óra"
];

const baseAnimals = [
  // Emlősök, ragadozók, háziállatok
  "Afrikai oroszlán", "Csíkos tigris", "Óriás elefánt", "Nyakas zsiráf", "Fekete-fehér zebra",
  "Csimpánz majom", "Gorilla", "Barna medve", "Jegesmedve", "Óriáspanda", "Szürke farkas",
  "Vörös róka", "Tapsifüles nyuszi", "Mókus makkal", "Tüskés süni", "Bőregér denevér",
  "Házikutya", "Cirmos cica", "Paripa ló", "Boci tehén", "Göndör bárány", "Házikecske",
  "Kismalac", "Csacsi szamár", "Púpos teve", "Láma", "Ugráló kenguru", "Koalamaci",
  // Hüllők, kétéltűek, tengeri állatok
  "Nílusi krokodil", "Páncélos teknősbéka", "Zöld gyík", "Színváltó kaméleon", "Tekeredő kígyó",
  "Zöld levelibéka", "Fehér cápa", "Tengeri rája", "Nyolckarú polip", "Óriás tintahal",
  "Világító medúza", "Tengeri csillag", "Csikóhal", "Folyami rák", "Tengeri homár",
  "Ugró delfin", "Kék bálna", "Gyilkos bálna orka", "Fóka", "Agyaras rozmár", "Tengeri teknős",
  "Kardhal", "Kalapácsfejű cápa", "Elektromos rája", "Bohóchal", "Muréna",
  // Madarak
  "Fehérfejű rétisas", "Bölcs bagoly", "Vándorsólyom", "Színes papagáj", "Rózsaszín flamingó",
  "Kecses hattyú", "Vadkacsa", "Háziliba", "Fehér gólya", "Füsti fecske", "Feketerigó",
  "Császárpingvin", "Páva tollakkal", "Pelikán", "Strucc", "Vadpulyka", "Kolibri",
  "Harkály fatörzsön", "Kárókatona", "Sirály a tengeren", "Papagájbúvár lunda", "Kivi madár",
  // Rovarok és kisállatok
  "Színpompás pillangó", "Hétpettyes katicabogár", "Szorgos méhecske", "Vöröshangya",
  "Szitakötő", "Keresztespók", "Skorpió", "Sáska", "Szentjánosbogár", "Szarvasbogár",
  // Erdei és egzotikus vadállatok
  "Agancsos szarvas", "Kecses őzike", "Vaddisznó", "Vidra hallal", "Hód fatörzzsel",
  "Szurikáta", "Kacsacsőrű emlős", "Mosómedve", "Lajhár", "Tengerimalac", "Hörcsög",
  "Gepárd", "Párduc", "Jaguár", "Hiéna", "Víziló", "Orrszarvú", "Hangyász",
  "Tatou páncélos", "Alpaka", "Vombat", "Tasmán ördög", "Sarki róka", "Rénszarvas",
  "Bölény", "Japán makákó", "Lemur maki", "Kobra kígyó", "Csörgőkígyó", "Anakonda"
];

const baseFood = [
  // Főételek, nemzetközi finomságok
  "Olasz pizza", "Sajtos hamburger", "Kakaós palacsinta", "Fokhagymás lángos", "Kürtőskalács",
  "Bográcsos gulyásleves", "Ropogós sült krumpli", "Sonkás szendvics", "Mustáros hotdog",
  "Lekváros fánk", "Vanília fagylalt", "Csokoládés muffin", "Tábla csokoládé", "Dobostorta",
  "Túrós rétes", "Somlói galuska", "Tejfölös pogácsa", "Friss croissant", "Bolognai spagetti",
  "Mexikói taco", "Avokádós burrito", "Lazacos sushi", "Belga gofri", "Fahéjas almás pite",
  "Bécsi rántott hús", "Szegedi halászlé", "Töltött káposzta", "Túró rudi", "Gesztenyepüré",
  "Szilvás gombóc", "Vattacukor", "Mézeskalács házikó", "Eperkrémleves", "Rántott sajt",
  "Császármorzsa", "Mákos guba", "Szilvás lepény", "Csokifondü", "Banánturmix",
  "Lasagne", "Ramen tésztaleves", "Kebab tekercs", "Sült kolbász", "Gyros pitában",
  "Húsleves cérnametélttel", "Brassói aprópecsenye", "Paprikás csirke", "Lencsefőzelék",
  "Sajttál szőlővel", "Omlós sült tarja", "Rántott gomba", "Görög saláta feta sajttal",
  // Gyümölcsök és zöldségek
  "Sárga banán", "Piros alma", "Édes narancs", "Savanyú citrom", "Friss eper", "Erdei málna",
  "Görögdinnye szelet", "Mézes sárgadinnye", "Szőlőfürt", "Őszibarack", "Kék szilva",
  "Piros cseresznye", "Trópusi ananász", "Zöld kivi", "Érett avokádó", "Kerti paradicsom",
  "Zöldpaprika", "Kígyóuborka", "Sárgarépa", "Főtt kukorica", "Brokkoli", "Karfiol",
  "Cékla", "Padlizsán", "Cukkini", "Fokhagyma koszorú", "Vöröshagyma", "Póréhagyma",
  "Retekcsomó", "Zöldborsó hüvelyben", "Spenótlevél", "Sütőtök", "Gesztenye", "Dióbél",
  "Mogyoró", "Mandula", "Pisztácia", "Fekete áfonya", "Grépfrút", "Gránátalma",
  // Pékáruk, reggelik és italok
  "Trappista sajt", "Kovászos kenyér", "Friss zsemle", "Kifli", "Perec", "Kalács",
  "Forró feketekávé", "Citromos tea", "Forró kakaó tejszínhabbal", "Hűsítő limonádé",
  "Frissen facsart gyümölcslé", "Vajas pattogatott kukorica", "Akácméz", "Eperlekvár",
  "Tükörtojás", "Sonkás rántotta", "Lágytojás", "Jegeskávé", "Gyümölcsturmix",
  "Kapucsínó tejhabbal", "Espresso", "Gyömbéres tea", "Forralt bor", "Puncs"
];

const baseTech = [
  // Hardver, kütyük és elektronika
  "Robot", "Laptop", "Okostelefon", "Billentyűzet", "Számítógépes egér", "Szerver", "Wifi router",
  "Fejhallgató", "Mikrofon", "Számítógép monitor", "Pendrive", "Webkamera", "Drón",
  "Virtuális valóság szemüveg", "Videókártya", "Processzor", "Alaplap", "Merevlemez",
  "Színes nyomtató", "Szkenner", "Projektor", "Bluetooth hangszóró", "Távközlési műhold",
  "Csillagászati teleszkóp", "Elektronmikroszkóp", "Lézermutató", "Akkumulátor", "Powerbank",
  "Okosóra", "Vezeték nélküli fülhallgató", "Játékkonzol", "Joystick", "Kormánykerék",
  "Adatbázis", "Felhőtárhely", "Programkód", "Kiber hacker", "Titkos jelszó", "Képpont",
  "Érintőképernyő", "3D nyomtató", "Hologram", "Szuperszámítógép", "Optikai kábel",
  "Napelem", "Szélerőmű turbina", "Elektromos autó gyorstöltő", "Kvantumszámítógép",
  "Mesterséges intelligencia", "Távirányító", "USB kábel", "HDMI csatlakozó", "Memóriakártya",
  "Lézerkard", "Okos szemüveg", "Fitnesz karkötő", "Biztonsági kamera", "Riasztórendszer",
  "Mozgásérzékelő", "Hőszenzor", "Okos termosztát", "Automata porszívó robot", "Kábelcsatorna",
  "Hálózati kapcsoló switch", "Szerver rack szekrény", "Hangfal", "Erősítő", "Keverőpult",
  "Stúdió mikrofon állvánnyal", "Zöld háttér green screen", "LED fénycsík", "Napelemes tető"
];

const baseMovies = [
  // 1900-as évek IMDb Klasszikusok (1900-1909)
  "Utazás a Holdba", "A nagy vonatrablás", "Az ördög kastélya", "Gulliver utazásai",
  "A lehetetlen utazás", "Alíz Csodaországban", "Egy amerikai tűzoltó élete", "Jeanne d'Arc",
  "Robinson Crusoe", "Az aranybogár",

  // 1910-es évek IMDb Klasszikusok (1910-1919)
  "Egy nemzet születése", "Türelmetlenség", "A csavargó", "Cabiria",
  "A nyomorultak", "20000 mérföld a tenger alatt", "A Gólem", "Dr. Caligari",
  "Frankenstein", "A majomember",

  // 1920-as évek IMDb Klasszikusok (1920-1929)
  "Metropolis", "Nosferatu", "A kölyök", "Aranyláz",
  "A generális", "Patyomkin páncélos", "Virradat", "Jeanne d'Arc szenvedései",
  "A cirkusz", "Andalúziai kutya",

  // 1930-as évek IMDb Klasszikusok (1930-1939)
  "Elfújta a szél", "Óz, a csodák csodája", "Modern idők", "Nagyvárosi fények",
  "Hófehérke és a hét törpe", "King Kong", "M – Egy város keresi a gyilkost",
  "Nyugaton a helyzet változatlan", "Drakula", "A nagy ábránd",

  // 1940-es évek IMDb Klasszikusok (1940-1949)
  "Casablanca", "Az élet csodaszép", "Aranypolgár", "A diktátor",
  "Biciklitolvajok", "A máltai sólyom", "Gyilkos vagyok", "Pinokkió",
  "A Sierra Madre kincse", "A harmadik ember",

  // 1950-es évek IMDb Klasszikusok (1950-1959)
  "A hét szamuráj", "Tizenkét dühös ember", "Hátsó ablak", "Szédülés",
  "Ének az esőben", "Alkony sugárút", "Ben-Hur", "Híd a Kwai folyón",
  "A hetedik pecsét", "Van, aki forrón szereti",

  // 1960-as évek IMDb Klasszikusok (1960-1969)
  "A Jó, a Rossz és a Csúf", "Psycho", "2001: Űrodüsszeia", "Arábiai Lawrence",
  "Volt egyszer egy Vadnyugat", "Ne bántsátok a feketerigót!", "Dr. Strangelove",
  "A muzsika hangja", "Mary Poppins", "Diploma előtt",

  // 1970-es évek IMDb Klasszikusok (1970-1979)
  "A Keresztapa", "A Keresztapa II", "Csillagok háborúja", "A cápa",
  "Apokalipszis most", "Taxisofőr", "A nyolcadik utas: a Halál", "Mechanikus narancs",
  "Száll a kakukk fészkére", "Rocky",

  // 1980-as évek IMDb Klasszikusok (1980-1989)
  "A Birodalom visszavág", "Vissza a jövőbe", "Ragyogás", "Az elveszett frigyláda fosztogatói",
  "Szárnyas fejvadász", "Terminátor – A halálosztó", "E.T., a földönkívüli", "Holt költők társasága",
  "A sebhelyesarcú", "Szellemirtók",

  // 1990-es évek IMDb Klasszikusok (1990-1999)
  "A remény rabjai", "Ponyvaregény", "Schindler listája", "Harcosok klubja",
  "Mátrix", "Forrest Gump", "A bárányok hallgatnak", "Jurassic Park",
  "Az oroszlánkirály", "Titanic",

  // 2000-es évek IMDb Klasszikusok (2000-2009)
  "A sötét lovag", "A Gyűrűk Ura: A király visszatér", "A Gyűrűk Ura: A gyűrű szövetsége",
  "Gladiátor", "Chihiro Szellemországban", "Mementó", "WALL-E",
  "Becstelen brigantyk", "A Karib-tenger kalózai: A Fekete Gyöngy átka", "Egy makulátlan elme örök ragyogása",

  // 2010-es évek IMDb Klasszikusok (2010-2019)
  "Eredet", "Csillagok között", "Élősködők", "Pókember: Irány a Pókverzum!",
  "Whiplash", "Coco", "Mad Max: A harag útja", "Bosszúállók: Végjáték",
  "Joker", "Kaliforniai álom",

  // 2020-as évek IMDb Klasszikusok (2020-2029)
  "Dűne", "Dűne: Második rész", "Oppenheimer", "Minden, mindenhol, mindenkor",
  "Pókember: Nincs hazaút", "Top Gun: Maverick", "Batman", "Avatar: A víz útja",
  "Barbie", "Szegény párák"
];

const baseSports = [
  // Sportágak, eszközök, versenypályák
  "Labdarúgás", "Kosárlabda", "Kézilabda", "Röplabda", "Teniszlabda", "Asztalitenisz pingpong",
  "Tollaslabda", "Vízilabda", "Jégkorong kapuval", "Biliárdasztal dákóval", "Bowling bábu",
  "Sakk játszma mattal", "Darts nyíl táblával", "Íj és nyíl célponttal", "Sportpuska céllövészet",
  "Úszóverseny rajtkővel", "Műugró torony", "Kajak-kenu pálya", "Evezős nyolcas", "Vitorlásverseny regatta",
  "Szörfözés óriáshullámon", "Siklóernyőzés hegyről", "Sziklamászás kötéllel", "Barlangászat sisaklámpával",
  "Hegyi kerékpározás downhill", "Országúti kerékpárverseny", "Maratoni futóverseny", "Gátfutás",
  "Magasugrás", "Távolugrás", "Rúdugrás", "Gerelyhajítás", "Diszkoszvetés", "Súlylökés",
  "Bokszmérkőzés szorítóban", "Birkózás", "Cselgáncs judo dobás", "Karate ütés", "Taekwondo rúgás",
  "Vívás tőrrel és maszkkal", "Lovas díjugratás", "Formula 1 versenyautó", "Gokart pálya",
  "Műkorcsolya piruett", "Gyorskorcsolya", "Sílesiklás szlalompályán", "Sífutás", "Síugrás sáncról",
  "Bobcsapat jégcsatornában", "Curling seprűvel és kővel", "Gördeszkás félcső rámpa", "Parkour ugrás házfalon"
];

const baseProfessions = [
  // Szakmák, hivatások és mesterségek
  "Tűzoltó fecskendővel", "Rendőrtiszt jelvénnyel", "Mentőorvos sztetoszkóppal", "Sebész szikével",
  "Fogorvos fúróval", "Állatorvos kutyussal", "Gyógyszerész patikában", "Építészmérnök tervrajzzal",
  "Kőműves vakolókanállal", "Ács fagerendával", "Asztalos gyaluval", "Vízvezetékszerelő csavarkulccsal",
  "Villanyszerelő fázisceruzával", "Autószerelő emelővel", "Festőművész festőállvánnyal",
  "Szobrász vésővel és agyaggal", "Fotóriporter teleobjektívvel", "Operatőr kamerával",
  "Híradó bemondó mikrofonnal", "Újságíró jegyzetfüzettel", "Cukrász habverővel", "Főszakács fazékkal",
  "Pék friss kenyérrel", "Pincér tálcával", "Báros koktél shakerrel", "Kertész metszőollóval",
  "Erdész puskával és távcsővel", "Búvár oxigénpalackkal", "Repülőgép pilóta", "Légikísérő stewardess",
  "Űrhajós szkafanderben", "Hajóskapitány kormánnyal", "Matróz horgonykötéllel", "Vonatvezető masiniszta",
  "Buszvezető jegykiadóval", "Balerina spicc-cipőben", "Karmester pálcával", "Operaénekes",
  "Bűvész cilinderrel és nyúllal", "Cirkuszi akrobata trapézon", "Zsonglőr karikákkal",
  "Bohóc piros orral", "Régész ecsettel és lelettel", "Bányász csákánnyal", "Tanító kréttával és táblával"
];

const basePlaces = [
  // Földrajzi helyek, híres épületek és látványosságok
  "Eiffel-torony Párizsban", "Píza ferde tornya", "Római Colosseum", "Gízai nagy piramis",
  "Egyiptomi szfinx", "Kínai nagy fal", "Szabadság-szobor New Yorkban", "Big Ben toronyóra Londonban",
  "Sydney-i operaház", "Tádzs Mahal palota", "Parthenon Athénban", "Budavári palota",
  "Budapesti Országház", "Lánchíd oroszlánnal", "Halászbástya csúcsos tornyokkal", "Hortobágyi kilenclyukú híd",
  "Visegrádi fellegvár", "Egri vár bástyákkal", "Balatoni vitorláskikötő", "Tihanyi apátság",
  "Trópusi korallzátony", "Lakatlan sziget kókuszpálmával", "Homoksivatag dűnékkel", "Jeges déli-sark gleccserrel",
  "Grand Canyon szurdok", "Niagara vízesés", "Amazonasi esőerdő", "Svájci Alpok hegycsúcs",
  "Vulkán kráter lávával", "Cseppkőbarlang tóval", "Középkori lovagvár vizesárokkal", "Tengerparti világítótorony",
  "Halászfalu mólóval", "Nyüzsgő nagyváros felhőkarcolókkal", "Vidámpark óriáskerékkel", "Hullámvasút kanyarokkal",
  "Cirkuszi nagysátor", "Csillagvizsgáló planetárium", "Természettudományi múzeum dinoszaurusz csontvázzal",
  "Botanikus kert pálmaházzal", "Központi pályaudvar peronokkal", "Nemzetközi repülőtér kifutópályával"
];

const baseFantasy = [
  // Mesebeli, mitológiai és fantázia lények, varázstárgyak
  "Tűzokádó hétfejű sárkány", "Szárnyas Pegazus ló", "Egyszarvú unikornis arany szarvval",
  "Lángoló Főnixmadár", "Félig ember félig ló kentaur", "Bányász törpe szakállal",
  "Hosszúfülű erdei tünde elf", "Aranyhalacska három kívánsággal", "Tengeri sellő halfarokkal",
  "Görög mitológiai szirén", "Kővé dermesztő Medúsza kígyóhajjal", "Óriás küklopsz egy szemmel",
  "Minótaurosz bikafejű ember", "Smaragdzöld kobold aranyosfazékkal", "Repülő szőnyeg bojtos szélekkel",
  "Varázstükör aranykeretben", "Bölcsek köve vörös fénnyel", "Varázsital üvegben füstölögve",
  "Boszorkány seprűnyélen macskával", "Boszorkány üst buborékokkal", "Varázspálca csillagporral",
  "Kristálygömb jövőbelátó képpel", "Varázslókönyv pergamenlapokkal", "Lebegő szellem láncokkal",
  "Csontvázharcos karddal és pajzzsal", "Vérfarkas teliholdnál vonítva", "Fekete köpenyes vámpír denevérrel",
  "Óriás kőszörny Gólem", "Hóóriás jégtüskékkel", "Mágikus lámpás Dzsinn szellemmel",
  "Kincseskamra aranyhegyekkel", "Elvarázsolt királyfi békaként koronával", "Üvegcipellő selyempárnán"
];

const baseVehicles = [
  // Járművek szárazföldön, vízen, levegőben és űrben
  "Gőzmozdony füstfelhővel", "Nagysebességű mágnesvonat", "Piros emeletes busz", "Sárga iskolabusz",
  "Városi villamos áramszedővel", "Metrószerelvény alagútban", "Trolibusz felsővezetékkel",
  "Mentőautó szirénával", "Tűzoltóautó létrával", "Rendőrautó villogóval", "Postás furgon csomagokkal",
  "Taxiautó kockás csíkkal", "Szemetesautó présgéppel", "Betonkeverő forgó dobbal", "Hókotró tolólappal",
  "Úthenger forró aszfalttal", "Buldózer lánctalppal", "Markológép kanállal", "Daru gémkampóval",
  "Traktor ekével és pótkocsival", "Kombájn gabonaaratáskor", "Kamion hosszú pótkocsival",
  "Terepjáró sárban", "Sportos kabrió nyitott tetővel", "Luxus limuzin sötétített ablakkal",
  "Kemping lakóautó", "Oldtimer veteránautó", "Gyorsasági versenymotor", "Robogó bukósisakkal",
  "Elektromos roller", "Vitorlás jacht fehér vitorlával", "Gőzhajó lapátkerékkel", "Luxus tengerjáró óceánjáró",
  "Konténerszállító teherhajó", "Halászhajó hálókkal", "Tengeralattjáró periszkóppal", "Motoros légpárnás hajó",
  "Sétarepülő kétfedeles géppel", "Légcsavaros utasszállító repülő", "Hangsebesség feletti vadászgép",
  "Mentőhelikopter hordággyal", "Óriás Zeppelin léghajó", "Hőlégballon kosárral és gázégővel",
  "Sárkányrepülő pilótával", "Űrsikló hővédő pajzzsal", "Holdjáró rover antenna tányérral", "Műhold napelem szárnyakkal"
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

export const hungarianWordCategories = {
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

export const hungarianWords = Array.from(new Set([
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

