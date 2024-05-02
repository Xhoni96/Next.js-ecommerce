import { client, e } from "@/lib/edgedb";

import { CategoriesClient } from "./components/CategoriesClient";
import { IntlDateTimeFormat } from "@/lib/utils";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await e
    .select(e.Category, (category) => ({
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      billboard: {
        label: true,
      },

      filter: e.op(category.store.id, "=", e.uuid(params.storeId)),

      order_by: {
        expression: category.createdAt,
        direction: e.DESC,
      },
    }))
    .run(client);

  const formattedCategories = categories.map((category) => ({
    ...category,
    createdAt: IntlDateTimeFormat.format(new Date(category.createdAt)),
    updatedAt: IntlDateTimeFormat.format(new Date(category.updatedAt)),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
