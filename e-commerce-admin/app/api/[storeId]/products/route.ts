import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";
import type { ProductsRouteParams } from "@/lib/types";
import { productFormSchema } from "@/lib/validationSchemas";

export async function GET(_: Request, { params }: { params: ProductsRouteParams }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await e
      .select(e.Product, (product) => ({
        ...e.Product["*"],
        color: { ...e.Color["*"] },
        size: { ...e.Size["*"] },

        filter: e.op(product.store.id, "=", e.uuid(params.storeId)),
      }))
      .run(client);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: ProductsRouteParams }) {
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

    const store = e.select(e.Store, () => ({
      filter_single: { id: params.storeId, userId },
    }));

    const storeRes = await store.run(client);

    if (!storeRes) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const { name, price, images, categoryId, colorId, sizeId, isFeatured, isArchived } = safeParse.data;

    const product = await e
      .insert(e.Product, {
        name,
        price,
        isFeatured,
        isArchived,
        images,
        store,

        category: e.select(e.Category, () => ({
          filter_single: { id: categoryId },
        })),

        size: e.select(e.Size, () => ({
          filter_single: { id: sizeId },
        })),

        color: e.select(e.Color, () => ({
          filter_single: { id: colorId },
        })),
      })
      .run(client);

    // const images = await e
    //     .insert(e.Image, {
    //         url: images[0].url,
    //         product,
    //     })
    //     .run(client);

    if (!product.id) {
      return new NextResponse("Internal error", { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
