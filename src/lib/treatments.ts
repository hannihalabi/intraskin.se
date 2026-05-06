export const BOKADIREKT_BASE_URL = "https://www.bokadirekt.se/places/intraskin";

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
  },
  {
    id: "c-vitamin-express",
    slug: "c-vitamin-express",
    name: "C-vitamin Express",
    category: "ansiktsbehandlingar",
    price: 895,
    duration: "30 min",
    description: "Snabb glowboost med C-vitamin inför event eller fest.",
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
  },
  {
    id: "kemisk-ryggbehandling",
    slug: "kemisk-ryggbehandling",
    name: "Kemisk ryggbehandling",
    category: "ansiktsbehandlingar",
    price: 1495,
    duration: "60 min",
    description: "Kemisk peel mot ryggakne och pigmenteringar på ryggen.",
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
  },
  {
    id: "armpit-peel",
    slug: "armpit-peel",
    name: "Armpit Peel",
    category: "ansiktsbehandlingar",
    price: 2499,
    duration: "60 min",
    description: "Ljusare och jämnare armhålor — protokoll på 4–6 behandlingar.",
  },
  {
    id: "intim-peel",
    slug: "intim-peel",
    name: "Intim Peel",
    category: "ansiktsbehandlingar",
    price: 1995,
    duration: "45 min",
    description: "Skonsam ljusare peel för intima områden.",
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
  },
  {
    id: "skinpen-ansikte-hals",
    slug: "skinpen-ansikte-hals",
    name: "Skinpen — Ansikte + Hals",
    category: "microneedling",
    price: 2695,
    duration: "90 min",
    description: "Inkluderar hals — viktigt för att inte få diskrepans i åldrande mellan ansikte och hals.",
  },
  {
    id: "skinpen-ansikte-hals-dekolletage",
    slug: "skinpen-ansikte-hals-dekolletage",
    name: "Skinpen — Ansikte + Hals + Dekolletage",
    category: "microneedling",
    price: 2895,
    duration: "100 min",
    description: "Hela ovan-zonen behandlas i en sittning. För komplett föryngring.",
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
  },
  {
    id: "tatuering-5x5",
    slug: "tatueringsborttagning-5x5",
    name: "Tatueringsborttagning — 5×5 cm",
    category: "tatuering",
    price: 1199,
    duration: "30 min",
    description: "Mellanstor tatuering. Flera sittningar krävs vanligtvis.",
  },
  {
    id: "tatuering-10x10",
    slug: "tatueringsborttagning-10x10",
    name: "Tatueringsborttagning — 10×10 cm",
    category: "tatuering",
    price: 1695,
    duration: "45 min",
    description: "Större motiv. Boka konsultation för individuell plan.",
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
  },
  {
    id: "tandblekning-grund",
    slug: "tandblekning-grund",
    name: "Tandblekning — Grund",
    category: "tandblekning",
    price: 1095,
    duration: "60 min",
    description: "Skonsammare protokoll för dig som vill börja försiktigt.",
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
  },
  {
    id: "bristningar",
    slug: "bristningar",
    name: "Bristningar",
    category: "ovrigt",
    price: 500,
    duration: "30 min",
    description: "Behandling som förbättrar bristningarnas struktur och färg.",
  },
  {
    id: "portomning",
    slug: "portomning",
    name: "Portömning",
    category: "ovrigt",
    price: 595,
    duration: "30 min",
    description: "Manuell extraktion av tilltäppta porer av hudterapeut.",
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
    duration: "20 min",
    description:
      "Kostnadsfri rådgivning inför hårborttagningsprotokoll. Vi går igenom din hudtyp och områden.",
  },

  // -------- HÅRBORTTAGNING (compact) --------
  // Ansikte
  { id: "hb-overlapp", slug: "hb-overlapp", name: "Överläpp", area: "Ansikte", category: "harborttagning", price: 449 },
  { id: "hb-haka", slug: "hb-haka", name: "Haka", area: "Ansikte", category: "harborttagning", price: 549 },
  { id: "hb-lapp-haka", slug: "hb-lapp-haka", name: "Läpp & haka", area: "Ansikte", category: "harborttagning", price: 799 },
  { id: "hb-haka-kaklinje", slug: "hb-haka-kaklinje", name: "Haka & käklinje", area: "Ansikte", category: "harborttagning", price: 779 },
  { id: "hb-kaklinje", slug: "hb-kaklinje", name: "Käklinje", area: "Ansikte", category: "harborttagning", price: 479 },
  { id: "hb-kinder", slug: "hb-kinder", name: "Kinder", area: "Ansikte", category: "harborttagning", price: 849 },
  { id: "hb-polisonger", slug: "hb-polisonger", name: "Polisonger", area: "Ansikte", category: "harborttagning", price: 499 },
  { id: "hb-panna", slug: "hb-panna", name: "Panna", area: "Ansikte", category: "harborttagning", price: 699 },
  { id: "hb-harfaste", slug: "hb-harfaste", name: "Hårfäste", area: "Ansikte", category: "harborttagning", price: 399 },
  { id: "hb-ogonbryn", slug: "hb-ogonbryn", name: "Ögonbryn", area: "Ansikte", category: "harborttagning", price: 399 },
  { id: "hb-oron", slug: "hb-oron", name: "Öron", area: "Ansikte", category: "harborttagning", price: 579 },
  { id: "hb-ansikte", slug: "hb-ansikte", name: "Hela ansiktet", area: "Ansikte", category: "harborttagning", price: 1449 },
  { id: "hb-ansikte-hals", slug: "hb-ansikte-hals", name: "Ansikte & hals", area: "Ansikte", category: "harborttagning", price: 1699, popular: true },
  { id: "hb-kinder-hals", slug: "hb-kinder-hals", name: "Kinder & hals", area: "Ansikte", category: "harborttagning", price: 1095 },
  { id: "hb-hals", slug: "hb-hals", name: "Hals", area: "Ansikte", category: "harborttagning", price: 779 },
  { id: "hb-nacke", slug: "hb-nacke", name: "Nacke", area: "Ansikte", category: "harborttagning", price: 749 },
  { id: "hb-nacke-hals", slug: "hb-nacke-hals", name: "Nacke & hals", area: "Ansikte", category: "harborttagning", price: 1299 },
  // Bål
  { id: "hb-armhalor", slug: "hb-armhalor", name: "Armhålor", area: "Bål", category: "harborttagning", price: 299, popular: true },
  { id: "hb-axlar", slug: "hb-axlar", name: "Axlar", area: "Bål", category: "harborttagning", price: 899 },
  { id: "hb-brost", slug: "hb-brost", name: "Bröst", area: "Bål", category: "harborttagning", price: 1095 },
  { id: "hb-brost-mage", slug: "hb-brost-mage", name: "Bröst & mage", area: "Bål", category: "harborttagning", price: 1899 },
  { id: "hb-mage", slug: "hb-mage", name: "Mage", area: "Bål", category: "harborttagning", price: 1095 },
  { id: "hb-navellinje", slug: "hb-navellinje", name: "Navellinje", area: "Bål", category: "harborttagning", price: 399 },
  { id: "hb-svank", slug: "hb-svank", name: "Svank", area: "Bål", category: "harborttagning", price: 599 },
  { id: "hb-halva-rygg", slug: "hb-halva-rygg", name: "Halva ryggen", area: "Bål", category: "harborttagning", price: 1095 },
  { id: "hb-hela-rygg", slug: "hb-hela-rygg", name: "Hela ryggen", area: "Bål", category: "harborttagning", price: 1799 },
  { id: "hb-rygg-axlar", slug: "hb-rygg-axlar", name: "Rygg & axlar", area: "Bål", category: "harborttagning", price: 2099 },
  // Bikini & rumpa
  { id: "hb-bikini", slug: "hb-bikini", name: "Bikini", area: "Bikini & rumpa", category: "harborttagning", price: 1095 },
  { id: "hb-brasiliansk", slug: "hb-brasiliansk", name: "Brasiliansk", area: "Bikini & rumpa", category: "harborttagning", price: 1499, popular: true },
  { id: "hb-brasiliansk-armhalor", slug: "hb-brasiliansk-armhalor", name: "Brasiliansk & armhålor", area: "Bikini & rumpa", category: "harborttagning", price: 1599 },
  { id: "hb-rumpa", slug: "hb-rumpa", name: "Rumpa", area: "Bikini & rumpa", category: "harborttagning", price: 999 },
  { id: "hb-insida-rumpa", slug: "hb-insida-rumpa", name: "Insida rumpa", area: "Bikini & rumpa", category: "harborttagning", price: 999 },
  { id: "hb-rumpa-brasiliansk", slug: "hb-rumpa-brasiliansk", name: "Rumpa + brasiliansk", area: "Bikini & rumpa", category: "harborttagning", price: 2095 },
  // Armar & ben
  { id: "hb-hander-fingrar", slug: "hb-hander-fingrar", name: "Händer & fingrar", area: "Armar & ben", category: "harborttagning", price: 199 },
  { id: "hb-halva-armar", slug: "hb-halva-armar", name: "Halva armar", area: "Armar & ben", category: "harborttagning", price: 1095 },
  { id: "hb-hela-armar", slug: "hb-hela-armar", name: "Hela armar", area: "Armar & ben", category: "harborttagning", price: 1499 },
  { id: "hb-knan", slug: "hb-knan", name: "Knän", area: "Armar & ben", category: "harborttagning", price: 599 },
  { id: "hb-halva-ben", slug: "hb-halva-ben", name: "Halva ben", area: "Armar & ben", category: "harborttagning", price: 1399 },
  { id: "hb-hela-ben", slug: "hb-hela-ben", name: "Hela ben", area: "Armar & ben", category: "harborttagning", price: 1899 },
  { id: "hb-tar-fotter", slug: "hb-tar-fotter", name: "Tår & fötter", area: "Armar & ben", category: "harborttagning", price: 249 },
  { id: "hb-vartgard", slug: "hb-vartgard", name: "Vårtgård", area: "Armar & ben", category: "harborttagning", price: 249 },
  // Paket
  { id: "hb-dam-halva-ben", slug: "hb-dam-halva-ben", name: "Dam — Halva ben + brasiliansk + armhålor", area: "Paket", category: "harborttagning", price: 2299, popular: true },
  { id: "hb-dam-hela-ben", slug: "hb-dam-hela-ben", name: "Dam — Hela ben + brasiliansk + armhålor", area: "Paket", category: "harborttagning", price: 2699 },
  { id: "hb-dam-helkropp", slug: "hb-dam-helkropp", name: "Dam — Helkropp (exkl. ansikte)", area: "Paket", category: "harborttagning", price: 3899 },
];

export const treatmentsByCategory = (id: TreatmentCategoryId) =>
  treatments.filter((t) => t.category === id);

export const popularTreatments = () => treatments.filter((t) => t.popular);

export const formatPrice = (price: number) =>
  price === 0 ? "Kostnadsfri" : `${price.toLocaleString("sv-SE")} kr`;

export const bookingUrl = (treatment?: Treatment) => {
  if (treatment?.bokadirektPath) {
    return `${BOKADIREKT_BASE_URL}/${treatment.bokadirektPath}`;
  }
  return BOKADIREKT_BASE_URL;
};
