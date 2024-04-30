import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { ColorsRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: ColorsRouteParams }) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await e
      .select(e.Color, () => ({
        name: true,
        value: true,
        filter_single: { id: params.colorId },
      }))
      .run(client);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: ColorsRouteParams }) {
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

    const updatedColor = await e
      .update(e.Color, (color) => ({
        filter_single: e.op(
          e.op(color.id, "=", e.uuid(params.colorId)),
          "and",
          e.op(color.store.id, "=", e.uuid(store.id))
        ),
        set: {
          name,
          value,
        },
      }))
      .run(client);

    return NextResponse.json(updatedColor);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: ColorsRouteParams }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const store = await e
      .select(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    if (!store) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const deletedColor = await e
      .delete(e.Color, (color) => ({
        filter_single: e.op(
          e.op(color.id, "=", e.uuid(params.colorId)),
          "and",
          e.op(color.store.id, "=", e.uuid(store.id))
        ),
      }))
      .run(client);

    if (!deletedColor) {
      return new NextResponse("Color not found", { status: 404 });
    }

    return NextResponse.json(deletedColor);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
