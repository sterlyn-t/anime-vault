import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import Footer from "@/components/Footer";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Vault",
  description: "Your favorite anime, all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#0F1117]`}>
        <main className="max-w-7xl mx-auto bg-[#0F1117]">
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
