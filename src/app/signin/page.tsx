"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-sm mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিস্তারিত দাম, বাজারভিত্তিক তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-xl border border-gray-200 p-5 text-left space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">ইমেইল</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-green-700 hover:bg-green-800 text-white border-0"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>

          <div className="divider text-xs text-gray-400">অথবা</div>
          <SocialButtons />

          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700 font-medium">
              সাইন আপ করুন
            </Link>
          </p>
        </form>

        <Link
          href="/"
          className="inline-block mt-5 text-sm text-gray-500 hover:text-gray-700"
        >
          ← হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}