import { client, e } from "@/lib/edgedb";

import { OrdersClient } from "./components/OrdersClient";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
    const orders = await e
        .select(e.Order, (order) => ({
            phone: true,
            address: order.address,
            isPaid: true,
            productNames: true,
            totalPrice: true,

            filter: e.op(order.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: order.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    const formattedOrders = orders.map((order) => ({
        ...order,
        totalPrice: formatter.format(Number(order.totalPrice)),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrdersClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
