"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Order } from "@/lib/types";

export const ordersColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "productNames",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
];
