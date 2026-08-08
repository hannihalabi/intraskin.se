"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductSearch, PRODUCT_SEARCH_PANEL_ID } from "./ProductSearch";

export function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const openCart = useCart((s) => s.openCart);
  const closeCart = useCart((s) => s.closeCart);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => {
    closeCart();
    setMobileOpen(false);
    setSearchOpen(true);
  }, [closeCart]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        const target = event.target;
        const isEditable =
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          (target instanceof HTMLElement && target.isContentEditable);

        if (event.defaultPrevented || isEditable) return;
        event.preventDefault();
        if (!searchOpen) openSearch();
      }
    };

    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [openSearch, searchOpen]);

  const closeSearch = useCallback((restoreFocus = true) => {
    setSearchOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => searchButtonRef.current?.focus());
    }
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md",
          scrolled
            ? "bg-background/85 border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
            : "bg-background/60"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Öppna meny"
              className="lg:hidden p-2 -ml-2"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-sm">
              <Link href="/produkter" className="hover:text-sage-dark transition-colors">
                Alla produkter
              </Link>
              <Link href="/produkter?category=Serum%20%26%20Ampull" className="hover:text-sage-dark transition-colors">
                Serum
              </Link>
              <Link href="/produkter?category=Kr%C3%A4m" className="hover:text-sage-dark transition-colors">
                Krämer
              </Link>
              <Link href="/behandlingar" className="hover:text-sage-dark transition-colors">
                Behandlingar
              </Link>
            </nav>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <span className="font-serif text-xl tracking-[0.12em] font-medium min-[360px]:text-2xl min-[360px]:tracking-[0.15em] lg:text-3xl">
                INTRASKIN
              </span>
            </Link>

            <div className="flex items-center gap-1 lg:gap-3">
              <button
                ref={searchButtonRef}
                type="button"
                onClick={() => (searchOpen ? closeSearch(false) : openSearch())}
                aria-label={searchOpen ? "Stäng sökningen" : "Sök produkter"}
                aria-expanded={searchOpen}
                aria-controls={PRODUCT_SEARCH_PANEL_ID}
                className="p-2 hover:bg-cream rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-sage-dark"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button aria-label="Konto" className="p-2 hover:bg-cream rounded-full transition-colors hidden sm:block">
                <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label="Varukorg"
                className="relative p-2 hover:bg-cream rounded-full transition-colors"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-ink text-cream text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <ProductSearch open={searchOpen} onClose={closeSearch} />
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] h-dvh overflow-y-auto bg-background lg:hidden">
          <div className="flex items-center justify-between px-4 h-16 border-b border-border">
            <span className="font-serif text-2xl tracking-[0.15em] font-medium">INTRASKIN</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Stäng" className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1 text-lg">
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-3 border-b border-border py-3 text-left"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
              Sök produkter
            </button>
            <Link
              href="/produkter"
              onClick={() => setMobileOpen(false)}
              className="py-3 border-b border-border"
            >
              Alla produkter
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/produkter?category=${encodeURIComponent(c)}`}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-border"
              >
                {c}
              </Link>
            ))}
            <Link
              href="/behandlingar"
              onClick={() => setMobileOpen(false)}
              className="py-3 border-b border-border font-medium"
            >
              Behandlingar — boka tid
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
