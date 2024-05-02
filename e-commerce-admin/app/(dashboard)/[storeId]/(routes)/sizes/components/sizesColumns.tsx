"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Size } from "@/lib/types";
import { SizesCellAction } from "./SizesCellAction";

export const sizesColumns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
  },

  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <SizesCellAction data={row.original} />,
  },
];
