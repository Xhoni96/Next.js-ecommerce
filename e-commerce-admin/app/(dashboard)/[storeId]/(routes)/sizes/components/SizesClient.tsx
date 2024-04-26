"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/ui";
import type { Size } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { sizesColumns } from "./sizesColumns";
import { ApiList } from "@/components/ApiList";

type Props = { data: Array<Size> };

export const SizesClient = (props: Props) => {
    const router = useRouter();

    const onNewSize = () => {
        router.push("sizes/new");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${props.data.length})`} description="Manage sizes for your store" />
                <Button onClick={onNewSize}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={sizesColumns} data={props.data} placeholder="No Sizes found" />
            <Heading title="API" description="API calls for Sizes" />
            <Separator />
            <ApiList entityIdName="sizeId" entityName="sizes" />
        </>
    );
};
