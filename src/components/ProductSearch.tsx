"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { brands, products, type Product } from "@/lib/products";
import {
  createProductSearchIndex,
  normalizeSearchText,
  searchProductIndex,
} from "@/lib/product-search";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

export const PRODUCT_SEARCH_DIALOG_ID = "product-search-dialog";

const searchIndex = createProductSearchIndex(products);
const popularProducts = products.filter((product) => product.bestseller || product.featured).slice(0, 4);

interface ProductSearchProps {
  open: boolean;
  onClose: () => void;
}

function ProductResult({
  product,
  active,
  optionId,
  onClose,
  onActivate,
}: {
  product: Product;
  active: boolean;
  optionId?: string;
  onClose: () => void;
  onActivate?: () => void;
}) {
  return (
    <li className="min-w-0">
      <Link
        id={optionId}
        href={`/produkter/${product.slug}`}
        onClick={onClose}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={`group flex min-h-24 items-center gap-4 border-b border-border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sage-dark sm:p-4 ${
          active ? "bg-cream" : "hover:bg-cream/70"
        }`}
      >
        <ProductImage
          name={product.name}
          brand={product.brand}
          imageUrl={product.imageUrl}
          className="h-20 w-16 shrink-0 sm:h-24 sm:w-20"
          sizes="80px"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{product.brand}</p>
          <h3 className="mt-1 line-clamp-2 font-serif text-base leading-tight transition-colors group-hover:text-sage-dark sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 truncate text-xs text-muted">{product.tagline}</p>
          <div className="mt-2 flex items-baseline gap-3 text-xs">
            <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
            <span className="text-muted">{product.size}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function ProductSearch({ open, onClose }: ProductSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = normalizeSearchText(query);
  const results = useMemo(() => searchProductIndex(searchIndex, query), [query]);
  const exactBrand = brands.find(
    (brand) => normalizeSearchText(brand) === normalizedQuery
  );
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      restoreFocusRef.current = true;
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
      if (restoreFocusRef.current) {
        const focusTarget = returnFocusRef.current?.isConnected
          ? returnFocusRef.current
          : document.querySelector<HTMLElement>(
              `[aria-controls="${PRODUCT_SEARCH_DIALOG_ID}"]`
            );
        requestAnimationFrame(() => focusTarget?.focus());
      }
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [normalizedQuery]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  const activateResult = (index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      document
        .getElementById(`product-search-result-${results[index]?.product.id}`)
        ?.scrollIntoView({ block: "nearest" });
    });
  };

  const requestClose = (restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    onClose();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    const columns = window.matchMedia("(min-width: 640px)").matches ? 2 : 1;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? 0 : Math.min(activeIndex + columns, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? results.length - 1 : Math.max(activeIndex - columns, 0));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? 0 : Math.min(activeIndex + 1, results.length - 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? 0 : Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex >= 0 ? activeIndex : 0];
      if (selected) {
        router.push(`/produkter/${selected.product.slug}`);
        requestClose(false);
      }
    }
  };

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) requestClose();
  };

  return (
    <dialog
      ref={dialogRef}
      id={PRODUCT_SEARCH_DIALOG_ID}
      aria-labelledby="product-search-title"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClose={() => {
        if (open) requestClose();
      }}
      onMouseDown={handleBackdropClick}
      className="m-auto h-[82dvh] max-h-[780px] w-[calc(100%-2rem)] max-w-5xl overflow-hidden border-0 bg-background p-0 text-foreground shadow-2xl outline-none backdrop:bg-ink/35 backdrop:backdrop-blur-[2px] open:block max-sm:h-dvh max-sm:max-h-dvh max-sm:w-full max-sm:max-w-none"
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-border px-4 py-4 sm:px-8 sm:py-6">
          <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage-dark">Produktkatalog</p>
              <h2 id="product-search-title" className="mt-1 font-serif text-2xl sm:text-3xl">
                Sök produkter
              </h2>
            </div>
            <button
              type="button"
              onClick={() => requestClose()}
              aria-label="Stäng sökningen"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-sage-dark"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <label htmlFor="product-search-input" className="sr-only">
            Sök efter produkt, varumärke, kategori, hudtyp eller ingrediens
          </label>
          <div className="flex items-center gap-3 border-b-2 border-ink pb-3 focus-within:border-sage-dark sm:gap-4">
            <Search className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden="true" />
            <input
              ref={inputRef}
              id="product-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Produkt, varumärke eller ingrediens…"
              autoComplete="off"
              spellCheck="false"
              maxLength={100}
              aria-describedby="product-search-status"
              className="min-w-0 flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-muted/70 sm:text-3xl"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="shrink-0 px-2 py-1 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Rensa
              </button>
            )}
          </div>
          <p
            id="product-search-status"
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {!normalizedQuery
              ? `Sök bland ${products.length} produkter.`
              : results.length > 0
                ? `${results.length} ${results.length === 1 ? "produkt" : "produkter"} hittades.`
                : "Inga produkter hittades."}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {!normalizedQuery ? (
            <div className="p-4 sm:p-8">
              <section aria-labelledby="product-search-brands">
                <h3
                  id="product-search-brands"
                  className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted"
                >
                  Sök på varumärke
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => {
                        setQuery(brand);
                        inputRef.current?.focus();
                      }}
                      className="border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-sage hover:bg-cream focus-visible:outline-2 focus-visible:outline-sage-dark"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-8" aria-labelledby="product-search-popular">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 id="product-search-popular" className="font-serif text-xl sm:text-2xl">
                      Populärt just nu
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Sök direkt bland alla {products.length} produkter i katalogen.
                    </p>
                  </div>
                  <span className="hidden text-xs text-muted sm:block">⌘/Ctrl + K</span>
                </div>
                <ul className="mt-4 grid sm:grid-cols-2">
                  {popularProducts.map((product) => (
                    <ProductResult
                      key={product.id}
                      product={product}
                      active={false}
                      onClose={() => requestClose(false)}
                    />
                  ))}
                </ul>
              </section>
            </div>
          ) : results.length > 0 ? (
            <section aria-labelledby="product-search-result-heading">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-8">
                <h3 id="product-search-result-heading" className="min-w-0 break-words font-serif text-lg sm:text-xl">
                  {exactBrand ? `Alla produkter från ${exactBrand}` : `Resultat för “${query.trim()}”`}
                </h3>
                <p className="shrink-0 text-xs text-muted">
                  {results.length} {results.length === 1 ? "produkt" : "produkter"}
                </p>
              </div>
              <ul id="product-search-results" className="grid px-1 sm:grid-cols-2 sm:px-4">
                {results.map(({ product }, index) => (
                  <ProductResult
                    key={product.id}
                    product={product}
                    active={activeIndex === index}
                    optionId={`product-search-result-${product.id}`}
                    onActivate={() => setActiveIndex(index)}
                    onClose={() => requestClose(false)}
                  />
                ))}
              </ul>
            </section>
          ) : (
            <div className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
              <Search className="h-8 w-8 text-sage" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">Inga produkter hittades</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Vi hittade inget för “{query.trim()}”. Prova ett produktnamn, varumärke,
                hudbehov eller en ingrediens.
              </p>
              <Link
                href="/produkter"
                onClick={() => requestClose(false)}
                className="mt-6 border-b border-ink pb-1 text-sm font-medium hover:text-sage-dark"
              >
                Visa hela produktkatalogen
              </Link>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
