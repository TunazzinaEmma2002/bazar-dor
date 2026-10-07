import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  titleClass?: string;
};

export default function ProductSection({
  title,
  subtitle,
  products,
  id,
  titleClass = "text-gray-900",
}: Props) {
  return (
    <section id={id} className="scroll-mt-32 mt-10">
      <h2 className={`text-xl font-bold ${titleClass}`}>{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}