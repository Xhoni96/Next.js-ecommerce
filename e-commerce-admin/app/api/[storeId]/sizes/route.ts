import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { SizesRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: SizesRouteParams }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const sizes = await e
      .select(e.Size, (size) => ({
        id: true,
        name: true,
        value: true,
        filter: e.op(size.store.id, "=", e.uuid(params.storeId)),
      }))
      .run(client);

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: SizesRouteParams }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const size = await e
      .insert(e.Size, {
        name,
        value,
        store,
      })
      .run(client);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
