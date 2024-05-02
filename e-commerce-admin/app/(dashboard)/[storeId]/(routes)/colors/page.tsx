import { client, e } from "@/lib/edgedb";

import { ColorsClient } from "./components/ColorsClient";
import { IntlDateTimeFormat } from "@/lib/utils";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await e
    .select(e.Color, (color) => ({
      id: true,
      name: true,
      value: true,
      createdAt: true,
      updatedAt: true,
      filter: e.op(color.store.id, "=", e.uuid(params.storeId)),
      order_by: {
        expression: color.createdAt,
        direction: e.DESC,
      },
    }))
    .run(client);

  const formattedColors = colors.map((color) => ({
    ...color,
    createdAt: IntlDateTimeFormat.format(new Date(color.createdAt)),
    updatedAt: IntlDateTimeFormat.format(new Date(color.updatedAt)),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
