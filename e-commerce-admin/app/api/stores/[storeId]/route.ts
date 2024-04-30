import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const updatedStore = await e
      .update(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
        set: {
          name,
        },
      }))
      .run(client);

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const deletedStore = await e
      .delete(e.Store, () => ({
        filter_single: { id: params.storeId, userId },
      }))
      .run(client);

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log("[STORES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
