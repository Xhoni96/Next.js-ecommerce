import type { Product } from "@/lib/types";

type Res = {
  product: Product | null;
  relatedProducts: Array<Product> | null;
};

type Props = {
  productId: string;
  categoryId: string;
};

export const getProductData = async ({ productId, categoryId }: Props): Promise<Res> => {
  const results = await Promise.allSettled([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`),

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}&productId=${productId}`),
  ]);

  return {
    product: results[0].status === "fulfilled" ? await results[0].value.json() : null,
    relatedProducts: results[1].status === "fulfilled" ? await results[1].value.json() : null,
  };
};
