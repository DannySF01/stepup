import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AuthProvider } from "@/providers/AuthProvider";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { getCart } from "@/lib/cart/getCart";
import { ToastProvider } from "@/components/ui/Toast";
import getFavorites from "@/lib/favorites/getFavorites";

export const metadata: Metadata = {
  title: "StepUp",
  description: "StepUp a sua loja online de calçado",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, profile } = await getUserWithProfile();

  const { cart } = await getCart();
  const cart_count =
    cart?.cart_items
      .map((item) => item.quantity)
      .reduce((a: any, b: any) => a + b, 0) || 0;

  const { data: favorites } = await getFavorites();
  const fav_count = favorites?.length || 0;

  return (
    <html lang="pt">
      <body className="font-sans min-h-screen mx-auto app-container flex flex-col bg-zinc-50 dark:bg-black">
        <AuthProvider initialUser={user} initialProfile={profile}>
          <ToastProvider>
            <Header cart_count={cart_count} fav_count={fav_count} />
            <div className="pt-(--header-height)">{children}</div>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
