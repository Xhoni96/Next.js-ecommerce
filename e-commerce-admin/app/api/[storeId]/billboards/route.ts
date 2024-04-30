import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { BillboardRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: BillboardRouteParams }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await e
      .select(e.Billboard, (billboard) => ({
        label: true,
        imageUrl: true,
        filter: e.op(billboard.store.id, "=", e.uuid(params.storeId)),
      }))
      .run(client);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: BillboardRouteParams }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = e.select(e.Store, () => ({
      filter_single: { id: params.storeId, userId },
    }));

    const storeRes = await store.run(client);

    if (!storeRes) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await e
      .insert(e.Billboard, {
        label,
        imageUrl,
        store,
      })
      .run(client);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
