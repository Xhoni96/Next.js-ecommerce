"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ProductCellAction } from "./ProductCellAction";

export type ProductColumn = {
    id: string;
    name: string;
    price: string;
    category: string;
    size: string;
    color: { name: string; value: string };
    createdAt: string;
    isFeatured: boolean;
    isArchived: boolean;
};

export const productColumns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <span className="w-[4.5rem]">{row.original.name}</span>
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color.value }} />
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
        cell: ({ row }) => <ProductCellAction data={row.original} />,
    },
];
