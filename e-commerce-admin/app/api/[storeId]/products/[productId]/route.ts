import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { client, e } from "@/lib/edgedb";
import type { ProductsRouteParams } from "@/lib/types";
import { productFormSchema } from "@/lib/validationSchemas";

export async function GET(_: Request, { params }: { params: ProductsRouteParams }) {
    try {
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const product = await e
            .select(e.Product, () => ({
                ...e.Product["*"],
                category: {
                    id: true,
                },
                color: {
                    id: true,
                    value: true,
                },
                size: {
                    id: true,
                    value: true,
                },

                filter_single: { id: params.productId },
            }))
            .run(client);

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: ProductsRouteParams }) {
    try {
        const { userId } = auth();

        const body = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const safeParse = productFormSchema.safeParse(body);

        if (!safeParse.success) {
            return new NextResponse("Required fields missing", { status: 400 });
        }

        const store = await e
            .select(e.Store, () => ({
                filter_single: { id: params.storeId, userId },
            }))
            .run(client);

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const { name, price, images, categoryId, colorId, sizeId, isFeatured, isArchived } = safeParse.data;

        const updatedProduct = await e
            .update(e.Product, (product) => ({
                filter_single: e.op(
                    e.op(product.id, "=", e.uuid(params.productId)),
                    "and",
                    e.op(product.store.id, "=", e.uuid(store.id))
                ),

                set: {
                    name,
                    price,
                    isFeatured,
                    isArchived,
                    images,

                    category: e.select(e.Category, () => ({
                        filter_single: { id: categoryId },
                    })),

                    size: e.select(e.Size, () => ({
                        filter_single: { id: sizeId },
                    })),

                    color: e.select(e.Color, () => ({
                        filter_single: { id: colorId },
                    })),
                },
            }))
            .run(client);

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: ProductsRouteParams }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const store = await e
            .select(e.Store, () => ({
                filter_single: { id: params.storeId, userId },
            }))
            .run(client);

        if (!store) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const deletedProduct = await e
            .delete(e.Product, (product) => ({
                filter_single: e.op(
                    e.op(product.id, "=", e.uuid(params.productId)),
                    "and",
                    e.op(product.store.id, "=", e.uuid(store.id))
                ),
            }))
            .run(client);

        if (!deletedProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
