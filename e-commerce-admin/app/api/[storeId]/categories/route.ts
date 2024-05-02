import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { CategoriesRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: CategoriesRouteParams }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const categories = await e
      .select(e.Category, (category) => ({
        id: true,
        name: true,
        createdAt: true,
        filter: e.op(category.store.id, "=", e.uuid(params.storeId)),
      }))
      .run(client);

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: CategoriesRouteParams }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const billboard = e.select(e.Billboard, (billboard) => ({
      filter_single: e.op(
        e.op(billboard.id, "=", e.uuid(billboardId)),
        "and",
        e.op(billboard.store.id, "=", e.uuid(storeRes.id))
      ),
    }));

    const category = await e
      .insert(e.Category, {
        name,
        billboard,
        store,
      })

      .run(client);

    if (!category) {
      return new NextResponse("Billboard Id is not correct", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
