import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");
  const user = session.user;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <span className="w-16 h-16 rounded-xl bg-green-700 text-white grid place-items-center text-2xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-900">তথ্য</h2>
          <dl className="mt-3 text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-500">নাম</dt>
              <dd className="font-medium text-gray-900">{user.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">ইমেইল</dt>
              <dd className="font-medium text-gray-900">{user.email}</dd>
            </div>
          </dl>
          <Link
            href="/profile/update"
            className="btn w-full mt-5 bg-green-700 hover:bg-green-800 text-white border-0"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}