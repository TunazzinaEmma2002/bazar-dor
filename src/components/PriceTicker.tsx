import { formatPrice, UNIT_SHORT, changeInfo, emoji } from "@/lib/format";
import type { Product } from "@/types";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products]; 

  return (
    <div className="marquee bg-white border-b border-gray-200 overflow-hidden">
      <div className="marquee-track py-2 text-xs sm:text-sm">
        {items.map((p, i) => {
          const ch = changeInfo(p.change);
          return (
            <span
              key={i}
              className="flex items-center gap-1.5 px-5 whitespace-nowrap"
            >
              <span>{emoji(p.image)}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-gray-600">
                {formatPrice(p.today)} টাকা/{UNIT_SHORT[p.unit]}
              </span>
              <span className={`font-semibold px-1.5 rounded ${ch.cls}`}>
                {ch.text}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}