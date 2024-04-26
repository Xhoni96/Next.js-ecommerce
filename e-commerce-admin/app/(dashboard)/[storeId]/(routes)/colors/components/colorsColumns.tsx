"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Color } from "@/lib/types";
import { ColorsCellAction } from "./ColorsCellAction";

export const colorsColumns: ColumnDef<Color>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <span className="w-[4.5rem]">{row.original.value}</span>
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value }} />
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },

    {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => <ColorsCellAction data={row.original} />,
    },
];
