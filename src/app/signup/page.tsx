"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-sm mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white rounded-xl border border-gray-200 p-5 text-left space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">নাম</label>
            <input
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className="input input-bordered w-full mt-1"
            />
          </div>
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
          <div>
            <label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              name="confirm"
              type="password"
              placeholder="আবার লিখুন"
              className="input input-bordered w-full mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-green-700 hover:bg-green-800 text-white border-0"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <div className="divider text-xs text-gray-400">অথবা</div>
          <SocialButtons />

          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-700 font-medium">
              সাইন ইন করুন
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