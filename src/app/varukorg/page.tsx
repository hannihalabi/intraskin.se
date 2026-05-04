import type { Metadata } from "next";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Varukorg",
  description: "Granska din varukorg och gå till kassan.",
};

export default function CartPage() {
  return <CartPageClient />;
}
