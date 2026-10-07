import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Hero />

      <ProductSection
        title="▲ আজ দাম বেড়েছে"
        products={risers}
        titleClass="text-green-700"
      />

      <ProductSection
        title="▼ আজ দাম কমেছে"
        products={fallers}
        titleClass="text-red-600"
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব পণ্যের আজকের দাম ও দামের পরিবর্তন"
        products={products}
      />
    </div>
  );
}