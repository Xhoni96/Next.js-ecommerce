import { client, e } from "@/lib/edgedb";
import { BillboardForm } from "./components/BillboardForm";
import type { BillboardFormType, BillboardRouteParams } from "@/lib/types";

const BillboardPage = async ({ params }: { params: BillboardRouteParams }) => {
  let billboard: BillboardFormType | null = null;

  try {
    billboard = await e
      .select(e.Billboard, () => ({
        label: true,
        imageUrl: true,
        isDefault: true,
        filter_single: { id: params.billboardId },
      }))
      .run(client);
  } catch (error) {
    // do nothing
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
