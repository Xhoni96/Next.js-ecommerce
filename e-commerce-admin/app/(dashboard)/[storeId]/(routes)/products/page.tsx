import { client, e } from "@/lib/edgedb";

import { ProductClient } from "./components/ProductClient";
import { formatter, IntlDateTimeFormat } from "@/lib/utils";
import type { ProductsRouteParams } from "@/lib/types";

const ProductsPage = async ({ params }: { params: ProductsRouteParams }) => {
  const products = await e
    .select(e.Product, (product) => ({
      ...e.Product["*"],

      category: {
        name: true,
      },
      color: {
        name: true,
        value: true,
      },
      size: {
        name: true,
      },

      filter: e.op(product.store.id, "=", e.uuid(params.storeId)),
      order_by: {
        expression: product.createdAt,
        direction: e.DESC,
      },
    }))
    .run(client);

  const formattedProducts = products.map((product) => ({
    ...product,
    category: product.category.name,
    size: product.size.name,
    createdAt: IntlDateTimeFormat.format(new Date(product.createdAt)),
    price: formatter.format(Number(product.price)),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
