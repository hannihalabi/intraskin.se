import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl tracking-[0.15em] font-medium block mb-4">
              INTRASKIN
            </span>
            <p className="text-sm text-cream/70 leading-relaxed mb-6">
              Skandinavisk hudvård i toppklass. Kuraterade produkter för synliga resultat —
              från känslig hud till mogen, från akne till anti-age.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 border border-cream/20 rounded-full hover:bg-cream/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 border border-cream/20 rounded-full hover:bg-cream/10 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.15em] uppercase mb-4 font-sans font-medium">Handla</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><Link href="/produkter" className="hover:text-cream transition-colors">Alla produkter</Link></li>
              <li><Link href="/produkter?category=Serum%20%26%20Ampull" className="hover:text-cream transition-colors">Serum & Ampuller</Link></li>
              <li><Link href="/produkter?category=Kr%C3%A4m" className="hover:text-cream transition-colors">Krämer</Link></li>
              <li><Link href="/produkter?category=Reng%C3%B6ring" className="hover:text-cream transition-colors">Rengöring</Link></li>
              <li><Link href="/produkter?skinType=rosacea" className="hover:text-cream transition-colors">För rosacea</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.15em] uppercase mb-4 font-sans font-medium">Kundservice</h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li><a href="#" className="hover:text-cream transition-colors">Kontakt</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Frakt & retur</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Vanliga frågor</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Hudtypsguide</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Spåra order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.15em] uppercase mb-4 font-sans font-medium">Nyhetsbrev</h4>
            <p className="text-sm text-cream/70 mb-4">
              Få 10% rabatt på första ordern och tidiga lanseringar.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="din@email.se"
                className="px-4 py-3 bg-transparent border border-cream/20 rounded-none text-sm placeholder:text-cream/40 focus:outline-none focus:border-cream"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-cream text-ink text-sm tracking-[0.1em] uppercase font-medium hover:bg-beige transition-colors"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Intraskin. Alla rättigheter förbehållna.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Integritetspolicy</a>
            <a href="#" className="hover:text-cream transition-colors">Cookies</a>
            <a href="#" className="hover:text-cream transition-colors">Villkor</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
