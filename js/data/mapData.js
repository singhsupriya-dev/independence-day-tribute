/**
 * Interactive Map of Resistance: Regional Hotspots & Historical Epicenters
 */

export const MAP_REGIONS = [
  {
    id: "region-northeast",
    name: "Northeast India (Assam, Meghalaya, Manipur, Nagaland, Mizoram)",
    shortName: "Northeast",
    cx: 82, // relative percentage on map coordinate system
    cy: 38,
    rebellionsCount: 8,
    warriorsCount: 7,
    keyEpicenters: ["Gohpur", "Nongkhlaw", "Tamenglong", "Sarupathar", "Changsil", "Jorhat"],
    summary: "From the Khasi hills to the tea valleys of Assam and the Naga mountain ranges, the Northeast fought armed guerrilla campaigns and civil defiance from 1826 to 1947.",
    featuredHeroes: ["kanaklata-barua", "rani-gaidinliu", "u-tirot-sing", "kushal-konwar", "shoorvir-pasaltha", "maniram-dewan"],
    keyMovement: "Anglo-Khasi War, Heraka Armed Uprising, Mrityu Bahini 1942, Mizo Resistance"
  },
  {
    id: "region-bengal",
    name: "Bengal & East India (West Bengal, Chittagong, Bihar, Jharkhand, Odisha)",
    shortName: "Bengal & East",
    cx: 72,
    cy: 48,
    rebellionsCount: 14,
    warriorsCount: 11,
    keyEpicenters: ["Tamluk", "Chittagong", "Barrackpore", "Dombari Hill", "Bhognadih", "Khordha", "Patna", "Muzaffarpur"],
    summary: "The epicentre of revolutionary societies (Anushilan & Jugantar), massive tribal uprisings (Santhal Hool, Munda Ulgulan), peasant insurgencies (Paika, Indigo), and armed armory raids.",
    featuredHeroes: ["matangini-hazra", "birsa-munda", "pritilata-waddedar", "surya-sen", "khudiram-bose", "sidhu-kanhu-murmu", "bakshi-jagabandhu", "peer-ali-khan", "matadin-bhangi", "devi-chaudhurani", "suniti-santi", "baikuntha-shukla"],
    keyMovement: "Santhal Hool 1855, Paika Bidroha 1817, Chittagong Raid 1930, Tamralipta Sarkar 1942"
  },
  {
    id: "region-north",
    name: "North India (Uttar Pradesh, Punjab, Delhi)",
    shortName: "North India",
    cx: 44,
    cy: 28,
    rebellionsCount: 10,
    warriorsCount: 5,
    keyEpicenters: ["Lucknow", "Jhansi", "Lahore", "Ludhiana", "Kakori", "Meerut", "Prayagraj"],
    summary: "The cradle of the 1857 War of Independence, Ghadar armed mutinies, and the legendary Hindustan Socialist Republican Association (HSRA) underground operations.",
    featuredHeroes: ["durgawati-devi", "begum-hazrat-mahal", "jhalkaribai", "kartar-singh-sarabha"],
    keyMovement: "1857 Siege of Lucknow, Ghadar Conspiracy 1915, Kakori Action 1925, HSRA Underground"
  },
  {
    id: "region-south",
    name: "South India (Tamil Nadu, Karnataka, Andhra Pradesh, Kerala)",
    shortName: "South India",
    cx: 46,
    cy: 78,
    rebellionsCount: 9,
    warriorsCount: 6,
    keyEpicenters: ["Sivaganga", "Kittur", "Rampa Valley", "Tiruppur", "Travancore", "Vellore"],
    summary: "Pioneered armed resistance against the East India Company from the late 18th century (Velu Nachiyar, Kuyili, Rani Chennamma) to the Rampa jungle rebellion and Travancore satyagrahas.",
    featuredHeroes: ["kuyili", "alluri-sitarama-raju", "sangolli-rayanna", "tiruppur-kumaran", "akkamma-cherian", "rani-chennamma", "captain-lakshmi-sahgal"],
    keyMovement: "Sivaganga Liberation 1780, Kittur Rebellion 1824, Rampa War 1922, Travancore March 1938"
  },
  {
    id: "region-west",
    name: "West India (Maharashtra, Gujarat, Goa)",
    shortName: "West India",
    cx: 32,
    cy: 54,
    rebellionsCount: 7,
    warriorsCount: 3,
    keyEpicenters: ["Bombay (Girgaon)", "Pune", "Mulshi", "Surat", "Satara", "Nashik"],
    summary: "Birthplace of underground communications (Secret Congress Radio 1942), peasant anti-dam resistance (Mulshi Satyagraha), parallel governments (Satara Prati Sarkar), and the Royal Indian Navy Mutiny.",
    featuredHeroes: ["usha-mehta", "senapati-bapat"],
    keyMovement: "Secret Congress Radio 1942, Mulshi Satyagraha 1921, RIN Mutiny 1946"
  },
  {
    id: "region-central",
    name: "Central India (Madhya Pradesh, Chhattisgarh)",
    shortName: "Central India",
    cx: 48,
    cy: 48,
    rebellionsCount: 6,
    warriorsCount: 2,
    keyEpicenters: ["Jabalpur", "Garha Mandla", "Khandwa", "Bastar", "Satpura Range"],
    summary: "Tribal kings who faced cannon executions in 1857, Bhil guerrilla commanders who hijacked colonial trains to feed starving people, and early Bastar uprisings.",
    featuredHeroes: ["shankar-shah-raghunath", "tantia-bhil"],
    keyMovement: "Gond Resistance 1857, Bhil Guerrilla Operations 1878-1889, Halba Revolt"
  }
];
