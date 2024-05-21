import { NoResults } from "@/components/ui/NoResults";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type ProductsProps = {
  title: string;
  products: Array<Product> | null;
};

export const ProductList = ({ title, products }: ProductsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.length ? products.map((product) => <ProductCard key={product.id} data={product} />) : <NoResults />}
      </div>
    </div>
  );
};
