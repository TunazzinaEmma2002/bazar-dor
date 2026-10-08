import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";
import { getCategories, getProducts } from "@/lib/api";
import { emoji } from "@/lib/format";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, allInCategory] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  
  const products = allInCategory.filter((p) => p.category === slug);

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="এই মুহূর্তে এখানে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি।"
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
        <span className="w-12 h-12 rounded-lg bg-gray-100 grid place-items-center text-2xl">
          {emoji(category.icon)}
        </span>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-4">
        <CategoryProducts products={products} />
      </div>
    </div>
  );
}