import { client, e } from "@/lib/edgedb";

import { BillboardClient } from "./components/BillboardClient";
import { IntlDateTimeFormat } from "@/lib/utils";
import type { BillboardRouteParams } from "@/lib/types";

const BillboardsPage = async ({ params }: { params: BillboardRouteParams }) => {
  const billboards = await e
    .select(e.Billboard, (billboard) => ({
      id: true,
      label: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      filter: e.op(billboard.store.id, "=", e.uuid(params.storeId)),
      order_by: {
        expression: billboard.createdAt,
        direction: e.DESC,
      },
    }))
    .run(client);

  const formattedBillboards = billboards.map((billboard) => ({
    ...billboard,
    createdAt: IntlDateTimeFormat.format(new Date(billboard.createdAt)),
    updatedAt: IntlDateTimeFormat.format(new Date(billboard.updatedAt)),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
