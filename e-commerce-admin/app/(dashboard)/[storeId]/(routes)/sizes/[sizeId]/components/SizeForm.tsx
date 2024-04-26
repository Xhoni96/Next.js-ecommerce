"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
    Input,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Separator,
    Heading,
} from "@/components/ui";
import { sizeFormSchema } from "@/lib/validationSchemas";
import type { SizeFormType, SizesRouteParams } from "@/lib/types";
import { AlertModal } from "@/components/modals/AlertModal";

interface SizeFormProps {
    initialData: SizeFormType | null;
}

export const SizeForm = ({ initialData }: SizeFormProps) => {
    const params = useParams<SizesRouteParams>();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SizeFormType>({
        resolver: zodResolver(sizeFormSchema),
        defaultValues: initialData ?? { name: "", value: "" },
    });

    const onSubmit = (data: SizeFormType) => {
        setLoading(true);

        let promise;
        if (initialData) {
            promise = axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
        } else {
            promise = axios.post(`/api/${params.storeId}/sizes`, data);
        }

        toast.promise(promise, {
            loading: toastLoadingMessage,
            success: () => {
                router.push(`/${params.storeId}/sizes`);
                router.refresh();
                setLoading(false);

                return toastMessage;
            },
            error: () => {
                setLoading(false);
                return "Something went wrong";
            },
        });
    };

    const onDelete = () => {
        setLoading(true);
        const promise = axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
        toast.promise(promise, {
            loading: "Deleting size...",
            success: () => {
                router.push(`/${params.storeId}/sizes`);
                router.refresh();
                return "Size deleted.";
            },
            error: () => {
                setLoading(false);
                closeAlertModal();

                return "Something went wrong";
            },
        });
    };

    const closeAlertModal = () => {
        setOpen(false);
    };

    const openAlertModal = () => {
        setOpen(true);
    };

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size." : "Add a new size";
    const toastMessage = initialData ? "Size updated." : "Size created.";
    const toastLoadingMessage = initialData ? "Updating size name..." : "Creating size...";
    const action = initialData ? "Save changes" : "Create";

    return (
        <>
            <AlertModal isOpen={open} onClose={closeAlertModal} onConfirm={onDelete} loading={loading} />

            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData ? (
                    <Button disabled={loading} variant="destructive" size="sm" onClick={openAlertModal}>
                        <Trash className="h-4 w-4" />
                    </Button>
                ) : null}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
