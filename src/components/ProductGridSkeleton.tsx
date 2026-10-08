export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="skeleton w-11 h-11 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="space-y-2">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-5 w-24" />
            </div>
            <div className="skeleton h-6 w-14 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}