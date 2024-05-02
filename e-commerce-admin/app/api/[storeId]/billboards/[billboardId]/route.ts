import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { BillboardRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: BillboardRouteParams }) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await e
      .select(e.Billboard, () => ({
        label: true,
        imageUrl: true,
        filter_single: { id: params.billboardId },
      }))
      .run(client);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: BillboardRouteParams }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl, isDefault } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const store = await e
      .select(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const updatedBillboard = await e
      .update(e.Billboard, (billboard) => ({
        filter_single: e.op(
          e.op(billboard.id, "=", e.uuid(params.billboardId)),
          "and",
          e.op(billboard.store.id, "=", e.uuid(store.id))
        ),
        set: {
          label,
          imageUrl,
          isDefault,
        },
      }))
      .run(client);

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: BillboardRouteParams }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const store = await e
      .select(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const deletedBillboard = await e
      .delete(e.Billboard, (billboard) => ({
        filter_single: e.op(
          e.op(billboard.id, "=", e.uuid(params.billboardId)),
          "and",
          e.op(billboard.store.id, "=", e.uuid(store.id))
        ),
      }))
      .run(client);

    if (!deletedBillboard) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    // delete asset from cloudinary storage

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
