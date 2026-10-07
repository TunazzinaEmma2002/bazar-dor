import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দৈনিক বাজার দর।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}