import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { client, e } from "@/lib/edgedb";
import type { ColorsRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: ColorsRouteParams }) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const colors = await e
            .select(e.Color, (color) => ({
                name: true,
                value: true,
                filter: e.op(color.store.id, "=", e.uuid(params.storeId)),
            }))
            .run(client);

        return NextResponse.json(colors);
    } catch (error) {
        console.log("[COLORS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: ColorsRouteParams }) {
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

        const color = await e
            .insert(e.Color, {
                name,
                value,
                store,
            })
            .run(client);

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLORS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
