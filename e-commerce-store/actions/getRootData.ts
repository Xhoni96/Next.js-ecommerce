import type { Billboard, Product } from "@/lib/types";

type Res = {
  billboard: Billboard | null;
  products: Array<Product> | null;
};

export const getRootData = async (): Promise<Res> => {
  const results = await Promise.allSettled([getDefaultBillboard(), getProducts()]);

  return {
    billboard: results[0].status === "fulfilled" ? results[0].value : null,
    products: results[1].status === "fulfilled" ? results[1].value : null,
  };
};

const getDefaultBillboard = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/billboards/default`).then((res) => res.json());

const getProducts = () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`).then((res) => res.json());
