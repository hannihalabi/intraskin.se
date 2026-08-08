"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { products, type Product } from "@/lib/products";
import {
  createProductSearchIndex,
  normalizeSearchText,
  searchProductIndex,
} from "@/lib/product-search";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

export const PRODUCT_SEARCH_PANEL_ID = "product-search-panel";

const searchIndex = createProductSearchIndex(products);

interface ProductSearchProps {
  open: boolean;
  onClose: (restoreFocus?: boolean) => void;
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
  optionId: string;
  onClose: () => void;
  onActivate: () => void;
}) {
  return (
    <li>
      <Link
        id={optionId}
        href={`/produkter/${product.slug}`}
        onClick={onClose}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={`group grid min-h-24 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-b border-border px-1 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sage-dark sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:px-2 ${
          active ? "bg-cream" : "hover:bg-cream/70"
        }`}
      >
        <ProductImage
          name={product.name}
          brand={product.brand}
          imageUrl={product.imageUrl}
          className="h-20 w-[4.5rem] shrink-0 sm:w-20"
          sizes="80px"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-muted">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>
          <h3 className="mt-1 line-clamp-2 font-serif text-base leading-tight transition-colors group-hover:text-sage-dark sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted sm:text-sm">{product.tagline}</p>
          <div className="mt-2 flex items-baseline gap-3 text-xs sm:hidden">
            <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
            <span className="text-muted">{product.size}</span>
          </div>
        </div>

        <div className="hidden min-w-24 text-right sm:block">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-muted">{product.size}</p>
          <p className="mt-3 text-xs text-sage-dark opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Visa produkt
          </p>
        </div>
      </Link>
    </li>
  );
}

export function ProductSearch({ open, onClose }: ProductSearchProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = normalizeSearchText(query);
  const results = useMemo(() => searchProductIndex(searchIndex, query), [query]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    setQuery("");
    setActiveIndex(-1);
  }, [open]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [normalizedQuery]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || panelRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest(`[aria-controls="${PRODUCT_SEARCH_PANEL_ID}"]`)
      ) {
        return;
      }
      onClose(false);
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  const activateResult = (index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      document
        .getElementById(`product-search-result-${results[index]?.product.id}`)
        ?.scrollIntoView({ block: "nearest" });
    });
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? 0 : Math.min(activeIndex + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activateResult(activeIndex < 0 ? results.length - 1 : Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex >= 0 ? activeIndex : 0];
      if (selected) {
        router.push(`/produkter/${selected.product.slug}`);
        onClose(false);
      }
    }
  };

  return (
    <div
      id={PRODUCT_SEARCH_PANEL_ID}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        open ? "grid-rows-[1fr] border-t border-border" : "grid-rows-[0fr]"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="min-h-0 overflow-hidden">
        <div ref={panelRef} className="bg-background shadow-[0_18px_30px_-28px_rgba(26,26,26,0.55)]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div role="search" className="flex items-center gap-3 border-b-2 border-ink pb-3 focus-within:border-sage-dark sm:gap-4">
              <Search className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden="true" />
              <label htmlFor="product-search-input" className="sr-only">
                Sök efter produkt, varumärke, kategori, hudtyp eller ingrediens
              </label>
              <input
                ref={inputRef}
                id="product-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Sök produkt, varumärke eller ingrediens…"
                autoComplete="off"
                spellCheck="false"
                maxLength={100}
                aria-controls={normalizedQuery ? "product-search-results" : undefined}
                aria-describedby="product-search-status"
                className="min-w-0 flex-1 bg-transparent font-serif text-lg outline-none placeholder:text-muted/70 sm:text-2xl"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 px-1 py-1 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  Rensa
                </button>
              )}
              <button
                type="button"
                onClick={() => onClose()}
                aria-label="Stäng sökningen"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-sage-dark"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <p
              id="product-search-status"
              className={normalizedQuery ? "sr-only" : "pt-3 text-xs text-muted sm:text-sm"}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {!normalizedQuery
                ? `Sök bland ${products.length} produkter. Du kan även söka på hudtyp och aktiva ingredienser.`
                : results.length > 0
                  ? `${results.length} ${results.length === 1 ? "produkt" : "produkter"} hittades.`
                  : "Inga produkter hittades."}
            </p>

            {normalizedQuery && (
              <div className="pt-3">
                <div className="flex items-center justify-between gap-4 pb-2">
                  <p className="min-w-0 truncate text-sm text-muted">
                    Resultat för <span className="font-medium text-foreground">“{query.trim()}”</span>
                  </p>
                  <p className="shrink-0 text-xs text-muted">
                    {results.length} {results.length === 1 ? "produkt" : "produkter"}
                  </p>
                </div>

                {results.length > 0 ? (
                  <ul
                    id="product-search-results"
                    className="max-h-[min(58dvh,34rem)] overflow-y-auto overscroll-contain border-t border-border"
                  >
                    {results.map(({ product }, index) => (
                      <ProductResult
                        key={product.id}
                        product={product}
                        active={activeIndex === index}
                        optionId={`product-search-result-${product.id}`}
                        onActivate={() => setActiveIndex(index)}
                        onClose={() => onClose(false)}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="border-t border-border py-8 text-center sm:py-10">
                    <h2 className="font-serif text-xl">Inga produkter hittades</h2>
                    <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
                      Prova ett produktnamn, varumärke, hudbehov eller en ingrediens.
                    </p>
                    <Link
                      href="/produkter"
                      onClick={() => onClose(false)}
                      className="mt-5 inline-block border-b border-ink pb-1 text-sm font-medium hover:text-sage-dark"
                    >
                      Visa hela produktkatalogen
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
