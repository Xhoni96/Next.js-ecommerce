"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Color, ColorsRouteParams } from "@/lib/types";
import { AlertModal } from "@/components/modals/AlertModal";

interface CellActionProps {
    data: Color;
}

export const ColorsCellAction = ({ data }: CellActionProps) => {
    const router = useRouter();
    const params = useParams<ColorsRouteParams>();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = () => {
        setLoading(true);
        const promise = axios.delete(`/api/${params.storeId}/colors/${data.id}`);
        toast.promise(promise, {
            loading: "Deleting color...",
            success: () => {
                setLoading(false);
                setOpen(false);
                router.refresh();
                return "Color deleted.";
            },
            error: () => {
                setLoading(false);
                setOpen(false);

                return "Something went wrong";
            },
        });
    };

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Color ID copied to clipboard.");
    };

    const onUpdate = () => {
        router.push(`colors/${data.id}`);
    };

    const onDelete = () => {
        setOpen(true);
    };

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onUpdate}>
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
