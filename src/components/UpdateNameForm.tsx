"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("নাম সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white rounded-xl border border-gray-200 p-5 space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-gray-700">নাম</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="আপনার নাম লিখুন"
          className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn w-full bg-green-700 hover:bg-green-800 text-white border-0"
      >
        {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}