import Link from "next/link";
import { changeInfo, formatPrice, UNIT } from "@/lib/format";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const ch = changeInfo(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-green-600 transition"
    >
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-lg bg-gray-100 grid place-items-center text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">{UNIT[product.unit]}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${ch.cls}`}
        >
          {ch.text}
        </span>
      </div>
    </Link>
  );
}