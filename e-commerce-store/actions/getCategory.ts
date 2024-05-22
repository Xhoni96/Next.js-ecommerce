import type { Category, Color, Product, Size } from "@/lib/types";

type Res = {
  category: Category | null;
  products: Array<Product> | null;
  sizes: Array<Size> | null;
  colors: Array<Color> | null;
};

type Props = {
  categoryId: string;
  productQuery?: Partial<{
    sizeId: string;
    colorId: string;
  }>;
};

export const getCategoryData = async ({ categoryId, productQuery }: Props): Promise<Res> => {
  const searchParamObject = { ...productQuery, categoryId };

  Object.keys(searchParamObject).forEach((key) => {
    if (!searchParamObject[key as keyof typeof searchParamObject]) {
      delete searchParamObject[key as keyof typeof searchParamObject];
    }
  });

  const queryString = new URLSearchParams(searchParamObject).toString();

  const results = await Promise.allSettled([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${queryString}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sizes`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/colors`),
  ]);

  return {
    products: results[0].status === "fulfilled" ? await results[0].value.json() : null,
    category: results[1].status === "fulfilled" ? await results[1].value.json() : null,
    sizes: results[2].status === "fulfilled" ? await results[2].value.json() : null,
    colors: results[3].status === "fulfilled" ? await results[3].value.json() : null,
  };
};
