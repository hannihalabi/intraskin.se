import type { Product } from "./products";

export interface ProductSearchEntry {
  product: Product;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  ingredients: string;
  skinTypes: string;
  description: string;
  identity: string;
  nameWords: string[];
  brandWords: string[];
  categoryWords: string[];
  taglineWords: string[];
  ingredientWords: string[];
  skinTypeWords: string[];
  descriptionWords: string[];
  searchWords: string[];
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("sv-SE")
    .replace(/&/g, " och ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const skinTypeAliases: Record<string, string> = {
  alla: "alla hudtyper",
  torr: "torr hud",
  fet: "fet oljig hud",
  blandhud: "blandhud kombinerad hud",
  kanslig: "kanslig känslig hud",
  mogen: "mogen hud anti age",
  akne: "akne acne orenheter oren hud",
  rosacea: "rosacea couperose rodnad",
  pigmentering: "pigmentering pigmentflackar pigmentfläckar ojämn hudton",
};

const categoryAliases: Record<string, string> = {
  Rengöring: "rengöringar cleanser cleansers rengöringsprodukt ansiktstvätt",
  Toner: "ansiktsvatten face mist",
  "Serum & Ampull": "serum ampull ampuller ampoule ampoules",
  Kräm: "kräm krämer creme cremer cream creams ansiktskräm fuktighetskräm",
  "BB & Skydd": "bb cream bbcream skydd solskydd spf",
  "Peeling & Mask": "peeling peelingar exfoliering mask masker ansiktsmask",
  Olja: "olja oljor oil oils ansiktsolja",
  "Kit & Tillbehör": "kit paket set tillbehör verktyg",
};

function createWordVariants(value: string): string[] {
  const words = value.split(" ").filter(Boolean);
  const joinedPairs = words.slice(0, -1).map((word, index) => `${word}${words[index + 1]}`);
  return [...words, ...joinedPairs, words.join("")];
}

export function createProductSearchIndex(products: Product[]): ProductSearchEntry[] {
  return products.map((product) => {
    const name = normalizeSearchText(product.name);
    const brand = normalizeSearchText(product.brand);
    const category = normalizeSearchText(
      `${product.category} ${categoryAliases[product.category] ?? ""}`
    );
    const tagline = normalizeSearchText(product.tagline);
    const ingredients = normalizeSearchText(product.keyIngredients.join(" "));
    const skinTypes = normalizeSearchText(
      product.skinType
        .map((skinType) => `${skinType} ${skinTypeAliases[skinType] ?? ""}`)
        .join(" ")
    );
    const description = normalizeSearchText(product.description);
    const identity = normalizeSearchText(`${product.brand} ${product.name}`);
    const reference = normalizeSearchText(`${product.id} ${product.slug}`);
    const badges = normalizeSearchText(product.badges?.join(" ") ?? "");
    const nameWords = createWordVariants(name);
    const brandWords = createWordVariants(brand);
    const categoryWords = createWordVariants(category);
    const taglineWords = createWordVariants(tagline);
    const ingredientWords = createWordVariants(ingredients);
    const skinTypeWords = createWordVariants(skinTypes);
    const descriptionWords = createWordVariants(description);
    const referenceWords = createWordVariants(reference);
    const badgeWords = createWordVariants(badges);
    const searchWords = Array.from(
      new Set([
        ...nameWords,
        ...brandWords,
        ...categoryWords,
        ...taglineWords,
        ...ingredientWords,
        ...skinTypeWords,
        ...descriptionWords,
        ...referenceWords,
        ...badgeWords,
      ])
    );
    return {
      product,
      name,
      brand,
      category,
      tagline,
      ingredients,
      skinTypes,
      description,
      identity,
      nameWords,
      brandWords,
      categoryWords,
      taglineWords,
      ingredientWords,
      skinTypeWords,
      descriptionWords,
      searchWords,
    };
  });
}

function startsWithWord(value: string, query: string): boolean {
  return value === query || value.startsWith(`${query} `) || value.includes(` ${query}`);
}

function scoreField(words: string[], token: string, exact: number, prefix: number): number {
  if (words.includes(token)) return exact;
  if (token.length > 1 && words.some((word) => word.startsWith(token))) return prefix;
  return 0;
}

function scoreEntry(entry: ProductSearchEntry, query: string, tokens: string[]): number {
  let score = 0;

  if (entry.identity === query) score += 1_500;
  else if (entry.identity.startsWith(query)) score += 1_000;

  if (entry.name === query) score += 1_400;
  else if (entry.name.startsWith(query)) score += 950;
  else if (startsWithWord(entry.name, query)) score += 750;
  else if (entry.name.includes(query)) score += 500;

  if (entry.brand === query) score += 1_200;
  else if (entry.brand.startsWith(query)) score += 850;
  else if (entry.brand.includes(query)) score += 650;

  if (entry.category === query) score += 500;
  else if (entry.category.includes(query)) score += 300;

  if (entry.tagline.includes(query)) score += 180;
  if (entry.ingredients.includes(query)) score += 160;
  if (entry.skinTypes.includes(query)) score += 170;
  if (entry.description.includes(query)) score += 15;

  for (const token of tokens) {
    score += scoreField(entry.nameWords, token, 100, 75);
    score += scoreField(entry.brandWords, token, 80, 60);
    score += scoreField(entry.categoryWords, token, 45, 30);
    score += scoreField(entry.skinTypeWords, token, 40, 25);
    score += scoreField(entry.ingredientWords, token, 30, 20);
    score += scoreField(entry.taglineWords, token, 18, 12);
    score += scoreField(entry.descriptionWords, token, 6, 3);
  }

  if (entry.product.bestseller) score += 6;
  if (entry.product.featured) score += 4;

  return score;
}

export function searchProductIndex(
  index: ProductSearchEntry[],
  rawQuery: string
): ProductSearchEntry[] {
  const query = normalizeSearchText(rawQuery);
  if (!query) return [];

  const tokens = query.split(" ");
  const tokensWithExactMatches = new Set(
    tokens.filter((token) => index.some((entry) => entry.searchWords.includes(token)))
  );

  return index
    .filter((entry) =>
      tokens.every((token) => {
        if (tokensWithExactMatches.has(token) || token.length === 1) {
          return entry.searchWords.some(
            (word) =>
              word === token ||
              (token.length > 1 &&
                word.startsWith(token) &&
                word.length - token.length <= 2)
          );
        }
        return entry.searchWords.some((word) => word.startsWith(token));
      })
    )
    .map((entry) => ({ entry, score: scoreEntry(entry, query, tokens) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.entry.product.name.localeCompare(b.entry.product.name, "sv-SE")
    )
    .map(({ entry }) => entry);
}
