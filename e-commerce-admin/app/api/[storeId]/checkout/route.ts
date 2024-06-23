import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { client, e } from "@/lib/edgedb";

import type { CheckoutRouteParams } from "@/lib/types";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers });
}

export async function POST(req: Request, { params }: { params: CheckoutRouteParams }) {
  try {
    const body = await req.json();

    const productIds: Array<string> = body.productIds;

    if (!productIds || productIds.length === 0) {
      return new NextResponse("productIds is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const productsQuery = e.select(e.Product, (product) => ({
      ...e.Product["*"],

      filter: e.all(
        e.set(
          e.op(product.store.id, "=", e.uuid(params.storeId)),
          e.op(product.id, "in", e.array_unpack(e.literal(e.array(e.uuid), productIds))),
          e.op(product.isArchived, "=", e.bool(false))
        )
      ),
    }));

    // const productsQuery = e.params({ ids: e.array(e.uuid) }, ({ ids }) =>
    //   e.select(e.Product, (product) => ({
    //     ...e.Product["*"],
    //     // color: { ...e.Color["*"] },
    //     // size: { ...e.Size["*"] },
    //     // category: { ...e.Category["*"] },

    //     filter: e.all(
    //       e.set(
    //         e.op(product.store.id, "=", e.uuid(params.storeId)),
    //         e.op(product.id, "in", e.array_unpack(ids)),
    //         e.op(product.isArchived, "=", e.bool(false))
    //       )
    //     ),
    //   }))
    // );

    const products = await productsQuery.run(client);

    const newOrder = await e
      .insert(e.Order, {
        products: productsQuery,
        store: e.select(e.Store, () => ({
          filter_single: { id: params.storeId },
        })),
      })
      .run(client);

    const line_items = products.map((product) => {
      return {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price) * 100,
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: newOrder.id,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers,
      }
    );
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
