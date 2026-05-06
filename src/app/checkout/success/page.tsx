import { CheckoutSuccessClient } from "./CheckoutSuccessClient";

export const metadata = {
  title: "Tack för din order | Intraskin",
  description: "Din betalning har genomförts.",
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessClient />;
}
