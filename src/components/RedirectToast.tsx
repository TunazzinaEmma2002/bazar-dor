"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RedirectToast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("reason") === "login-required") {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [params]);

  return null;
}