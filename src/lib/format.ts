import type { Change, Unit } from "@/types";

const BN = "০১২৩৪৫৬৭৮৯";

// 123 -> ১২৩
export const toBn = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => BN[Number(d)]);

// 1850 -> ১,৮৫০
export const formatPrice = (n: number): string =>
  toBn(Number(n).toLocaleString("en-US"));

export const UNIT: Record<Unit, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// up = green, down = red, flat = gray 
export function changeInfo(change: Change): { text: string; cls: string } {
  const pct = toBn(Math.abs(change.pct).toFixed(1));
  if (change.dir === "up")
    return { text: `▲ ${pct}%`, cls: "text-green-700 bg-green-50" };
  if (change.dir === "down")
    return { text: `▼ ${pct}%`, cls: "text-red-600 bg-red-50" };
  return { text: `— ${pct}%`, cls: "text-gray-500 bg-gray-100" };
}

export function banglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}
const EMOJI_FALLBACK: Record<string, string> = {
  "🫘": "🥜",
  "🫙": "🛢️",
  "🫚": "🌿",
};

export const emoji = (e: string): string => EMOJI_FALLBACK[e] ?? e;