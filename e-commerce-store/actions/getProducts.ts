import type { Product } from "@/lib/types";

type Res = {
  product: Product | null;
  relatedProducts: Array<Product> | null;
};

type Props = {
  productId: string;
  categoryId: string;
};

export const getProductsData = async ({ productId, categoryId }: Props): Promise<Res> => {
  const results = await Promise.allSettled([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}&productId=${productId}`),
  ]);

  return {
    product: results[0].status === "fulfilled" ? await results[0].value.json() : null,
    relatedProducts: results[1].status === "fulfilled" ? await results[1].value.json() : null,
  };
};

// const getProduct = (productId: string) =>
//   fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`).then((res) => res.json());

// const getProducts = (categoryId: string) =>
//   fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}`).then((res) => res.json());
