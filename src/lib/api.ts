import type { Category, Product } from "@/types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// if first  API fail 
async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {}
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${category}` : "/products";
  return (await get<Product[]>(path)) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  return (await get<Category[]>("/categories")) ?? [];
}

// route /product/[slug]
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}