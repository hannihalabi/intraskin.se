"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  products,
  categories,
  brands,
  skinTypeLabels,
  type Category,
  type Brand,
  type SkinType,
} from "@/lib/products";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") as Category | null;
  const initialSkinType = searchParams.get("skinType") as SkinType | null;
  const initialBrand = searchParams.get("brand") as Brand | null;

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<SkinType[]>(
    initialSkinType ? [initialSkinType] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(
    initialBrand ? [initialBrand] : []
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length)
      list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedSkinTypes.length)
      list = list.filter((p) =>
        p.skinType.some((s) => selectedSkinTypes.includes(s))
      );
    if (selectedBrands.length)
      list = list.filter((p) => selectedBrands.includes(p.brand));

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, "sv"));
        break;
      default:
        list.sort(
          (a, b) =>
            (b.featured ? 1 : 0) +
            (b.bestseller ? 0.5 : 0) -
            ((a.featured ? 1 : 0) + (a.bestseller ? 0.5 : 0))
        );
    }
    return list;
  }, [selectedCategories, selectedSkinTypes, selectedBrands, sort]);

  const toggle = <T,>(arr: T[], val: T, set: (v: T[]) => void) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setSelectedBrands([]);
    router.replace("/produkter");
  };

  const totalActive =
    selectedCategories.length + selectedSkinTypes.length + selectedBrands.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-12 lg:mb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3">
          Alla produkter
        </p>
        <h1 className="font-serif text-5xl lg:text-6xl mb-4">
          Vår <em className="italic">kuraterade</em> kollektion
        </h1>
        <p className="text-muted max-w-2xl">
          {filtered.length} produkter från Skandinaviens och Europas mest älskade
          hudvårdsmärken — filtrera efter dina behov.
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
        {/* Filters — desktop sidebar */}
        <aside className="hidden lg:block">
          <FilterPanel
            selectedCategories={selectedCategories}
            selectedSkinTypes={selectedSkinTypes}
            selectedBrands={selectedBrands}
            onToggleCategory={(c) => toggle(selectedCategories, c, setSelectedCategories)}
            onToggleSkinType={(s) => toggle(selectedSkinTypes, s, setSelectedSkinTypes)}
            onToggleBrand={(b) => toggle(selectedBrands, b, setSelectedBrands)}
            onClear={clearAll}
            totalActive={totalActive}
          />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-sm tracking-wider uppercase"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter {totalActive > 0 && `(${totalActive})`}
            </button>
            <p className="hidden lg:block text-sm text-muted">
              Visar {filtered.length} av {products.length}
            </p>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none bg-transparent border border-border pl-4 pr-10 py-2.5 text-sm tracking-wider uppercase cursor-pointer focus:outline-none focus:border-ink"
              >
                <option value="featured">Mest populära</option>
                <option value="price-asc">Pris: lågt-högt</option>
                <option value="price-desc">Pris: högt-lågt</option>
                <option value="name">Namn A-Ö</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Active filter chips */}
          {totalActive > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategories.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  onRemove={() => toggle(selectedCategories, c, setSelectedCategories)}
                />
              ))}
              {selectedSkinTypes.map((s) => (
                <Chip
                  key={s}
                  label={skinTypeLabels[s]}
                  onRemove={() => toggle(selectedSkinTypes, s, setSelectedSkinTypes)}
                />
              ))}
              {selectedBrands.map((b) => (
                <Chip
                  key={b}
                  label={b}
                  onRemove={() => toggle(selectedBrands, b, setSelectedBrands)}
                />
              ))}
              <button
                onClick={clearAll}
                className="text-xs tracking-wider uppercase underline underline-offset-4 ml-2 self-center"
              >
                Rensa alla
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl mb-3">Inga produkter matchar</p>
              <p className="text-muted mb-6">Prova att ta bort några filter.</p>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-ink text-cream text-sm tracking-[0.1em] uppercase hover:bg-sage-dark transition-colors"
              >
                Rensa filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-serif text-xl">Filter</h3>
              <button onClick={() => setFiltersOpen(false)} aria-label="Stäng">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel
                selectedCategories={selectedCategories}
                selectedSkinTypes={selectedSkinTypes}
                selectedBrands={selectedBrands}
                onToggleCategory={(c) =>
                  toggle(selectedCategories, c, setSelectedCategories)
                }
                onToggleSkinType={(s) =>
                  toggle(selectedSkinTypes, s, setSelectedSkinTypes)
                }
                onToggleBrand={(b) => toggle(selectedBrands, b, setSelectedBrands)}
                onClear={clearAll}
                totalActive={totalActive}
              />
            </div>
            <div className="border-t border-border p-5">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full px-6 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium"
              >
                Visa {filtered.length} produkter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream text-xs tracking-wider">
      {label}
      <button onClick={onRemove} aria-label={`Ta bort ${label}`}>
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

interface FilterPanelProps {
  selectedCategories: Category[];
  selectedSkinTypes: SkinType[];
  selectedBrands: Brand[];
  onToggleCategory: (c: Category) => void;
  onToggleSkinType: (s: SkinType) => void;
  onToggleBrand: (b: Brand) => void;
  onClear: () => void;
  totalActive: number;
}

function FilterPanel({
  selectedCategories,
  selectedSkinTypes,
  selectedBrands,
  onToggleCategory,
  onToggleSkinType,
  onToggleBrand,
  onClear,
  totalActive,
}: FilterPanelProps) {
  const skinTypes = Object.keys(skinTypeLabels) as SkinType[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs tracking-[0.2em] uppercase font-medium">Filter</h3>
        {totalActive > 0 && (
          <button
            onClick={onClear}
            className="text-xs underline underline-offset-2 text-muted hover:text-ink"
          >
            Rensa
          </button>
        )}
      </div>

      <FilterGroup title="Kategori">
        {categories.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={selectedCategories.includes(c)}
            onChange={() => onToggleCategory(c)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Hudtyp">
        {skinTypes.map((s) => (
          <Checkbox
            key={s}
            label={skinTypeLabels[s]}
            checked={selectedSkinTypes.includes(s)}
            onChange={() => onToggleSkinType(s)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Märke">
        {brands.map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => onToggleBrand(b)}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-base mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <span
        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
          checked ? "bg-ink border-ink" : "border-beige-dark group-hover:border-ink"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-cream fill-current">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm">{label}</span>
    </label>
  );
}
