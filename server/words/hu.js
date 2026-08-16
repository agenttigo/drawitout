// Hungarian Word Database - Clean, Rich & Real Words (No artificial compound prefixes)

const baseGeneral = [
  "Naplemente", "Gitár", "Fagylalt", "Repülőgép", "Hóember", "Várkastély", "Világítótorony",
  "Szemüveg", "Esernyő", "Vitorláshajó", "Zongora", "Kaktusz", "Helikopter", "Dinoszaurusz",
  "Hátizsák", "Búvár", "Asztronauta", "Mikroszkóp", "Karácsonyfa", "Hőlégballon", "Tábortűz",
  "Szivárvány", "Vulkán", "Vízesés", "Piramis", "Kincsesláda", "Kulcs", "Lakat", "Gördeszka",
  "Kerékpár", "Motorbicikli", "Távcső", "Fényképezőgép", "Karóra", "Iránytű", "Földgömb",
  "Korona", "Gyémánt", "Lufi", "Ejtőernyő", "Cipő", "Kalap", "Napszemüveg", "Kesztyű", "Csizma",
  "Focilabda", "Sátor", "Hinta", "Csúszda", "Tükör", "Lámpa", "Festmény", "Torta", "Dob",
  "Hegedű", "Trombita", "Csillag", "Telihold", "Napocska", "Bárányfelhő", "Villám", "Hópehely",
  "Fenyőerdő", "Cseppkőbarlang", "Tengerpart", "Pálmasziget", "Függőhíd", "Vasútállomás",
  "Szélmalom", "Mentőautó", "Tűzoltóautó", "Rendőrautó", "Tengeralattjáró", "Űrrakéta",
  "Királyi palota", "Horgászbot", "Hajóhorgony", "Varázspálca", "Ajándékdoboz", "Ceruza",
  "Toll", "Radír", "Vonalzó", "Olló", "Könyv", "Bélyeges levél", "Virágcserép", "Napraforgó",
  "Piros rózsa", "Tulipán", "Gomba", "Kagylóhéj", "Homokvár", "Szánkó", "Jégkorcsolya",
  "Snowboard", "Síléc", "Aranyérem", "Győztes kupa", "Nemzeti zászló", "Templomharang",
  "Zseblámpa", "Tűzijáték", "Kerekeskút", "Malacpersely", "Aranytallér", "Bőrönd", "Pénztárca",
  "Televízió", "Rádió", "Kávéfőző", "Kenyérpirító", "Mikrohullámú sütő", "Hűtőszekrény",
  "Mosógép", "Porszívó", "Vasaló", "Varrógép", "Hajszárító", "Fogkefe", "Szappan",
  "Törölköző", "Párna", "Paplan", "Függöny", "Szőnyeg", "Kandalló", "Hintaszék", "Kerti pad",
  "Postaláda", "Szemeteskuka", "Létra", "Talicska", "Ásó", "Gereblye", "Locsolókanna",
  "Fűnyíró", "Hintaágy", "Madáretető", "Madárijesztő", "Napágy", "Napernyő", "Úszógumi",
  "Mentőmellény", "Szörfdeszka", "Búvárszemüveg", "Békatalp", "Kenu", "Kajak", "Evező",
  // Új 100+ szavak gyűjteménye:
  "Szemüvegtok", "Kulcstartó", "Hógömb", "Lakatkulcs", "Szélcsengő", "Kertitörpe", "Fürdőkád",
  "Sárkányrepülő", "Karácsonyi gömb", "Görkorcsolya", "Fényképkeret", "Horgászháló", "Búvármaszk",
  "Esernyőtartó", "Csillagszóró", "Kávéskanna", "Szendvicssütő", "Borosdugó", "Diótörő",
  "Fenyőtoboz", "Színes ceruzák", "Hátitáska", "Cukortartó", "Teáskanna", "Palacsintasütő",
  "Műkincs", "Kincses térkép", "Kalózhajó", "Lovagi páncél", "Varázsgömb", "Varázskönyv",
  "Kísértetház", "Űrsisak", "Repülőcsészealj", "Társasjáték", "Rubik kocka", "Jojó",
  "Plüssmaci", "Gumikacsa", "Vízibicikli", "Síugrósánc", "Csocsóasztal", "Darts tábla",
  "Bowling golyó", "Teniszütő", "Boxkesztyű", "Focikapu", "Kosárlabdapalánk", "Bajnoki serleg",
  "Ébresztőóra", "Homokóra", "Falióra", "Szemeteslapát", "Függőágy", "Kerti grill",
  "Bogrács", "Tábori sátor", "Hálózsák", "Zsebkés", "Kulacs", "Fejlámpa", "Csillagkép",
  "Hullócsillag", "Északi fény", "Napfogyatkozás", "Szélkakas", "Postagalamb", "Papagájkalitka", "Akvárium"
];

const baseTech = [
  "Robot", "Laptop", "Okostelefon", "Billentyűzet", "Számítógépes egér", "Szerver", "Wifi router",
  "Fejhallgató", "Mikrofon", "Számítógép monitor", "Pendrive", "Webkamera", "Drón",
  "Virtuális valóság szemüveg", "Videókártya", "Processzor", "Alaplap", "Merevlemez",
  "Színes nyomtató", "Szkenner", "Projektor", "Bluetooth hangszóró", "Távközlési műhold",
  "Csillagászati teleszkóp", "Elektronmikroszkóp", "Lézermutató", "Akkumulátor", "Powerbank",
  "Okosóra", "Vezeték nélküli fülhallgató", "Játékkonzol", "Joystick", "Kormánykerék",
  "Adatbázis", "Felhőtárhely", "Programkód", "Kiber hacker", "Titkos jelszó", "Képpont",
  "Érintőképernyő", "3D nyomtató", "Hologram", "Szuperszámítógép", "Optikai kábel",
  "Napelem", "Szélerőmű turbina", "Elektromos autó gyorstöltő", "Kvantumszámítógép",
  "Mesterséges intelligencia", "Távirányító", "USB kábel", "HDMI csatlakozó", "Memóriakártya"
];

const baseMovies = [
  "Pókember", "Batman", "Superman", "Joker", "Harry Potter", "Pikachu", "Spongyabob",
  "Shrek", "Mickey Egér", "Donald Kacsa", "Minyonok", "Gru", "Darth Vader", "Yoda mester",
  "Hulk", "Vasember", "Thor", "Amerika Kapitány", "Nemo kapitány", "Szimba az oroszlánkirály",
  "Aladdin a csodalámpával", "Tarzan", "Dumbo a repülő elefánt", "Pinokkió", "Hamupipőke",
  "Hófehérke", "Nindzsa harcos", "Karib-tengeri kalóz", "Varázsló tanonc", "Szuperhős",
  "Tűzokádó sárkány", "Vámpír", "Zombi", "Kísértet", "Egyiptomi múmia", "Frankenstein szörnye",
  "T-Rex dinoszaurusz", "Robin Hood", "Sherlock Holmes", "Drakula gróf", "Jack Sparrow kapitány",
  "Super Mario", "Luigi", "Sonic a sündisznó", "Pac-Man", "Minecraft Steve", "Elza jégvarázs",
  "Olaf a hóember", "Szamár a Shrekből", "Csizmás Kandúr", "Gandalf a mágus", "Gollam",
  "Terminátor robot", "Gladiátor", "Villám McQueen autó", "Wall-E robot", "Lecsó a séfpatkány"
];

const baseFood = [
  "Olasz pizza", "Sajtos hamburger", "Kakaós palacsinta", "Fokhagymás lángos", "Kürtőskalács",
  "Bográcsos gulyásleves", "Ropogós sült krumpli", "Sonkás szendvics", "Mustáros hotdog",
  "Lekváros fánk", "Vanília fagylalt", "Csokoládés muffin", "Tábla csokoládé", "Dobostorta",
  "Túrós rétes", "Somlói galuska", "Tejfölös pogácsa", "Friss croissant", "Bolognai spagetti",
  "Mexikói taco", "Avokádós burrito", "Lazacos sushi", "Belga gofri", "Fahéjas almás pite",
  "Sárga banán", "Piros alma", "Édes narancs", "Savanyú citrom", "Friss eper", "Erdei málna",
  "Görögdinnye szelet", "Mézes sárgadinnye", "Szőlőfürt", "Őszibarack", "Kék szilva",
  "Piros cseresznye", "Trópusi ananász", "Zöld kivi", "Érett avokádó", "Kerti paradicsom",
  "Zöldpaprika", "Kígyóuborka", "Sárgarépa", "Főtt kukorica", "Trappista sajt", "Kovászos kenyér",
  "Forró feketekávé", "Citromos tea", "Forró kakaó tejszínhabbal", "Hűsítő limonádé",
  "Frissen facsart gyümölcslé", "Vajas pattogatott kukorica", "Sós perec", "Akácméz",
  "Eperlekvár", "Tükörtojás", "Sonkás rántotta", "Bécsi rántott hús", "Szegedi halászlé",
  "Töltött káposzta", "Túró rudi", "Gesztenyepüré tejszínhabbal", "Szilvás gombóc",
  // Új finom ételek:
  "Vattacukor", "Mézeskalács házikó", "Eperkrémleves", "Rántott sajt", "Császármorzsa",
  "Mákos guba", "Szilvás lepény", "Csokifondü", "Banánturmix"
];

const baseAnimals = [
  "Afrikai oroszlán", "Csíkos tigris", "Óriás elefánt", "Nyakas zsiráf", "Fekete-fehér zebra",
  "Csimpánz majom", "Gorilla", "Barna medve", "Jegesmedve", "Óriáspanda", "Szürke farkas",
  "Vörös róka", "Tapsifüles nyuszi", "Mókus makkal", "Tüskés süni", "Bőregér denevér",
  "Házikutya", "Cirmos cica", "Paripa ló", "Boci tehén", "Göndör bárány", "Házikecske",
  "Kismalac", "Csacsi szamár", "Púpos teve", "Láma", "Ugráló kenguru", "Koalamaci",
  "Nílusi krokodil", "Páncélos teknősbéka", "Zöld gyík", "Színváltó kaméleon", "Tekeredő kígyó",
  "Zöld levelibéka", "Fehérfejű rétisas", "Bölcs bagoly", "Vándorsólyom", "Színes papagáj",
  "Rózsaszín flamingó", "Kecses hattyú", "Vadkacsa", "Háziliba", "Fehér gólya", "Füsti fecske",
  "Feketerigó", "Császárpingvin", "Ugró delfin", "Kék bálna", "Gyilkos bálna orka",
  "Fehér cápa", "Tengeri rája", "Nyolckarú polip", "Óriás tintahal", "Világító medúza",
  "Tengeri csillag", "Csikóhal", "Folyami rák", "Tengeri homár", "Színpompás pillangó",
  "Hétpettyes katicabogár", "Szorgos méhecske", "Vöröshangya", "Szitakötő", "Keresztespók",
  "Skorpió", "Agancsos szarvas", "Kecses őzike", "Vaddisznó", "Fóka", "Agyaras rozmár",
  "Vidra hallal", "Hód fatörzzsel", "Tengeri teknős", "Páva tollakkal", "Pelidián pelikán",
  // Új állatok:
  "Strucc", "Vadpulyka", "Szurikáta", "Kacsacsőrű emlős", "Mosómedve", "Lajhár",
  "Kenguru", "Páva", "Kolibri", "Tengerimalac", "Hörcsög"
];

export const hungarianWordCategories = {
  general: baseGeneral,
  tech: baseTech,
  movies: baseMovies,
  food: baseFood,
  animals: baseAnimals,
};

export const hungarianWords = Array.from(new Set([
  ...baseGeneral,
  ...baseTech,
  ...baseMovies,
  ...baseFood,
  ...baseAnimals,
]));
