"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/ui";
import { DataTable } from "@/components/ui/data-table";
import { type ProductColumn, productColumns } from "./productColumns";
import { ApiList } from "@/components/ApiList";

type Props = { data: Array<ProductColumn> };

export const ProductClient = (props: Props) => {
    const router = useRouter();

    const onNewProduct = () => {
        router.push("products/new");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${props.data.length})`} description="Manage products for your store" />
                <Button onClick={onNewProduct}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={productColumns} data={props.data} placeholder="No Products found" />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList entityIdName="productId" entityName="products" />
        </>
    );
};
