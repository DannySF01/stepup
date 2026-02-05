import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans mx-auto container overflow-x-hidden antialiased flex flex-col min-h-screen bg-zinc-50 dark:bg-black`}
      >
        <Header />
        <div className="pt-(--header-height)">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
