import type { Category } from "@/lib/types";

export const getCategories = async (): Promise<Array<Category>> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  return res.json();
};
