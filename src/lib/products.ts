export type SkinType =
  | "alla"
  | "torr"
  | "fet"
  | "blandhud"
  | "kanslig"
  | "mogen"
  | "akne"
  | "rosacea"
  | "pigmentering";

export type Category =
  | "Rengöring"
  | "Toner"
  | "Serum & Ampull"
  | "Kräm"
  | "BB & Skydd"
  | "Peeling & Mask"
  | "Olja"
  | "Kit & Tillbehör";

export type Brand = "Alex Cosmetic" | "Gilda Liljeblad" | "Genosys" | "Meline" | "Argana";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  skinType: SkinType[];
  price: number;
  size: string;
  tagline: string;
  description: string;
  keyIngredients: string[];
  usage: string;
  imageUrl: string;
  badges?: string[];
  featured?: boolean;
  bestseller?: boolean;
  awardWinner?: boolean;
}

export const products: Product[] = [
  {
    id: "cleansing-gel",
    slug: "cleansing-gel",
    name: "Cleansing Gel",
    brand: "Alex Cosmetic",
    category: "Rengöring",
    skinType: ["alla"],
    price: 429,
    size: "200 ml",
    tagline: "Den enklaste, mest uppskattade rengöringen",
    description:
      "En uppfriskande rengöringsgelé som avlägsnar makeup och orenheter samtidigt som den återfuktar och återställer hudens naturliga balans. Panthenol och trollhassel-extrakt ger antiinflammatoriska och lugnande egenskaper.",
    keyIngredients: ["Panthenol", "Tilia Cordata (Linden)", "Avena Strigosa", "Aloe Barbadensis", "Wheat Protein"],
    usage: "Massera in på fuktig hud morgon och kväll. Skölj av med ljummet vatten.",
    imageUrl: "/products/cleansing-gel.jpg",
    featured: true,
    bestseller: true,
  },
  {
    id: "matt-pore-cleanser",
    slug: "matt-pore-cleanser",
    name: "Matt Pore Cleanser",
    brand: "Alex Cosmetic",
    category: "Rengöring",
    skinType: ["fet", "blandhud", "akne"],
    price: 429,
    size: "200 ml",
    tagline: "Klargörande rengöringsgel för oren hud",
    description:
      "Lätt skummande gel som tar bort orenheter, överskott av talg och makeup djupt in i porerna utan att obalansera huden. Polyhydroxisyror och mjölksyra ger en mild keratolytisk effekt för en märkbart matt hudkänsla.",
    keyIngredients: ["Cocamidopropyl Betaine", "Mjölksyra", "Glukonolakton", "Laktobionsyra", "Allantoin", "Honungsextrakt"],
    usage: "Massera försiktigt in på fuktad hud morgon och kväll. Undvik ögonområdet. Skölj noggrant.",
    imageUrl: "/products/matt-pore-cleanser.png",
    badges: ["Matt finish"],
  },
  {
    id: "soft-deep-cleansing-butter",
    slug: "soft-deep-cleansing-butter",
    name: "Soft Deep Cleansing Butter",
    brand: "Alex Cosmetic",
    category: "Rengöring",
    skinType: ["kanslig", "rosacea", "alla"],
    price: 365,
    size: "75 ml",
    tagline: "Mjukt rengöringssmör för känslig hud",
    description:
      "Lätt, mjukt rengöringssmör för ansikte och makeup-borttagning, även för känsliga ögonpartier. Speciellt framtagen för känslig och överreaktiv hud, t.ex. rosacea.",
    keyIngredients: ["Aloe Barbadensis", "Sweet Almond Oil", "Castor Oil", "Cupuacu Seedbutter", "Tocopherol"],
    usage: "Applicera på torr hud, massera försiktigt. Skölj av med ljummet vatten eller torka av med fuktad bomullspad.",
    imageUrl: "/products/soft-deep-cleansing-butter.png",
    badges: ["För känslig hud"],
  },
  {
    id: "nourishing-exfoliator",
    slug: "nourishing-exfoliator",
    name: "Nourishing Exfoliator",
    brand: "Alex Cosmetic",
    category: "Peeling & Mask",
    skinType: ["alla", "mogen", "pigmentering"],
    price: 598,
    size: "50 ml",
    tagline: "Mild effektiv enzym-peeling",
    description:
      "Cosmeceutical peeling baserad på salicylsyra och naturliga enzymer från ananas. Minskar orenheter, förfinar utseendet, jämnar ut linjer och ljusar upp pigmentfläckar. Stöder hudens naturliga förnyelseprocess.",
    keyIngredients: ["Salicylsyra", "Bacillus Ferment", "Ananas-enzymer", "Ascorbinsyra", "Marina salter", "Allantoin"],
    usage: "Applicera på rengjord torr hud, låt verka 15 min, skölj av med ljummet vatten. Använd som hemmakur 20-30 dagar.",
    imageUrl: "/products/nourishing-exfoliator.jpg",
    badges: ["Cosmeceutical"],
    featured: true,
  },
  {
    id: "green-tonic",
    slug: "green-tonic",
    name: "Green Tonic",
    brand: "Alex Cosmetic",
    category: "Toner",
    skinType: ["alla", "torr", "mogen"],
    price: 429,
    size: "200 ml",
    tagline: "Fuktboost & ansiktsvatten med Q10",
    description:
      "Mild, fuktgivande och uppfriskande toner med värdefulla örter, hyaluronsyra och Koenzym Q10. Lämnar huden mättad, sval och avslappnad. Passar utmärkt som fuktserum under valfri kräm.",
    keyIngredients: ["Sodium Hyaluronate", "Ubiquinone (Q10)", "Allantoin", "Panthenol", "Fennel Extract"],
    usage: "Applicera på rengjord hud morgon och kväll med bomullsrondell eller direkt med händerna.",
    imageUrl: "/products/green-tonic.jpg",
    bestseller: true,
  },
  {
    id: "herbal-lotion",
    slug: "herbal-lotion",
    name: "Herbal Lotion",
    brand: "Alex Cosmetic",
    category: "Toner",
    skinType: ["kanslig", "rosacea", "alla"],
    price: 398,
    size: "200 ml",
    tagline: "Ansiktsvatten för den känsliga hudtypen",
    description:
      "Lugnar och uppfriskar huden, förhindrar irritation och återställer fuktbalansen. Inflammationshämmande hamamelis och klådstillande kamomill. Perfekt för couperose, rosacea och irriterad hud.",
    keyIngredients: ["Panthenol", "Bisabolol", "Aloe Barbadensis", "Witch Hazel", "Chamomile Extract"],
    usage: "Applicera morgon och kväll efter rengöring med bomullsrondell.",
    imageUrl: "/products/herbal-lotion.jpg",
  },
  {
    id: "hemp-marula-skin-chill-drops",
    slug: "hemp-marula-skin-chill-drops",
    name: "Hemp Marula Skin Chill Drops",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["torr", "kanslig", "rosacea"],
    price: 398,
    size: "7 x 1,5 ml ampuller",
    tagline: "Lugnande aktiv ampull med hampa & marula",
    description:
      "Koncentrerad ampull med hampa- och marula-olja. Lugnar känslig, irriterad och röd hud. Idealisk för torr hud, psoriasis och dermatit. Perfekt vinter- och after sun-ampull.",
    keyIngredients: ["Hampa-olja", "Marula-olja"],
    usage: "Bryt av toppen, använd halva mängden morgon och halva kvällen. Klappa in, följ med kräm.",
    imageUrl: "/products/hemp-marula-chill-drops.jpg",
    badges: ["Vinter & after sun"],
  },
  {
    id: "recoup-cream",
    slug: "recoup-cream",
    name: "Recoup Cream",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["kanslig", "rosacea"],
    price: 749,
    size: "50 ml",
    tagline: "24h dag- och nattkräm för rosacea & couperose",
    description:
      "Stärker och skyddar känslig, överreaktiv hud. Lugnar blossig hud, reducerar rodnad, stärker kapillärerna och främjar syresättning. Innehåller grönt pigment som neutraliserar rödhet.",
    keyIngredients: ["Shea Butter", "TTF (Thermus Thermophillus)", "Escin", "Resveratrol", "Zinkoxid", "Titanium Dioxid"],
    usage: "Applicera morgon och kväll på rengjord hud.",
    imageUrl: "/products/recoup-cream.jpg",
    featured: true,
  },
  {
    id: "recoup-fluid",
    slug: "recoup-fluid",
    name: "Recoup Fluid",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["kanslig", "rosacea", "blandhud"],
    price: 598,
    size: "30 ml",
    tagline: "Serum-creme för känslig & överkänslig hud",
    description:
      "Specifik serum-creme för allmänt känslig hud eller överkänslig hud så som rosacea, couperose, kärlbristningar och dermatit. Kylande, stressreducerande, syresättande effekt.",
    keyIngredients: ["TTF", "Jojoba", "Hyaluronate", "Resurrection Plant", "Butcher's Broom", "Mexican Giant Hysopp"],
    usage: "Använd som 24h-creme för fet/blandhud eller under Recoup Cream för torr hud.",
    imageUrl: "/products/recoup-fluid.jpg",
  },
  {
    id: "total-calm-cream",
    slug: "total-calm-cream",
    name: "Total Calm Cream",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["kanslig", "rosacea", "torr"],
    price: 529,
    size: "30 ml",
    tagline: "För den hyperkänsliga hudtypen",
    description:
      "24h-creme för hud som inte tål någonting. Lättar irritation och rodnad, återuppbygger barriären. Fri från emulgeringsmedel, mineraloljor, parfym och djuringredienser. Passar gravida och kemoterapi-patienter.",
    keyIngredients: ["Olivolja", "Sheasmör", "Ceramide 3", "Alanine", "Argan Oil", "Squalane"],
    usage: "Applicera morgon och kväll. Fri från parfym, emulgeringsmedel och konserveringsmedel.",
    imageUrl: "/products/total-calm-cream.jpg",
    badges: ["Fri från parfym", "Gravidsäker"],
    featured: true,
  },
  {
    id: "vitamin-cream",
    slug: "vitamin-cream",
    name: "Vitamin Cream",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["torr", "kanslig"],
    price: 598,
    size: "50 ml",
    tagline: "Den guldgula skyddande cremen",
    description:
      "Speciell creme för vård av torr och känslig hud. Kombination av närande oljor och vitamin C och E lugnar och återställer hudens balans. Fungerar antiseptiskt och vitaliserande.",
    keyIngredients: ["Argan Oil", "Sheasmör", "Beta-Carotene", "Carrot Extract", "Ascorbic Acid", "Tocopherol"],
    usage: "Applicera morgon och kväll på rengjord hud. Kombinera gärna med Hyaluron Skin Dive under.",
    imageUrl: "/products/vitamin-cream.jpg",
  },
  {
    id: "bb-cream-nude",
    slug: "bb-cream-nude",
    name: "BB Cream Nude Tone",
    brand: "Alex Cosmetic",
    category: "BB & Skydd",
    skinType: ["alla", "rosacea", "kanslig"],
    price: 429,
    size: "30 ml",
    tagline: "Multifunktionell BB-cream — ljus nyans",
    description:
      "Kombinerar hudvård, UV-skydd (SPF 15) och lätt makeup i ett. Neutraliserar rodnad, jämnar ut hudtonen. Perfekt efter microneedling, IPL eller peeling.",
    keyIngredients: ["Sheasmör", "Panthenol", "Bisabolol", "Titanium Dioxide", "Zinc Oxide"],
    usage: "Applicera som sista steg ovanpå dagcreme. Klappa försiktigt in produkten.",
    imageUrl: "/products/bb-cream-nude.webp",
    badges: ["SPF 15"],
  },
  {
    id: "bb-cream-medium",
    slug: "bb-cream-medium",
    name: "BB Cream Medium Tone",
    brand: "Alex Cosmetic",
    category: "BB & Skydd",
    skinType: ["alla", "blandhud", "fet"],
    price: 429,
    size: "30 ml",
    tagline: "Den mest sålda BB-cremen",
    description:
      "Multifunktionell BB-cream för irriterad hud, blandhy och fetare hudtyp. Normaliserar hudfunktioner, neutraliserar rodnad, ger jämnare hudton. Matt effekt med UV-filter.",
    keyIngredients: ["Sheasmör", "Panthenol", "Bisabolol", "Titanium Dioxide", "Zinc Oxide"],
    usage: "Applicera som slutprodukt ovanpå din dagcreme. Klappa in för bästa resultat.",
    imageUrl: "/products/bb-cream-medium.png",
    badges: ["SPF 15", "Bestseller"],
    bestseller: true,
  },
  {
    id: "bb-cream-dark",
    slug: "bb-cream-dark",
    name: "BB Cream Dark Tone",
    brand: "Alex Cosmetic",
    category: "BB & Skydd",
    skinType: ["alla", "blandhud", "fet"],
    price: 429,
    size: "30 ml",
    tagline: "Multifunktionell BB-cream — mörk nyans",
    description:
      "Sista steget i din hudvård. Passar irriterad hud, blandhy med problem och fetare hudtyp. Normaliserar, neutraliserar rodnad, ger matt effekt med UV-filter.",
    keyIngredients: ["Sheasmör", "Panthenol", "Bisabolol", "Titanium Dioxide", "Zinc Oxide"],
    usage: "Klappa försiktigt in produkten — smörj inte ut den för bästa resultat.",
    imageUrl: "/products/bb-cream-dark.jpg",
    badges: ["SPF 15"],
  },
  {
    id: "bb-cream-deep-dark",
    slug: "bb-cream-deep-dark",
    name: "BB Cream Deep Dark Tone",
    brand: "Alex Cosmetic",
    category: "BB & Skydd",
    skinType: ["alla", "rosacea", "kanslig"],
    price: 429,
    size: "30 ml",
    tagline: "Mörkaste multifunktionella BB-cremen",
    description:
      "Den mörkaste BB-cremen som kombinerar hudvård, skydd (SPF 15) och lätt makeup. Naturligt matt finish som lugnar och återfuktar. Varm mörkbrun nyans.",
    keyIngredients: ["Sheasmör", "Panthenol", "Bisabolol", "Titanium Dioxide", "Zinc Oxide"],
    usage: "Applicera som sista steg, ovanpå dagcreme. Klappa försiktigt in.",
    imageUrl: "/products/bb-cream-deep-dark.jpg",
    badges: ["SPF 15"],
  },
  {
    id: "blemish-control",
    slug: "blemish-control",
    name: "Blemish Control",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["fet", "akne", "blandhud"],
    price: 360,
    size: "7 x 1,5 ml ampuller",
    tagline: "Koncentrat för fetare hudtyp & akne",
    description:
      "Ampull som minskar orenheter och skapar matt finish för oljig och blandhy. Antibakteriell, antiinflammatorisk och lugnande. Normaliserar sebum-produktion, minimerar porer.",
    keyIngredients: ["Antibakteriellt komplex"],
    usage: "Applicera halva ampullen morgon och halva kvällen efter rengöring.",
    imageUrl: "/products/blemish-control.jpg",
  },
  {
    id: "clear-cream",
    slug: "clear-cream",
    name: "Clear Cream",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["fet", "akne", "blandhud"],
    price: 529,
    size: "50 ml",
    tagline: "Optimal kräm för fetare hudtyp",
    description:
      "24h specialvårdande kräm med Tea Tree Oil och panthenol. Antibakteriella, inflammationshämmande egenskaper. Minskar orenheter, normaliserar talgproduktion, ger matt yta.",
    keyIngredients: ["Tea Tree Oil", "Melaleuca", "Panthenol", "Bisabolol", "Witch Hazel", "Allantoin"],
    usage: "Applicera morgon och kväll, gärna med ett serum under (Blemish Control eller Hyaluron Skin Dive).",
    imageUrl: "",
  },
  {
    id: "stop-on-spot-gel",
    slug: "stop-on-spot-gel",
    name: "Stop On Spot Gel",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["alla", "akne"],
    price: 198,
    size: "10 ml",
    tagline: "S.O.S. — punkt-behandling för finnar",
    description:
      "Supereffektiv punkt-behandling för finnar, akneutslag och myggbett. Klådstillande och lugnande. Salicylsyra exfolierar och Zink, Kaolin och Svavel djuprengör inflammationer.",
    keyIngredients: ["Zink Oxide", "Sulfur", "Kaolin", "Salicylsyra", "Kampfer"],
    usage: "Ta en dutt och klappa in på finnen. Kan återappliceras flera gånger per dag, även utanpå makeup.",
    imageUrl: "/products/stop-on-spot-gel.jpg",
    badges: ["To-go"],
  },
  {
    id: "regenera-clarity-cream",
    slug: "regenera-clarity-cream",
    name: "Regenera Clarity Cream",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["akne", "mogen"],
    price: 849,
    size: "50 ml",
    tagline: "Specialprodukt för vuxen akne",
    description:
      "Avancerad 24h cosmeceuticals-kräm för att minimera och bekämpa vuxen akne. Kraftigt antiinflammatorisk, lugnande, hudregenerande och återbalanserande med anti-age-egenskaper.",
    keyIngredients: ["Salicylic Acid", "Hydrolyzed Yeast", "Niacinamide", "Hexyl Nicotinate", "Sage Extract"],
    usage: "Applicera morgon och kväll, gärna med Blemish Control eller 15% Vitamin C-serum under.",
    imageUrl: "/products/regenera-clarity-cream.png",
    badges: ["Cosmeceuticals"],
  },
  {
    id: "advanced-corrector",
    slug: "advanced-corrector",
    name: "Advanced Corrector",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["pigmentering", "mogen"],
    price: 698,
    size: "30 ml",
    tagline: "Cosmeceuticals för pigment & solskador",
    description:
      "Lätt serum-liknande kräm för att balansera pigmenteringar och solskador. Resorcinol balanserar pigment-störningar, vitamin A och E regenererar och skyddar mot miljöpåverkan.",
    keyIngredients: ["4-Butylresorcinol", "Retinyl Acetate", "Tocopheryl Acetate", "Sunflower Oil"],
    usage: "Applicera morgon och kväll. Använd alltid SPF eller BB Cream ovanpå dagtid.",
    imageUrl: "/products/advanced-corrector.jpg",
    badges: ["Cosmeceuticals"],
  },
  {
    id: "botanical-spot-eraser",
    slug: "botanical-spot-eraser",
    name: "Botanical Spot Eraser",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["pigmentering"],
    price: 398,
    size: "7 x 1,5 ml ampuller",
    tagline: "Naturlig uppljusande ampull — 90% intensitet",
    description:
      "Med en bleknings-intensitet på 90% gör den naturliga ampullen huden ljusare snabbt och effektivt. Helt naturlig kombination som hämmar Tyrosinas och främjar nedbrytning av Tyrosin.",
    keyIngredients: ["Citronskals-fermentextrakt", "Lactobacillus", "Hyaluronate", "Coconut Extract"],
    usage: "Applicera några droppar morgon och kväll på förberedd hud. Massera in. Använd alltid solskydd.",
    imageUrl: "/products/botanical-spot-eraser.jpg",
  },
  {
    id: "corrector-serum-vitamin-c",
    slug: "corrector-serum-vitamin-c",
    name: "Corrector Serum + Vitamin C",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["pigmentering", "mogen", "alla"],
    price: 698,
    size: "30 ml",
    tagline: "Cosmeceutical mot pigment & solskador",
    description:
      "Koncentrerat serum som ljusar upp och förstärker hudens regenererande egenskaper. Alpina växtbaserade extrakt med Arbutin och C-vitamin ger synliga effekter på missfärgning.",
    keyIngredients: ["Arbutin", "Sodium Ascorbyl Phosphate", "Gigawhite", "Mallow", "Yarrow"],
    usage: "Applicera morgon och kväll innan kräm.",
    imageUrl: "/products/corrector-serum-vit-c.webp",
    badges: ["Cosmeceutical"],
  },
  {
    id: "natural-corrector-no3",
    slug: "natural-corrector-no3",
    name: "Natural Corrector No.3 + Vitamin C",
    brand: "Alex Cosmetic",
    category: "Kräm",
    skinType: ["pigmentering", "alla"],
    price: 749,
    size: "50 ml",
    tagline: "Naturlig dag-/nattcreme med C-vitamin",
    description:
      "Cosmeceuticals dag-/nattcreme med botaniskt komplex (Mulberry, Lakrits, Waltheria Indica) och vitaminer B3, C och E som arbetar uppljusare på mörka hudfläckar. UV-filter inkluderat.",
    keyIngredients: ["Niacinamide", "Sodium Ascorbyl Phosphate", "Mulberry Leaf", "Licorice", "Ferulic Acid"],
    usage: "Applicera morgon och kväll efter rengöring och serum. Avsluta med UV-skydd dagtid.",
    imageUrl: "/products/natural-corrector-no3.jpg",
    badges: ["Cosmeceuticals", "UV-skydd"],
  },
  {
    id: "silky-glow-fluid",
    slug: "silky-glow-fluid",
    name: "Silky Glow Fluid",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["alla", "mogen", "pigmentering"],
    price: 749,
    size: "30 ml",
    tagline: "Multifunktionell glow & anti-age",
    description:
      "Superlätt men rik produkt med multifunktionellt spektrum. Behandlar fukt, jobbar antiage, ger skydd från fria radikaler och massor av glow. Aktiv brightening på cellnivå.",
    keyIngredients: ["Vitamin C", "Adenosin", "Bisabolol", "Olive Leaf Extract", "Squalane", "Zink PCA"],
    usage: "Applicera morgon och kväll. Använd som superFluid under kräm.",
    imageUrl: "/products/silky-glow-fluid.jpg",
    featured: true,
  },
  {
    id: "elixir",
    slug: "elixir",
    name: "Elixir",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["torr", "kanslig", "mogen"],
    price: 629,
    size: "30 ml",
    tagline: "Den optimala serum-cremen för torr hud",
    description:
      "Avancerad, näringsrik emulsion för torr, känslig och mogen hud. Fylld med vetegrodds-extrakt, hyaluronsyra, närande oljor och vitaminer. Förbättrar struktur och elasticitet.",
    keyIngredients: ["Safflower Oil", "Castor Oil", "Wheat Bran Extract", "Sheasmör", "Hyaluronate"],
    usage: "Applicera kväll som intensiv behandling. Kan blandas med High Performance Mask.",
    imageUrl: "/products/elixir.jpg",
  },
  {
    id: "hyaluron-skin-dive",
    slug: "hyaluron-skin-dive",
    name: "Hyaluron Skin Dive",
    brand: "Alex Cosmetic",
    category: "Serum & Ampull",
    skinType: ["torr", "kanslig", "alla"],
    price: 360,
    size: "7 x 1,5 ml ampuller",
    tagline: "Intensiv fuktboost för torr & känslig hud",
    description:
      "Hyaluron i både korta och långa molekylkedjor. Binder fukt i flera lager i epidermis. Förbättrar elasticitet, fuktnivån, minimerar porer och rynkdjup, ger lugnande effekt.",
    keyIngredients: ["Sodium Hyaluronate (kort & lång kedja)"],
    usage: "Bryt av toppen, klappa in halva mängden, följ upp med kräm. Använd alltid BB-cream sist.",
    imageUrl: "/products/hyaluron-skin-dive.png",
    bestseller: true,
  },
  {
    id: "the-oil",
    slug: "the-oil",
    name: "THE OIL",
    brand: "Alex Cosmetic",
    category: "Olja",
    skinType: ["alla", "torr", "kanslig"],
    price: 798,
    size: "100 ml",
    tagline: "Magisk ansikts- & kroppsolja",
    description:
      "Kallpressade rena växtoljor (6 selekterade + Vitamin C & E + Paracress). Non-greasy, lystergivande olja med matt finish. Passar ansikte, kropp, hår och även babyn.",
    keyIngredients: ["Granatäpple", "Solrosolja", "Baobaolja", "Jojobaolja", "Sötmandel", "Paracress"],
    usage: "Värm i handen och massera in. Som serum för vintern eller torrolja för kroppen.",
    imageUrl: "/products/the-oil.jpg",
    badges: ["Multi-use", "Gravidsäker"],
    featured: true,
  },
  {
    id: "activating-aha-toner",
    slug: "activating-aha-toner",
    name: "Activating AHA Toner",
    brand: "Gilda Liljeblad",
    category: "Toner",
    skinType: ["mogen", "fet", "akne", "pigmentering"],
    price: 798,
    size: "100 ml",
    tagline: "Prisbelönt AHA-toner — silver Global Makeup Awards 2023",
    description:
      "AHA-toner som exfolierar tilltäppta porer och påskyndar cellförnyelsen. Reducerar pigmenteringar och fina linjer. Vunnit silver i Bästa Toner i Global Makeup Awards Scandinavia 2023.",
    keyIngredients: ["Lactic Acid", "Niacinamide", "Bisabolol", "Vaccinium Myrtillus", "Saccharum Officinarum"],
    usage: "Applicera efter rengöring med bomullspad. Använd minst SPF 30 dagtid.",
    imageUrl: "/products/activating-aha-toner.png",
    badges: ["Award Winner 2023"],
    awardWinner: true,
  },
  {
    id: "hydrating-toner",
    slug: "hydrating-toner",
    name: "Hydrating Toner",
    brand: "Gilda Liljeblad",
    category: "Toner",
    skinType: ["torr", "alla"],
    price: 470,
    size: "100 ml",
    tagline: "Intensivt återfuktande mist & toner",
    description:
      "Intensivt återfuktande ansiktsvatten för torr och fuktfattig hud. Ger omedelbar fräschhet och föryngrande effekt. Skyndar på cellförnyelsen. Underbar ros-doft.",
    keyIngredients: ["Glycerin", "Fagus Silvatica", "Niacinamide", "Lactic Acid", "Sodium PCA"],
    usage: "Spraya direkt på huden eller använd bomullspad morgon och kväll. Kan sprayas över makeup.",
    imageUrl: "/products/hydrating-toner.webp",
  },
  {
    id: "regenerating-aha-mask",
    slug: "regenerating-aha-mask",
    name: "Regenerating AHA Mask",
    brand: "Gilda Liljeblad",
    category: "Peeling & Mask",
    skinType: ["mogen", "fet", "akne", "pigmentering"],
    price: 590,
    size: "50 ml",
    tagline: "Prisbelönt — Bästa ansiktsmask 2023",
    description:
      "AHA-mask som omedelbart förnyar och framhäver ungdomlig hud. Ökar kollagenproduktionen, reducerar pigmenteringar och linjer. Vunnit Bästa Ansiktsmask i Global Makeup Awards Scandinavia 2023.",
    keyIngredients: ["Glycolic Acid", "Vaccinium Myrtillus", "Saccharum Officinarum", "Bisabolol"],
    usage: "Applicera 2-3 gånger i veckan, låt verka 5-10 min. Skölj av. Undvik solexponering.",
    imageUrl: "/products/regenerating-aha-mask.webp",
    badges: ["Award Winner 2023"],
    awardWinner: true,
    featured: true,
  },
  {
    id: "moisture-essentials-trial-kit",
    slug: "moisture-essentials-trial-kit",
    name: "Moisture Essentials Trial Kit",
    brand: "Gilda Liljeblad",
    category: "Kit & Tillbehör",
    skinType: ["torr", "kanslig"],
    price: 320,
    size: "Kit (6 produkter)",
    tagline: "Prova-på-kit för torr & känslig hud",
    description:
      "Komplett prova-på-kit med Micellar Makeup Remover, Hydrating Toner, Calming Serum, Vitalising Eye Cream, Nourishing Cream och Refining Peeling Mask. Allt du behöver för en hel rutin.",
    keyIngredients: ["Bisabolol", "Hexapeptide-48", "Hyaluronate", "Sheasmör", "Papain"],
    usage: "Följ rutin: rengöring, toner, serum, ögonkräm, dagkräm. Mask 2-3 gånger/vecka.",
    imageUrl: "/products/moisture-essentials-kit.webp",
    badges: ["Trial Kit"],
  },
  {
    id: "energising-vitamin-c-serum",
    slug: "energising-vitamin-c-serum",
    name: "Energising Vitamin C Serum",
    brand: "Gilda Liljeblad",
    category: "Serum & Ampull",
    skinType: ["alla", "mogen", "pigmentering"],
    price: 940,
    size: "30 ml",
    tagline: "Det bästa seret för glow",
    description:
      "C-vitamin serum som skyddar mot fria radikaler, jobbar mot pigmentfläckar och fina linjer. C-vitaminet tas upp direkt av hudens celler och fördröjer solrelaterat åldrande.",
    keyIngredients: ["L-Ascorbic Acid", "Ferulic Acid", "Propanediol"],
    usage: "Applicera på morgonen efter rengöring och innan kräm. Värmande känsla är normalt.",
    imageUrl: "/products/energising-vit-c-serum.webp",
    badges: ["Hero product"],
    featured: true,
  },
  {
    id: "genosys-microbiome-mist",
    slug: "genosys-microbiome-energy-mist",
    name: "Microbiome Energy Infusing Mist",
    brand: "Genosys",
    category: "Toner",
    skinType: ["alla"],
    price: 349,
    size: "80 ml",
    tagline: "Vitaliserar med pre- & probiotika",
    description:
      "Vitaliserar och stärker hudens naturliga försvar med pre- och probiotika som balanserar mikrobiomet. Hyaluronsyrakomplex ger omedelbar återfuktning och naturlig lyster.",
    keyIngredients: ["CUREBIOME", "Hyaluronan 10Multi", "FENSEBIOME", "Sheasmör", "Centella Asiatica"],
    usage: "Skaka väl, spraya 10-20 cm från ansiktet. Kan användas över makeup för dewy look.",
    imageUrl: "/products/genosys-microbiome-mist.png",
  },
  {
    id: "genosys-skin-defender",
    slug: "genosys-skin-defender-makeup-remover",
    name: "Skin Defender Lip & Eye Makeup Remover",
    brand: "Genosys",
    category: "Rengöring",
    skinType: ["alla", "kanslig"],
    price: 579,
    size: "200 ml",
    tagline: "Tvåfas-makeup-remover för känsliga partier",
    description:
      "Fräsch tvåfas makeup-remover som effektivt tar bort smink runt ögon och läppar utan att irritera. Oljefasen löser upp makeup, essence-fasen ger näring.",
    keyIngredients: ["Palmitoyl Tripeptide-5", "Acetyl Tetrapeptide-5", "Vita 10 Composite", "Carrot Extract"],
    usage: "Skaka väl, blöt en bomullspad och låt verka några sekunder innan du gnuggar bort.",
    imageUrl: "/products/genosys-skin-defender.webp",
  },
  {
    id: "genosys-snow-o2-cleanser",
    slug: "genosys-snow-o2-cleanser",
    name: "Snow O₂ Cleanser",
    brand: "Genosys",
    category: "Rengöring",
    skinType: ["alla"],
    price: 599,
    size: "180 ml",
    tagline: "Syrebubblande djuprengöring",
    description:
      "Effektiv men skonsam rengöring för ansikte och kropp. Naturligt genererade syrebubblor masserar, djuprengör och tar bort smink. Vitaliserande och uppfräschande.",
    keyIngredients: ["Phaseolus Radiatus", "Betula Platyphylla", "Angelica", "Soja Isoflavoner"],
    usage: "Applicera utan att massera. Låt syrebubblorna utvecklas innan du masserar och sköljer av.",
    imageUrl: "/products/genosys-snow-o2.webp",
  },
  {
    id: "meline-gentle-foam",
    slug: "meline-gentle-foam",
    name: "Gentle Foam",
    brand: "Meline",
    category: "Rengöring",
    skinType: ["alla"],
    price: 599,
    size: "150 ml",
    tagline: "Mild rengöring som ökar absorbering",
    description:
      "Mild men effektiv rengöring som skonsamt tar bort smink och smuts utan att torka ut. Ökar absorberingen av aktiva ingredienser i Meline-rutinen, energigivande effekt.",
    keyIngredients: ["Dexpanthenol", "Bisabolol", "Mineralkomplex"],
    usage: "Fukta huden med ljummet vatten, applicera en liten mängd skum, massera in och skölj av.",
    imageUrl: "/products/meline-gentle-foam.jpg",
  },
  {
    id: "argana-signature-beard-kit",
    slug: "argana-signature-beard-kit",
    name: "Signature Beard Kit",
    brand: "Argana",
    category: "Kit & Tillbehör",
    skinType: ["alla"],
    price: 499,
    size: "Komplett kit",
    tagline: "Lyxigt skäggvårdspaket",
    description:
      "Det ultimata verktyget för att vårda och styla skägget. Innehåller skäggolja, beard balm, kam, sax, borste, tygpåse och lyxig presentbox.",
    keyIngredients: ["Skäggolja", "Beard Balm"],
    usage: "Använd skäggolja och balm dagligen. Trimma med sax för att hålla formen.",
    imageUrl: "/products/argana-beard-kit.png",
    badges: ["Presentidé"],
  },
  {
    id: "argana-kessa-skrubbhandske",
    slug: "argana-kessa-skrubbhandske",
    name: "Kessa Skrubbhandske",
    brand: "Argana",
    category: "Kit & Tillbehör",
    skinType: ["alla"],
    price: 89,
    size: "1 st",
    tagline: "Professionell exfoliering hemma",
    description:
      "Effektiv skrubbhandske i 100% viskos. Exfolierar, tar bort döda hudceller och stimulerar blodcirkulationen. Lämnar huden len och strålande.",
    keyIngredients: ["100% Viskos"],
    usage: "Använd minst en gång i veckan. Kombinera gärna med Argana Black Soap. Maskintvätt 30°C.",
    imageUrl: "",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category) =>
  products.filter((p) => p.category === category);

export const getProductsBySkinType = (skinType: SkinType) =>
  products.filter((p) => p.skinType.includes(skinType));

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.skinType.some((s) => product.skinType.includes(s)))
    )
    .slice(0, limit);

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getAwardWinners = () => products.filter((p) => p.awardWinner);

export const categories: Category[] = [
  "Rengöring",
  "Toner",
  "Serum & Ampull",
  "Kräm",
  "BB & Skydd",
  "Peeling & Mask",
  "Olja",
  "Kit & Tillbehör",
];

export const skinTypeLabels: Record<SkinType, string> = {
  alla: "Alla hudtyper",
  torr: "Torr",
  fet: "Fet",
  blandhud: "Blandhud",
  kanslig: "Känslig",
  mogen: "Mogen",
  akne: "Akne & orenheter",
  rosacea: "Rosacea & couperose",
  pigmentering: "Pigmentering",
};

export const brands: Brand[] = ["Alex Cosmetic", "Gilda Liljeblad", "Genosys", "Meline", "Argana"];
