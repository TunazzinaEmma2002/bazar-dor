import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="skeleton h-20 w-full rounded-xl" />
      <div className="skeleton h-14 w-full rounded-xl mt-4" />
      <div className="mt-6">
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}