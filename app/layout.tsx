import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AuthProvider } from "@/providers/AuthProvider";
import { createServer } from "@/lib/supabase/server";
import { getProfile } from "@/services/authService";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { getCart } from "@/lib/cart/getCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    cart?.cart_items.map((item) => item.quantity).reduce((a, b) => a + b, 0) ||
    0;

  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans mx-auto container overflow-x-hidden antialiased flex flex-col min-h-screen bg-zinc-50 dark:bg-black`}
      >
        <AuthProvider initialUser={user} initialProfile={profile}>
          <Header cart_count={cart_count} />
          <div className="pt-(--header-height)">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
