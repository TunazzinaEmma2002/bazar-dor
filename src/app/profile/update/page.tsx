import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
        <UpdateNameForm initialName={session.user.name} />
        <Link
          href="/profile"
          className="inline-block mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </div>
  );
}