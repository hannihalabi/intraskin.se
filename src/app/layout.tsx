import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intraskin.se"),
  title: {
    default: "Intraskin — Skandinavisk hudvård för alla hudtyper",
    template: "%s | Intraskin",
  },
  description:
    "Premium skandinavisk hudvård. Kuraterade serum, krämer, ampuller och rengöring för känslig, mogen, fet och pigmenterad hud. Fri frakt över 500 kr.",
  keywords: [
    "hudvård",
    "skincare",
    "serum",
    "ansiktskräm",
    "rosacea",
    "rengöring",
    "BB cream",
    "AHA",
    "vitamin C",
    "skandinavisk hudvård",
  ],
  openGraph: {
    title: "Intraskin — Skandinavisk hudvård",
    description: "Premium hudvård för synliga resultat. Skandinavisk design, vetenskap och omsorg.",
    type: "website",
    locale: "sv_SE",
    url: "https://intraskin.se",
    siteName: "Intraskin",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sv"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
