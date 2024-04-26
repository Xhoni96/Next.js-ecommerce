"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, Heading, Separator } from "@/components/ui";
import type { Color } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { colorsColumns } from "./colorsColumns";
import { ApiList } from "@/components/ApiList";

type Props = { data: Array<Color> };

export const ColorsClient = (props: Props) => {
    const router = useRouter();

    const onNewcolor = () => {
        router.push("colors/new");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Colors (${props.data.length})`} description="Manage colors for your store" />
                <Button onClick={onNewcolor}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={colorsColumns} data={props.data} placeholder="No Colors found" />
            <Heading title="API" description="API calls for Colors" />
            <Separator />
            <ApiList entityIdName="colorId" entityName="colors" />
        </>
    );
};
