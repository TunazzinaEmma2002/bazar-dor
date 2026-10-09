import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { changeInfo, emoji, formatPrice, UNIT, UNIT_SHORT } from "@/lib/format";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Protected route: login na thakle signin e pathabe
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const ch = changeInfo(product.change);
  const unitShort = UNIT_SHORT[product.unit];

  // bazar-wise gor = (min + max) / 2
  const rows = product.markets.map((m) => ({
    ...m,
    avg: Math.round((m.min + m.max) / 2),
  }));
  const lowest = rows.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = rows.reduce((a, b) => (b.max > a.max ? b : a));
  const average = Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length);

  const diff = product.today - product.yesterday;
  const summaryLine =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(Math.abs(diff))} টাকা`
        : "গতকালের মতোই আজও দাম অপরিবর্তিত";

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.nameBn}</span>
      </nav>

      {/* Top summary */}
      <section className="mt-4 bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="w-16 h-16 rounded-xl bg-gray-100 grid place-items-center text-4xl shrink-0">
            {emoji(product.image)}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>{UNIT[product.unit]}</span>
              <Link
                href={`/category/${product.category}`}
                className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium"
              >
                {emoji(product.categoryIcon)} {product.categoryNameBn}
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-600">{summaryLine}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 px-6 py-4 text-center shrink-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>
          <p className="text-xs text-gray-500">টাকা / {unitShort}</p>
          <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-md ${ch.cls}`}>
            {ch.text}
          </span>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {formatPrice(lowest.min)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">{lowest.market}</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {formatPrice(highest.max)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">{highest.market}</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatPrice(average)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সব বাজারের গড়, প্রতি {unitShort}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {history.map((h) => (
            <div key={h.label} className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">{h.label}</p>
              <p className="font-semibold text-gray-900">{formatPrice(h.value)} টাকা</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market-wise table */}
      <section className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-3 font-medium">বাজার</th>
                <th className="py-2 pr-3 font-medium">বিভাগ</th>
                <th className="py-2 pr-3 font-medium text-right">সর্বনিম্ন</th>
                <th className="py-2 pr-3 font-medium text-right">সর্বোচ্চ</th>
                <th className="py-2 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.market} className="border-b border-gray-100 last:border-0">
                  <td className="py-2.5 pr-3 font-medium text-gray-900">{r.market}</td>
                  <td className="py-2.5 pr-3 text-gray-600">{r.division}</td>
                  <td className="py-2.5 pr-3 text-right">{formatPrice(r.min)} টাকা</td>
                  <td className="py-2.5 pr-3 text-right">{formatPrice(r.max)} টাকা</td>
                  <td className="py-2.5 text-right font-bold">{formatPrice(r.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}