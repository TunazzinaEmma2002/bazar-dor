import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="skeleton h-64 w-full rounded-2xl" />
      <div className="skeleton h-6 w-40 mt-10 mb-4" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}