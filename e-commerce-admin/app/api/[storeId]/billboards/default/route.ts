import { NextResponse } from "next/server";
import { client, e } from "@/lib/edgedb";
import type { BillboardRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: BillboardRouteParams }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const defaultBillboard = await e
      .select(e.Billboard, (billboard) => ({
        label: true,
        imageUrl: true,
        filter_single: e.op(
          e.op(billboard.store.id, "=", e.uuid(params.storeId)),
          "and",
          e.op(billboard.isDefault, "=", e.bool(true))
        ),
      }))
      .run(client);

    return NextResponse.json(defaultBillboard);
  } catch (error) {
    console.log("[BILLBOARD_GET_DEFAULT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
