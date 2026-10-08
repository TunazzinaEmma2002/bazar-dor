import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই, সরানো হয়েছে অথবা ঠিকানাটি ভুল।",
}: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link
        href="/"
        className="btn mt-6 bg-green-700 hover:bg-green-800 text-white border-0"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}