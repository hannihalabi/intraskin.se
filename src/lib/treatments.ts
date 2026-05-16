export const BOKADIREKT_BASE_URL = "https://www.bokadirekt.se/places/intraskin-57982";
export const BOKADIREKT_BOOKING_BASE_URL = "https://www.bokadirekt.se/boka-tjanst/intraskin-57982";

export type TreatmentCategoryId =
  | "ansiktsbehandlingar"
  | "microneedling"
  | "led"
  | "harborttagning"
  | "tatuering"
  | "tandblekning"
  | "massage"
  | "ovrigt"
  | "konsultation";

export interface TreatmentCategory {
  id: TreatmentCategoryId;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  layout: "card" | "compact";
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  category: TreatmentCategoryId;
  price: number;
  duration?: string;
  description?: string;
  area?: string;
  popular?: boolean;
  bokadirektPath?: string;
}

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: "ansiktsbehandlingar",
    label: "Ansiktsbehandlingar & peelings",
    shortLabel: "Ansikte",
    tagline: "Cosmeceutical-protokoll",
    description:
      "Kemiska peelings, djuprengöringar och inslussningsbehandlingar utförda av certifierade hudterapeuter.",
    layout: "card",
  },
  {
    id: "microneedling",
    label: "Skinpen Microneedling",
    shortLabel: "Microneedling",
    tagline: "FDA-godkänd collagen-induktion",
    description:
      "Kontrollerade mikrokanaler triggar hudens egen reparation. Bygger collagen, jämnar ut linjer och pigment.",
    layout: "card",
  },
  {
    id: "led",
    label: "LED-ljusterapi",
    shortLabel: "LED",
    tagline: "Klinisk fotoaktivering",
    description:
      "Specifika våglängder för olika hudbehov — collagen, akne eller lugnande effekt. Smärtfritt och utan downtime.",
    layout: "card",
  },
  {
    id: "harborttagning",
    label: "Permanent hårborttagning",
    shortLabel: "Hårborttagning",
    tagline: "Diodlaser för permanent reduktion",
    description:
      "Modern diodlaser som ger trygg och effektiv hårborttagning på alla områden. Boka konsultation kostnadsfritt.",
    layout: "compact",
  },
  {
    id: "tatuering",
    label: "Tatueringsborttagning",
    shortLabel: "Tatuering",
    tagline: "Picosecond-laser",
    description:
      "Säker och effektiv borttagning av tatueringar i alla färger. Pris efter storlek på motivet.",
    layout: "card",
  },
  {
    id: "tandblekning",
    label: "Tandblekning",
    shortLabel: "Tandblekning",
    tagline: "Professionell blekning",
    description:
      "Säker, professionell tandblekning i kliniken — flera nyanser ljusare på en sittning.",
    layout: "card",
  },
  {
    id: "massage",
    label: "Massage",
    shortLabel: "Massage",
    tagline: "Terapeutisk avslappning",
    description:
      "Klassisk svensk massage för ansikte, rygg och hela kroppen — för dig som behöver släppa spänning.",
    layout: "card",
  },
  {
    id: "ovrigt",
    label: "Övriga behandlingar",
    shortLabel: "Övrigt",
    tagline: "Specialprotokoll",
    description:
      "Bristnings-behandling, pigmentlaser, manuell portömning och IV-dropp.",
    layout: "card",
  },
  {
    id: "konsultation",
    label: "Konsultation",
    shortLabel: "Konsultation",
    tagline: "Lär känna din hud",
    description:
      "Boka in dig för en analys eller rådgivning innan du väljer behandling. Vissa konsultationer är kostnadsfria.",
    layout: "card",
  },
];

export const treatments: Treatment[] = [
  // -------- ANSIKTSBEHANDLINGAR & PEELINGS --------
  {
    id: "intrapeel-advance",
    slug: "intrapeel-advance",
    name: "IntraPeel Advance",
    category: "ansiktsbehandlingar",
    price: 2550,
    duration: "75 min",
    description:
      "Vår mest avancerade signaturpeel — flerlagers cosmeceutical-protokoll för synliga resultat på pigment, linjer och hudtextur.",
    popular: true,
    bokadirektPath: "intrapeel-advance-3227695",
  },
  {
    id: "intrapeel",
    slug: "intrapeel",
    name: "IntraPeel",
    category: "ansiktsbehandlingar",
    price: 1495,
    duration: "60 min",
    description:
      "Vår klassiska kemiska peeling — jämnar ut hudton, lyft och förfining på en behandling.",
    popular: true,
    bokadirektPath: "intrapeel-3075975",
  },
  {
    id: "intraglow",
    slug: "intraglow",
    name: "IntraGlow",
    category: "ansiktsbehandlingar",
    price: 1095,
    duration: "50 min",
    description:
      "Signaturbehandling för instant glow — perfekt inför event eller som maintenance varannan månad.",
    bokadirektPath: "intraglow-3075901",
  },
  {
    id: "anti-age-treatment",
    slug: "anti-age-treatment",
    name: "Anti-Age Treatment",
    category: "ansiktsbehandlingar",
    price: 3995,
    duration: "120 min",
    description:
      "Premium anti-age-protokoll med peeling, mikroneedling, mask och inslussning. Allt-i-ett för synlig föryngring.",
    bokadirektPath: "anti-age-treatment-3076034",
  },
  {
    id: "aha-behandling",
    slug: "aha-behandling",
    name: "AHA-behandling",
    category: "ansiktsbehandlingar",
    price: 1449,
    duration: "60 min",
    description:
      "Djupgående AHA-peeling som mjukar upp huden, jobbar mot pigment och boostar lyster.",
    bokadirektPath: "aha-behandling-3075974",
  },
  {
    id: "aha-express",
    slug: "aha-express",
    name: "AHA Express",
    category: "ansiktsbehandlingar",
    price: 749,
    duration: "30 min",
    description:
      "Snabb AHA-peeling för uppfräschning före event — minimal downtime.",
    bokadirektPath: "aha-express-behandling-3075973",
  },
  {
    id: "c-vitamin-behandling",
    slug: "c-vitamin-behandling",
    name: "C-vitamin behandling",
    category: "ansiktsbehandlingar",
    price: 1595,
    duration: "60 min",
    description:
      "Antioxidantladdad behandling för glow och skydd mot fria radikaler. Synligt resultat på pigment.",
    bokadirektPath: "c-vitamin-behandling-3075972",
  },
  {
    id: "c-vitamin-express",
    slug: "c-vitamin-express",
    name: "C-vitamin Express",
    category: "ansiktsbehandlingar",
    price: 895,
    duration: "30 min",
    description: "Snabb glowboost med C-vitamin inför event eller fest.",
    bokadirektPath: "c-vitamin-express-behandling-3075614",
  },
  {
    id: "clean-peel",
    slug: "clean-peel",
    name: "Clean Peel",
    category: "ansiktsbehandlingar",
    price: 2499,
    duration: "75 min",
    description:
      "Djuprengörande kemisk peel för fet och akneproblematisk hud. Tar bort orenheter och balanserar talgproduktion.",
    bokadirektPath: "clean-peel-3375294",
  },
  {
    id: "collagen-inslussning",
    slug: "collagen-inslussning",
    name: "Collagen-inslussning",
    category: "ansiktsbehandlingar",
    price: 1595,
    duration: "60 min",
    description:
      "Aktiv inslussning av collagen för fastare hud, minskade linjer och förbättrad elasticitet.",
    bokadirektPath: "collagen-inslussning-3227748",
  },
  {
    id: "dark-circle-peel",
    slug: "dark-circle-peel",
    name: "Dark Circle Peel",
    category: "ansiktsbehandlingar",
    price: 1595,
    duration: "60 min",
    description:
      "Specialprotokoll för mörka ringar runt ögonen — ljusare och piggare blick.",
    bokadirektPath: "dark-circle-peel-3396678",
  },
  {
    id: "djuprengoring",
    slug: "djuprengoring",
    name: "Djuprengöring",
    category: "ansiktsbehandlingar",
    price: 1395,
    duration: "60 min",
    description:
      "Klassisk djuprengöring — porextraktion, ångning och lugnande mask. För alla hudtyper.",
    bokadirektPath: "djuprengoring-3075612",
  },
  {
    id: "djuprengorande-ryggbehandling",
    slug: "djuprengorande-ryggbehandling",
    name: "Djuprengörande ryggbehandling",
    category: "ansiktsbehandlingar",
    price: 1995,
    duration: "75 min",
    description:
      "Djuprengöring för ryggen — porextraktion och avslappnande behandling för svår-att-nå-zoner.",
    bokadirektPath: "djuprengorande-ryggbehandling-3076054",
  },
  {
    id: "kemisk-ryggbehandling",
    slug: "kemisk-ryggbehandling",
    name: "Kemisk ryggbehandling",
    category: "ansiktsbehandlingar",
    price: 1495,
    duration: "60 min",
    description: "Kemisk peel mot ryggakne och pigmenteringar på ryggen.",
    bokadirektPath: "kemisk-ryggbehandling-3076056",
  },
  {
    id: "hollywood-peel",
    slug: "hollywood-peel",
    name: "Hollywood Peel",
    category: "ansiktsbehandlingar",
    price: 1895,
    duration: "45 min",
    description:
      "Carbon laser-peel som ger glow, förfinar porer och jämnar ut hudtonen — ingen downtime.",
    bokadirektPath: "hollywood-peel-3269464",
  },
  {
    id: "microdermabrasion",
    slug: "microdermabrasion",
    name: "Microdermabrasion",
    category: "ansiktsbehandlingar",
    price: 1395,
    duration: "60 min",
    description:
      "Mekanisk slipning som tar bort döda hudceller och stimulerar cellförnyelsen.",
    bokadirektPath: "microdermabrasion-3075976",
  },
  {
    id: "armpit-peel",
    slug: "armpit-peel",
    name: "Armpit Peel",
    category: "ansiktsbehandlingar",
    price: 2499,
    duration: "60 min",
    description: "Ljusare och jämnare armhålor — protokoll på 4–6 behandlingar.",
    bokadirektPath: "armpit-peel-3396684",
  },
  {
    id: "intim-peel",
    slug: "intim-peel",
    name: "Intim Peel",
    category: "ansiktsbehandlingar",
    price: 1995,
    duration: "45 min",
    description: "Skonsam ljusare peel för intima områden.",
    bokadirektPath: "intim-peel-3396686",
  },

  // -------- MICRONEEDLING --------
  {
    id: "skinpen-ansikte",
    slug: "skinpen-ansikte",
    name: "Skinpen Microneedling — Ansikte",
    category: "microneedling",
    price: 2500,
    duration: "75 min",
    description:
      "FDA-godkänd microneedling som triggar hudens egen reparation. För linjer, ärr och hudens grundtextur.",
    popular: true,
    bokadirektPath: "skinpen-microneedling-ansikte-3075977",
  },
  {
    id: "skinpen-ansikte-hals",
    slug: "skinpen-ansikte-hals",
    name: "Skinpen — Ansikte + Hals",
    category: "microneedling",
    price: 2695,
    duration: "90 min",
    description: "Inkluderar hals — viktigt för att inte få diskrepans i åldrande mellan ansikte och hals.",
    bokadirektPath: "skinpen-microneedling-ansikte-hals-3076024",
  },
  {
    id: "skinpen-ansikte-hals-dekolletage",
    slug: "skinpen-ansikte-hals-dekolletage",
    name: "Skinpen — Ansikte + Hals + Dekolletage",
    category: "microneedling",
    price: 2895,
    duration: "100 min",
    description: "Hela ovan-zonen behandlas i en sittning. För komplett föryngring.",
    bokadirektPath: "skinpen-microneedling-ansikte-hals-dekolletage-3076025",
  },
  {
    id: "skinpen-collagen",
    slug: "skinpen-collagen",
    name: "Skinpen + Collagen",
    category: "microneedling",
    price: 3100,
    duration: "90 min",
    description:
      "Microneedling kombinerat med collagen-inslussning för maxat resultat på elasticitet.",
    bokadirektPath: "skinpen-microneedling-collagen-3076026",
  },
  {
    id: "skinpen-pigmentserum",
    slug: "skinpen-pigmentserum",
    name: "Skinpen + Pigmentserum",
    category: "microneedling",
    price: 3100,
    duration: "90 min",
    description:
      "Microneedling med pigmentserum — riktad behandling för missfärgning och solskador.",
    bokadirektPath: "skinpen-microneedling-pigmentserum-3396664",
  },
  {
    id: "skinpen-synergi",
    slug: "skinpen-synergi",
    name: "Skinpen + Synergi",
    category: "microneedling",
    price: 3300,
    duration: "100 min",
    description:
      "Premium microneedling med synergi-serum — flera aktiver på en gång för mest effekt.",
    bokadirektPath: "skinpen-microneedling-synergi-3396667",
  },
  {
    id: "skinpen-lax-dna",
    slug: "skinpen-lax-dna",
    name: "Skinpen + Lax-DNA",
    category: "microneedling",
    price: 3999,
    duration: "100 min",
    description:
      "Vår mest avancerade microneedling med PDRN/Lax-DNA — kraftig regenerering och anti-age.",
    popular: true,
    bokadirektPath: "skinpen-microneedling-lax-dna-3396659",
  },

  // -------- LED-LJUSTERAPI --------
  {
    id: "led-rott",
    slug: "led-rott",
    name: "LED-ljusterapi — Rött",
    category: "led",
    price: 595,
    duration: "30 min",
    description:
      "Rött ljus stimulerar collagen och cellförnyelse. Anti-age-effekt och förbättrad hudton.",
    bokadirektPath: "led-ljusterapi-rott-3076036",
  },
  {
    id: "led-blatt",
    slug: "led-blatt",
    name: "LED-ljusterapi — Blått",
    category: "led",
    price: 545,
    duration: "30 min",
    description:
      "Blått ljus är antibakteriellt och perfekt mot akne och orenheter.",
    bokadirektPath: "led-ljusterapi-blatt-3076038",
  },
  {
    id: "led-gult",
    slug: "led-gult",
    name: "LED-ljusterapi — Gult",
    category: "led",
    price: 525,
    duration: "30 min",
    description:
      "Gult ljus lugnar irritation och rodnad. Bra som komplement efter peeling.",
    bokadirektPath: "led-ljusterapi-gult-3076041",
  },

  // -------- TATUERINGSBORTTAGNING --------
  {
    id: "tatuering-2x2",
    slug: "tatueringsborttagning-2x2",
    name: "Tatueringsborttagning — 2×2 cm",
    category: "tatuering",
    price: 795,
    duration: "20 min",
    description: "Liten tatuering, t.ex. en symbol eller bokstav.",
    bokadirektPath: "tatueringsborttagning-2x2cm-3295856",
  },
  {
    id: "tatuering-5x5",
    slug: "tatueringsborttagning-5x5",
    name: "Tatueringsborttagning — 5×5 cm",
    category: "tatuering",
    price: 1199,
    duration: "30 min",
    description: "Mellanstor tatuering. Flera sittningar krävs vanligtvis.",
    bokadirektPath: "tatueringsborttagning-5x5cm-3295849",
  },
  {
    id: "tatuering-10x10",
    slug: "tatueringsborttagning-10x10",
    name: "Tatueringsborttagning — 10×10 cm",
    category: "tatuering",
    price: 1695,
    duration: "45 min",
    description: "Större motiv. Boka konsultation för individuell plan.",
    bokadirektPath: "tatueringsborttagning-10x10cm-3295852",
  },

  // -------- TANDBLEKNING --------
  {
    id: "tandblekning-premium",
    slug: "tandblekning-premium",
    name: "Tandblekning — Premium",
    category: "tandblekning",
    price: 1595,
    duration: "75 min",
    description: "Vår mest effektiva blekning — flera nyanser ljusare på en sittning.",
    popular: true,
    bokadirektPath: "tandblekning-3227670",
  },
  {
    id: "tandblekning-grund",
    slug: "tandblekning-grund",
    name: "Tandblekning — Grund",
    category: "tandblekning",
    price: 1095,
    duration: "60 min",
    description: "Skonsammare protokoll för dig som vill börja försiktigt.",
    bokadirektPath: "tandblekning-3227673",
  },

  // -------- MASSAGE --------
  {
    id: "ansiktsmassage",
    slug: "ansiktsmassage",
    name: "Ansiktsmassage",
    category: "massage",
    price: 495,
    duration: "30 min",
    description:
      "Lymfdränerande ansiktsmassage som ger glow och löser spänning i käke och ansikte.",
    bokadirektPath: "ansiktsmassage-3076127",
  },
  {
    id: "ryggmassage",
    slug: "ryggmassage",
    name: "Ryggmassage",
    category: "massage",
    price: 329,
    duration: "30 min",
    description: "Klassisk svensk ryggmassage för spända axlar och nacke.",
  },
  {
    id: "helkroppsmassage",
    slug: "helkroppsmassage",
    name: "Helkroppsmassage",
    category: "massage",
    price: 699,
    duration: "60 min",
    description: "Hel timme avslappning — hela kroppen, från fot till nacke.",
  },

  // -------- ÖVRIGA --------
  {
    id: "pigmentlaser",
    slug: "pigmentlaser",
    name: "Pigmentlaser",
    category: "ovrigt",
    price: 499,
    duration: "30 min",
    description:
      "Riktad laser mot pigmentfläckar och solskador. Pris per zon.",
    bokadirektPath: "pigmentlaser-3300707",
  },
  {
    id: "bristningar",
    slug: "bristningar",
    name: "Bristningar",
    category: "ovrigt",
    price: 500,
    duration: "30 min",
    description: "Behandling som förbättrar bristningarnas struktur och färg.",
    bokadirektPath: "bristningar-3227736",
  },
  {
    id: "portomning",
    slug: "portomning",
    name: "Portömning",
    category: "ovrigt",
    price: 595,
    duration: "30 min",
    description: "Manuell extraktion av tilltäppta porer av hudterapeut.",
    bokadirektPath: "portomning-3075613",
  },
  {
    id: "iv-dropp-konsultation",
    slug: "iv-dropp-konsultation",
    name: "IV-dropp konsultation",
    category: "ovrigt",
    price: 499,
    duration: "30 min",
    description: "Konsultation med vår läkare innan IV-dropp-protokoll.",
  },

  // -------- KONSULTATION --------
  {
    id: "hudanalys",
    slug: "hudanalys",
    name: "Hudanalys & produktrekommendation",
    category: "konsultation",
    price: 299,
    duration: "30 min",
    description:
      "Vi kartlägger din hud med digital analys och bygger en hemmavård som faktiskt funkar för dig.",
    popular: true,
  },
  {
    id: "konsultation",
    slug: "konsultation",
    name: "Allmän konsultation",
    category: "konsultation",
    price: 149,
    duration: "20 min",
    description:
      "Sitt ner med en av våra terapeuter för rådgivning innan du väljer behandling.",
  },
  {
    id: "konsultation-intrapeel-advance",
    slug: "konsultation-intrapeel-advance",
    name: "Konsultation — IntraPeel Advance",
    category: "konsultation",
    price: 0,
    duration: "20 min",
    description: "Kostnadsfri konsultation inför IntraPeel Advance.",
  },
  {
    id: "konsultation-harborttagning",
    slug: "konsultation-harborttagning",
    name: "Konsultation — Permanent hårborttagning",
    category: "konsultation",
    price: 0,
    bokadirektPath: "konsultation-permanent-harborttagning-3163786",
    duration: "20 min",
    description:
      "Kostnadsfri rådgivning inför hårborttagningsprotokoll. Vi går igenom din hudtyp och områden.",
  },

  // -------- HÅRBORTTAGNING (compact) --------
  // Ansikte
  { id: "hb-overlapp", slug: "hb-overlapp", name: "Överläpp", area: "Ansikte", category: "harborttagning", price: 449, bokadirektPath: "overlapp-permanent-harborttagning-3163687" },
  { id: "hb-haka", slug: "hb-haka", name: "Haka", area: "Ansikte", category: "harborttagning", price: 549, bokadirektPath: "haka-permanent-harborttagning-3163689" },
  { id: "hb-lapp-haka", slug: "hb-lapp-haka", name: "Läpp & haka", area: "Ansikte", category: "harborttagning", price: 799, bokadirektPath: "lapp-haka-permanent-harborttagning-3163688" },
  { id: "hb-haka-kaklinje", slug: "hb-haka-kaklinje", name: "Haka & käklinje", area: "Ansikte", category: "harborttagning", price: 779, bokadirektPath: "haka-kaklinje-permanent-harborttagning-3163690" },
  { id: "hb-kaklinje", slug: "hb-kaklinje", name: "Käklinje", area: "Ansikte", category: "harborttagning", price: 479, bokadirektPath: "kaklinje-permanent-harborttagning-3163696" },
  { id: "hb-kinder", slug: "hb-kinder", name: "Kinder", area: "Ansikte", category: "harborttagning", price: 849, bokadirektPath: "kinder-permanent-harborttagning-3163684" },
  { id: "hb-polisonger", slug: "hb-polisonger", name: "Polisonger", area: "Ansikte", category: "harborttagning", price: 499, bokadirektPath: "polisonger-permanent-harborttagning-3163686" },
  { id: "hb-panna", slug: "hb-panna", name: "Panna", area: "Ansikte", category: "harborttagning", price: 699, bokadirektPath: "panna-permanent-harborttagning-3163682" },
  { id: "hb-harfaste", slug: "hb-harfaste", name: "Hårfäste", area: "Ansikte", category: "harborttagning", price: 399, bokadirektPath: "harfaste-permanent-harborttagning-3163695" },
  { id: "hb-ogonbryn", slug: "hb-ogonbryn", name: "Ögonbryn", area: "Ansikte", category: "harborttagning", price: 399, bokadirektPath: "ogonbryn-permanent-harborttagning-3163683" },
  { id: "hb-oron", slug: "hb-oron", name: "Öron", area: "Ansikte", category: "harborttagning", price: 579, bokadirektPath: "oron-permanent-harborttagning-3163694" },
  { id: "hb-ansikte", slug: "hb-ansikte", name: "Hela ansiktet", area: "Ansikte", category: "harborttagning", price: 1449, bokadirektPath: "ansikte-permanent-harborttagning-3163680" },
  { id: "hb-ansikte-hals", slug: "hb-ansikte-hals", name: "Ansikte & hals", area: "Ansikte", category: "harborttagning", price: 1699, popular: true, bokadirektPath: "aniskte-hals-permanent-harborttagning-3163681" },
  { id: "hb-kinder-hals", slug: "hb-kinder-hals", name: "Kinder & hals", area: "Ansikte", category: "harborttagning", price: 1095, bokadirektPath: "kinder-hals-permanent-harborttagning-3163685" },
  { id: "hb-hals", slug: "hb-hals", name: "Hals", area: "Ansikte", category: "harborttagning", price: 779, bokadirektPath: "hals-permanent-harborttagning-3163691" },
  { id: "hb-nacke", slug: "hb-nacke", name: "Nacke", area: "Ansikte", category: "harborttagning", price: 749, bokadirektPath: "nacke-permanent-harborttagning-3163692" },
  { id: "hb-nacke-hals", slug: "hb-nacke-hals", name: "Nacke & hals", area: "Ansikte", category: "harborttagning", price: 1299, bokadirektPath: "nacke-hals-permanent-harborttagning-3163693" },
  // Bål
  { id: "hb-armhalor", slug: "hb-armhalor", name: "Armhålor", area: "Bål", category: "harborttagning", price: 299, popular: true, bokadirektPath: "armhalor-permanent-harborttagning-3163697" },
  { id: "hb-axlar", slug: "hb-axlar", name: "Axlar", area: "Bål", category: "harborttagning", price: 899, bokadirektPath: "axlar-permanent-harborttagning-3163707" },
  { id: "hb-brost", slug: "hb-brost", name: "Bröst", area: "Bål", category: "harborttagning", price: 1095, bokadirektPath: "brost-permanent-harborttagning-3163698" },
  { id: "hb-brost-mage", slug: "hb-brost-mage", name: "Bröst & mage", area: "Bål", category: "harborttagning", price: 1899, bokadirektPath: "brost-mage-permanent-harborttagning-3163700" },
  { id: "hb-mage", slug: "hb-mage", name: "Mage", area: "Bål", category: "harborttagning", price: 1095, bokadirektPath: "mage-permanent-harborttagning-3163703" },
  { id: "hb-navellinje", slug: "hb-navellinje", name: "Navellinje", area: "Bål", category: "harborttagning", price: 399, bokadirektPath: "navellinje-permanent-harborttagning-3163701" },
  { id: "hb-svank", slug: "hb-svank", name: "Svank", area: "Bål", category: "harborttagning", price: 599, bokadirektPath: "svank-permanent-harborttagning-3163722" },
  { id: "hb-halva-rygg", slug: "hb-halva-rygg", name: "Halva ryggen", area: "Bål", category: "harborttagning", price: 1095, bokadirektPath: "halva-rygg-permanent-harborttagning-3163708" },
  { id: "hb-hela-rygg", slug: "hb-hela-rygg", name: "Hela ryggen", area: "Bål", category: "harborttagning", price: 1799, bokadirektPath: "hela-rygg-permanent-harborttagning-3163709" },
  { id: "hb-rygg-axlar", slug: "hb-rygg-axlar", name: "Rygg & axlar", area: "Bål", category: "harborttagning", price: 2099, bokadirektPath: "rygg-axlar-permanent-harborttagning-3163710" },
  // Bikini & rumpa
  { id: "hb-bikini", slug: "hb-bikini", name: "Bikini", area: "Bikini & rumpa", category: "harborttagning", price: 1095, bokadirektPath: "bikini-permanent-harborttagning-3163714" },
  { id: "hb-brasiliansk", slug: "hb-brasiliansk", name: "Brasiliansk", area: "Bikini & rumpa", category: "harborttagning", price: 1499, popular: true, bokadirektPath: "brasiliansk-permanent-harborttagning-3163713" },
  { id: "hb-brasiliansk-armhalor", slug: "hb-brasiliansk-armhalor", name: "Brasiliansk & armhålor", area: "Bikini & rumpa", category: "harborttagning", price: 1599, bokadirektPath: "brasiliansk-armhalor-permanent-harborttagning-3163720" },
  { id: "hb-rumpa", slug: "hb-rumpa", name: "Rumpa", area: "Bikini & rumpa", category: "harborttagning", price: 999, bokadirektPath: "rumpa-permanent-harborttagning-3163715" },
  { id: "hb-insida-rumpa", slug: "hb-insida-rumpa", name: "Insida rumpa", area: "Bikini & rumpa", category: "harborttagning", price: 999, bokadirektPath: "insida-rumpa-permanent-harborttagning-3163716" },
  { id: "hb-rumpa-brasiliansk", slug: "hb-rumpa-brasiliansk", name: "Rumpa + brasiliansk", area: "Bikini & rumpa", category: "harborttagning", price: 2095, bokadirektPath: "rumpa-brasiliansk-permanent-harborttagning-3163726" },
  // Armar & ben
  { id: "hb-hander-fingrar", slug: "hb-hander-fingrar", name: "Händer & fingrar", area: "Armar & ben", category: "harborttagning", price: 199, bokadirektPath: "hander-fingrar-permanent-harborttagning-3163706" },
  { id: "hb-halva-armar", slug: "hb-halva-armar", name: "Halva armar", area: "Armar & ben", category: "harborttagning", price: 1095, bokadirektPath: "halva-armar-permanent-harborttagning-3163704" },
  { id: "hb-hela-armar", slug: "hb-hela-armar", name: "Hela armar", area: "Armar & ben", category: "harborttagning", price: 1499, bokadirektPath: "hela-armar-permanent-harborttagning-3163705" },
  { id: "hb-knan", slug: "hb-knan", name: "Knän", area: "Armar & ben", category: "harborttagning", price: 599, bokadirektPath: "knan-permanent-harborttagning-3163721" },
  { id: "hb-halva-ben", slug: "hb-halva-ben", name: "Halva ben", area: "Armar & ben", category: "harborttagning", price: 1399, bokadirektPath: "halva-ben-permanent-harborttagning-3163712" },
  { id: "hb-hela-ben", slug: "hb-hela-ben", name: "Hela ben", area: "Armar & ben", category: "harborttagning", price: 1899, bokadirektPath: "hela-ben-permanent-harborttagning-3163711" },
  { id: "hb-tar-fotter", slug: "hb-tar-fotter", name: "Tår & fötter", area: "Armar & ben", category: "harborttagning", price: 249, bokadirektPath: "tar-fotter-permanent-harborttagning-3163717" },
  { id: "hb-vartgard", slug: "hb-vartgard", name: "Vårtgård", area: "Armar & ben", category: "harborttagning", price: 249, bokadirektPath: "vartgard-permanent-harborttagning-3163699" },
  // Paket
  { id: "hb-dam-halva-ben", slug: "hb-dam-halva-ben", name: "Dam — Halva ben + brasiliansk + armhålor", area: "Paket", category: "harborttagning", price: 2299, popular: true, bokadirektPath: "dam-halva-ben-brasiliansk-och-armhalor-permanent-harborttagning-3163725" },
  { id: "hb-dam-hela-ben", slug: "hb-dam-hela-ben", name: "Dam — Hela ben + brasiliansk + armhålor", area: "Paket", category: "harborttagning", price: 2699, bokadirektPath: "dam-hela-ben-brasiliansk-och-armhalor-permanent-harborttagning-3163724" },
  { id: "hb-dam-helkropp", slug: "hb-dam-helkropp", name: "Dam — Helkropp (exkl. ansikte)", area: "Paket", category: "harborttagning", price: 3899, bokadirektPath: "dam-helkropp-hela-kroppen-exklusive-ansikte-permanent-harborttagning-3163723" },
];

export const treatmentsByCategory = (id: TreatmentCategoryId) =>
  treatments.filter((t) => t.category === id);

export const popularTreatments = () => treatments.filter((t) => t.popular);

export const formatPrice = (price: number) =>
  price === 0 ? "Kostnadsfri" : `${price.toLocaleString("sv-SE")} kr`;

export const bookingUrl = (treatment?: Treatment) => {
  if (treatment?.bokadirektPath) {
    return `${BOKADIREKT_BOOKING_BASE_URL}/${treatment.bokadirektPath}`;
  }
  return BOKADIREKT_BASE_URL;
};
