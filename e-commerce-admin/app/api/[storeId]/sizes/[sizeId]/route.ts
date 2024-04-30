import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { SizesRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: SizesRouteParams }) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const size = await e
      .select(e.Size, () => ({
        name: true,
        value: true,
        filter_single: { id: params.sizeId },
      }))
      .run(client);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: SizesRouteParams }) {
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

    const store = await e
      .select(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const updatedSize = await e
      .update(e.Size, (size) => ({
        filter_single: e.op(
          e.op(size.id, "=", e.uuid(params.sizeId)),
          "and",
          e.op(size.store.id, "=", e.uuid(store.id))
        ),
        set: {
          name,
          value,
        },
      }))
      .run(client);

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: SizesRouteParams }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const store = await e
      .select(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const deletedSize = await e
      .delete(e.Size, (size) => ({
        filter_single: e.op(
          e.op(size.id, "=", e.uuid(params.sizeId)),
          "and",
          e.op(size.store.id, "=", e.uuid(store.id))
        ),
      }))
      .run(client);

    if (!deletedSize) {
      return new NextResponse("Size not found", { status: 404 });
    }

    return NextResponse.json(deletedSize);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
