"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/ui";
import type { Billboard } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { billboardColumns } from "./billboardColumns";
import { ApiList } from "@/components/ApiList";

type Props = { data: Array<Billboard> };

export const BillboardClient = (props: Props) => {
    const router = useRouter();

    const onNewBillboard = () => {
        router.push("billboards/new");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${props.data.length})`} description="Manage billboards for your store" />
                <Button onClick={onNewBillboard}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="label"
                columns={billboardColumns}
                data={props.data}
                placeholder="No Billboards found"
            />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiList entityIdName="billboardId" entityName="billboards" />
        </>
    );
};
