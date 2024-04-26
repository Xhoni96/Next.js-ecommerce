"use client";

import { Heading, Separator } from "@/components/ui";
import type { Order } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { ordersColumns } from "./ordersColumns";

type Props = { data: Array<Order> };

export const OrdersClient = (props: Props) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Orders (${props.data.length})`} description="Manage orders for your store" />
            </div>
            <Separator />
            <DataTable
                searchKey="productNames"
                columns={ordersColumns}
                data={props.data}
                placeholder="No Orders found"
            />
        </>
    );
};
