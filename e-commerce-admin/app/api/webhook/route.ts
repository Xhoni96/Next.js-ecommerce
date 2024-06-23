import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { client, e } from "@/lib/edgedb";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return new NextResponse(`Signature not found`, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerDetails = session.customer_details;

    const address = customerDetails?.address
      ? Object.values(customerDetails.address)
          .filter((c) => c !== null)
          .join(",")
      : null;

    const orderId = session.metadata?.orderId;
    const storeId = session.metadata?.storeId;

    if (!orderId || !storeId) {
      return new NextResponse(`metadata info missing`, { status: 400 });
    }

    await e
      .update(e.Order, (order) => ({
        filter_single: e.op(e.op(order.store.id, "=", e.uuid(storeId)), "and", e.op(order.id, "=", e.uuid(orderId))),

        set: {
          isPaid: true,
          customerName: customerDetails?.name,
          customerEmail: customerDetails?.email,
          phone: customerDetails?.phone,
          address,
        },
      }))
      .run(client);
  }

  return NextResponse.json(null, { status: 200 });
}
