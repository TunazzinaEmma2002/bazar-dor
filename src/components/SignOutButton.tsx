"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="btn btn-sm btn-outline border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
    >
      সাইন আউট
    </button>
  );
}
