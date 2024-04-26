"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Billboard } from "@/lib/types";
import { BillboardCellAction } from "./BillboardCellAction";

export const billboardColumns: ColumnDef<Billboard>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    },

    {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => <BillboardCellAction data={row.original} />,
    },
];
