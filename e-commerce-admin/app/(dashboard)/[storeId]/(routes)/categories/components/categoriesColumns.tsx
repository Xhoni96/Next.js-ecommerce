"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Category } from "@/lib/types";
import { CategoryCellAction } from "./CategoryCellAction";

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboard.label,
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
    cell: ({ row }) => <CategoryCellAction data={row.original} />,
  },
];
