import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { client, e } from "@/lib/edgedb";
import type { CategoriesRouteParams } from "@/lib/types";

export async function GET(_: Request, { params }: { params: CategoriesRouteParams }) {
    try {
        if (!params.categoryId) {
            return new NextResponse("Catgory id is required", { status: 400 });
        }

        const category = await e
            .select(e.Category, () => ({
                name: true,
                // billboard: true,
                filter_single: { id: params.categoryId },
            }))
            .run(client);

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: CategoriesRouteParams }) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard Id is required", { status: 400 });
        }

        const store = await e
            .select(e.Store, () => ({
                filter_single: { id: params.storeId, userId },
            }))
            .run(client);

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const billboard = e.select(e.Billboard, (billboard) => ({
            filter_single: e.op(
                e.op(billboard.id, "=", e.uuid(billboardId)),
                "and",
                e.op(billboard.store.id, "=", e.uuid(store.id))
            ),
        }));

        const updatedCategory = await e
            .update(e.Category, (category) => ({
                filter_single: e.op(
                    e.op(category.id, "=", e.uuid(params.categoryId)),
                    "and",
                    e.op(category.store.id, "=", e.uuid(store.id))
                ),
                set: {
                    name,
                    billboard,
                },
            }))
            .run(client);

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.log("[CATEGORY_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: CategoriesRouteParams }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const store = await e
            .select(e.Store, () => ({
                filter_single: { id: params.storeId, userId },
            }))
            .run(client);

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const deletedCategory = await e
            .delete(e.Category, (category) => ({
                filter_single: e.op(
                    e.op(category.id, "=", e.uuid(params.categoryId)),
                    "and",
                    e.op(category.store.id, "=", e.uuid(store.id))
                ),
            }))
            .run(client);

        if (!deletedCategory) {
            return new NextResponse("Category not found", { status: 404 });
        }

        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log("[CATEGORY_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
