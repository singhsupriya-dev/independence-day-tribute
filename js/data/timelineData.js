/**
 * The Road to Swaraj: Interactive Chronological Timeline (1757 - 1947)
 * Highlighting 200 years of relentless resistance with lesser-known heroes.
 */

export const TIMELINE_DATA = [
  {
    year: "1757",
    era: "1750–1800",
    title: "Battle of Plassey & Sanyasi-Fakir Insurrection",
    location: "Bengal Presidency",
    hero: "Devi Chaudhurani & Bhavani Pathak",
    tagline: "The First Sparks on River Waters",
    description: "Following the East India Company's conquest of Bengal and the catastrophic 1770 famine, armed Hindu Sanyasis and Muslim Fakirs allied with river queen Devi Chaudhurani to intercept British tax shipments and redistribute grain.",
    impact: "Forced the British to establish specialized paramilitary forces in Bengal and inspired the national song 'Vande Mataram'.",
    badge: "1750-1800 Era"
  },
  {
    year: "1780",
    era: "1750–1800",
    title: "Liberation of Sivaganga & First Human Arsenal Blast",
    location: "Sivaganga, Tamil Nadu",
    hero: "Kuyili & Queen Velu Nachiyar",
    tagline: "The Flame That Consumed British Munitions",
    description: "Dalit commander Kuyili soaked herself in temple lamp oil, set herself ablaze, and jumped into the British East India Company ammunition depot, destroying their firepower and liberating Sivaganga.",
    impact: "Reclaimed sovereign Indian territory 77 years prior to 1857.",
    badge: "Southern Resistance"
  },
  {
    year: "1817",
    era: "1800–1850",
    title: "The Paika Bidroha (Rebellion of Odisha)",
    location: "Khordha, Odisha",
    hero: "Bakshi Jagabandhu & Tribal Kandhas",
    tagline: "The Traditional Militia Against Colonial Land Grab",
    description: "The dispossessed Paika warrior class of Odisha, united with local tribals and temple servitors, routed British garrisons and established provisional self-rule across Puri and Cuttack.",
    impact: "First large-scale multi-class uprising against the British East India Company in eastern India.",
    badge: "Paika Rebellion"
  },
  {
    year: "1824",
    era: "1800–1850",
    title: "Kittur Armed Defiance",
    location: "Belagavi, Karnataka",
    hero: "Rani Chennamma & Sangolli Rayanna",
    tagline: "Defiance of the Doctrine of Lapse",
    description: "Rani Chennamma fought British Collector Thackeray's forces, killing the British commissioner and defending Kittur's sovereign adoption rights.",
    impact: "Set the precedent for princely resistance against British annexation policies.",
    badge: "Early Princely Defiance"
  },
  {
    year: "1829",
    era: "1800–1850",
    title: "The Anglo-Khasi Guerrilla War",
    location: "Nongkhlaw, Meghalaya",
    hero: "U Tirot Sing",
    tagline: "The Unbowed Sovereign of the Hills",
    description: "Syiem Tirot Sing waged a four-year asymmetric mountain campaign against British infantry attempting to construct strategic military roads through indigenous Khasi ancestral lands.",
    impact: "Demonstrated the invincibility of indigenous hill warfare.",
    badge: "Northeast Resistance"
  },
  {
    year: "1855",
    era: "1850–1900",
    title: "The Santhal Hool (Great Rebellion)",
    location: "Rajmahal Hills, Jharkhand/Bengal",
    hero: "Sidhu, Kanhu, Chand & Bhairav Murmu",
    tagline: "60,000 Bows Against the Queen's Cannons",
    description: "Over 60,000 Santhal adivasis rose in armed revolt against British revenue collectors and moneylenders, declaring a sovereign tribal state in Bhognadih.",
    impact: "Led directly to the enactment of the Santhal Parganas Tenancy Act protecting indigenous lands.",
    badge: "Tribal Sovereignty"
  },
  {
    year: "1857",
    era: "1850–1900",
    title: "The First War of Independence",
    location: "Barrackpore, Patna, Awadh, Jabalpur, Jhansi",
    hero: "Matadin Bhangi, Peer Ali Khan, Begum Hazrat Mahal, Shankar Shah",
    tagline: "A Nation Rises in Concurrence",
    description: "Triggered by cartridge revelations at Barrackpore, the rebellion swept north, central, and eastern India with underground booksellers, tribal kings, and rebel queens commanding the frontlines.",
    impact: "Ended East India Company rule; transfer of power to the British Crown.",
    badge: "1857 Revolution"
  },
  {
    year: "1899",
    era: "1850–1900",
    title: "The Munda Ulgulan (The Great Tumult)",
    location: "Chotanagpur, Jharkhand",
    hero: "Birsa Munda (Dharti Aaba)",
    tagline: "Indigenous Sovereignty and Spiritual Awakening",
    description: "Birsa Munda mobilized indigenous clans across Dombari Hill against colonial feudal land seizures, inspiring a socio-religious and military insurrection for self-governance.",
    impact: "Secured the historic Chotanagpur Tenancy Act (1908).",
    badge: "Ulgulan"
  },
  {
    year: "1908",
    era: "1900–1919",
    title: "The Muzaffarpur Attack & Alipore Trials",
    location: "Bengal & Bihar",
    hero: "Khudiram Bose & Prafulla Chaki",
    tagline: "The Teenage Vanguard of Armed Revolution",
    description: "18-year-old Khudiram Bose targeted the tyrannical magistrate Kingsford, mounting the gallows smiling and electrifying the youth of India.",
    impact: "Sparked the nationwide youth recruitment into revolutionary secret societies.",
    badge: "Revolutionary Spark"
  },
  {
    year: "1915",
    era: "1900–1919",
    title: "The Transnational Ghadar Armed Mutiny",
    location: "Punjab, San Francisco, Singapore",
    hero: "Kartar Singh Sarabha & Ghadar Patriots",
    tagline: "Global Conspiracy for Armed Freedom",
    description: "Young diaspora revolutionaries sailed from North America to orchestrate a synchronized armed mutiny across 20 British Indian Army garrisons during World War I.",
    impact: "Shook British colonial intelligence and laid the philosophical blueprint for Bhagat Singh.",
    badge: "Ghadar Movement"
  },
  {
    year: "1922",
    era: "1920–1930",
    title: "The Rampa Adivasi Rebellion",
    location: "Eastern Ghats, Andhra Pradesh",
    hero: "Alluri Sitarama Raju",
    tagline: "Guerrilla Warfare in the Jungle Canopy",
    description: "Alluri led tribal guerrilla forces raiding colonial police posts, seizing weapons, and defeating specialized British troop detachments for two years.",
    impact: "Exposed the vulnerability of British forest administration in southern India.",
    badge: "Rampa Rebellion"
  },
  {
    year: "1930",
    era: "1930–1942",
    title: "The Chittagong Armoury Raid & Republic",
    location: "Chittagong, Bengal",
    hero: "Masterda Surya Sen & Pritilata Waddedar",
    tagline: "Four Days of Sovereign Liberation",
    description: "The Indian Republican Army seized British armouries, cut off imperial communication, and liberated an entire district in a daring tactical victory.",
    impact: "Proved that armed Indian youths could militarily defeat the British Empire on its own soil.",
    badge: "Chittagong Raid"
  },
  {
    year: "1932",
    era: "1930–1942",
    title: "The Naga Armed Rebellion & Flag Satyagraha",
    location: "Manipur & Nagaland / Tamil Nadu",
    hero: "Rani Gaidinliu & Tiruppur Kumaran",
    tagline: "Courage in the Mountains and Cotton Mills",
    description: "16-year-old Rani Gaidinliu led guerrilla warfare in Manipur while 27-year-old Tiruppur Kumaran protected the Tricolour under fatal police batons.",
    impact: "Demonstrated that resistance spanned every geography and social stratum.",
    badge: "1930s Resistance"
  },
  {
    year: "1942",
    era: "1942–1947",
    title: "The Quit India Movement & Underground Networks",
    location: "Nationwide (Gohpur, Tamluk, Mumbai, Patna)",
    hero: "Kanaklata Barua, Matangini Hazra, Usha Mehta, Aruna Asaf Ali",
    tagline: "Do or Die: The Final Climax",
    description: "Teenage martyrs, 72-year-old matriarchs, and clandestine radio broadcasters led millions in non-violent and underground actions as the Raj collapsed into mass arrests.",
    impact: "Paralyzed British administrative machinery across multiple provinces.",
    badge: "Quit India"
  },
  {
    year: "1946",
    era: "1942–1947",
    title: "The Royal Indian Navy Mutiny",
    location: "Bombay, Karachi, Calcutta",
    hero: "Naval Ratings (B.C. Dutt, M.S. Khan)",
    tagline: "The Armed Forces Turn the Guns",
    description: "20,000 Indian naval ratings took over 78 warships and naval establishments, hauling down the Union Jack and hoisting the Tricolour, hammer-and-sickle, and crescent flags.",
    impact: "Convinced the British Empire that the armed forces could no longer be relied upon to suppress the Indian population.",
    badge: "RIN Mutiny"
  },
  {
    year: "1947",
    era: "1942–1947",
    title: "Midnight of Swaraj: The Dawn of Independence",
    location: "Red Fort, New Delhi & Every Corner of India",
    hero: "Millions of Unnamed Martyrs & Warriors",
    tagline: "The Tricolour Unfurls on a Free Nation",
    description: "On August 15, 1947, 200 years of sacrifice, struggle, and martyrdom culminated in the birth of a free, democratic Republic of India.",
    impact: "The triumph of the human spirit over colonial subjugation.",
    badge: "15 August 1947"
  }
];
