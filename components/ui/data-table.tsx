"use client";

import { type ChangeEvent, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    type ColumnFiltersState,
    getPaginationRowModel,
    type PaginationState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    placeholder?: string;
    searchKey: string;
}

export function DataTable<TData, TValue>({ columns, data, placeholder, searchKey }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
            columnFilters,
        },
    });

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        table.getColumn(searchKey)?.setFilterValue(event.target.value);
    };

    const searchInputValue = (table.getColumn(searchKey)?.getFilterValue() as string) ?? "";

    const onNextPage = () => table.nextPage();
    const onPrevPage = () => table.previousPage();

    const prevDisabled = !table.getCanPreviousPage();
    const nextDisabled = !table.getCanNextPage();

    const pageCount = table.getPageCount();

    return (
        <div>
            <div className="flex items-center py-4 justify-between pr-16">
                <Input placeholder="Search" value={searchInputValue} onChange={onSearchChange} className="max-w-sm" />
                <div className="flex items-center gap-1 text-sm">
                    Page
                    <span className="font-semibold">
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {pageCount === 0 ? pageCount + 1 : pageCount.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {placeholder || "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end py-4 gap-8">
                <div className="flex items-center">
                    <p>Rows per page:</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex justify-between items-center gap-1 ml-3">
                                {pagination.pageSize}
                                <span className="sr-only">Open menu</span>
                                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {[5, 10, 15, 20, 50].map((pageSize) => (
                                <DropdownMenuItem key={pageSize} onClick={() => table.setPageSize(pageSize)}>
                                    {pageSize}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-x-2 flex items-center">
                    <Button variant="outline" size="sm" onClick={onPrevPage} disabled={prevDisabled}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={onNextPage} disabled={nextDisabled}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
