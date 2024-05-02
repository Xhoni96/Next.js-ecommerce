import { NoResults } from "@/components/ui/NoResults";
import type { Product } from "@/lib/types";

type ProductsProps = {
  title: string;
  products: Array<Product>;
};

export const ProductList = ({ title, products }: ProductsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>

      {products.length > 0 ? (
        products.map((product) => <div key={product.id}></div>)
      ) : (
        <NoResults />
      )}
    </div>
  );
};
