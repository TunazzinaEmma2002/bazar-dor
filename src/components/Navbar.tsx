"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { banglaDate, emoji } from "@/lib/format";
import type { Category } from "@/types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        {/* Row 1: logo + auth buttons */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg bg-green-700 text-white grid place-items-center text-lg">
              🛒
            </span>
            <span className="leading-tight">
              <span className="block font-bold text-gray-900">বাজার দর</span>
              <span
                className="block text-[11px] text-gray-500"
                suppressHydrationWarning
              >
                {banglaDate()}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-28 rounded-lg" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-green-700 text-white grid place-items-center font-semibold">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name?.split(" ")[0]}
                  </span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-xl shadow-lg border border-gray-100 w-56 p-2 mt-2"
                >
                  <li className="px-3 py-2 pointer-events-none">
                    <div className="flex flex-col items-start p-0">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link href="/profile">আমার প্রোফাইল</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-red-600">
                      সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-ghost btn-sm sm:btn-md"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm sm:btn-md bg-green-700 hover:bg-green-800 text-white border-0"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Row 2: category links */}
        <nav className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-green-700 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{emoji(c.icon)}</span>
                {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}