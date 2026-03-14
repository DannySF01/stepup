import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";

const font = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StepUp",
  description: "StepUp a sua loja online de calçado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={font.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
