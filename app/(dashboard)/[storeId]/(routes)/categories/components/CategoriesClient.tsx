"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/ui";
import type { Category } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { categoriesColumns } from "./categoriesColumns";
import { ApiList } from "@/components/ApiList";

type Props = { data: Array<Category> };

export const CategoriesClient = (props: Props) => {
    const router = useRouter();

    const onNewCategory = () => {
        router.push("categories/new");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${props.data.length})`} description="Manage categories for your store" />
                <Button onClick={onNewCategory}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="name"
                columns={categoriesColumns}
                data={props.data}
                placeholder="No Categories found"
            />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList entityIdName="categoryId" entityName="categories" />
        </>
    );
};
