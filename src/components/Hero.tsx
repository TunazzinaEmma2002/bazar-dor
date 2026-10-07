import { banglaDate } from "@/lib/format";

export default function Hero() {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <span
          className="inline-block text-xs font-medium text-green-800 bg-green-100 px-3 py-1 rounded-full"
          suppressHydrationWarning
        >
          {banglaDate()}
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম। বিভিন্ন বাজারের
          সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং দামের ওঠানামা দেখুন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="btn mt-6 bg-green-700 hover:bg-green-800 text-white border-0"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-xs aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-green-50 grid place-items-center">
          <div className="text-center">
            <div className="text-8xl">🧺</div>
            <div className="mt-2 text-4xl tracking-widest">🍅🥕🥬🧅</div>
          </div>
        </div>
      </div>
    </section>
  );
}