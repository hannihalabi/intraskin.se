import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Alla produkter — Hudvård för alla hudtyper",
  description:
    "Utforska vår kuraterade kollektion av cosmeceuticals, serum, krämer, ampuller och rengöring. Filtrera efter hudtyp, kategori och märke.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogClient />
    </Suspense>
  );
}
