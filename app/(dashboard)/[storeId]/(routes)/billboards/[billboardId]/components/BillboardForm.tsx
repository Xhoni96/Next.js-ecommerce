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
import { billboardFormSchema } from "@/lib/validationSchemas";
import type { BillboardFormType, BillboardRouteParams } from "@/lib/types";
import { ImageUpload } from "@/components/ui/image-upload";
import { AlertModal } from "@/components/modals/AlertModal";

interface BillboardFormProps {
    initialData: BillboardFormType | null;
}

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
    const params = useParams<BillboardRouteParams>();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<BillboardFormType>({
        resolver: zodResolver(billboardFormSchema),
        defaultValues: initialData ?? { label: "", imageUrl: "" },
    });

    const onSubmit = (data: BillboardFormType) => {
        setLoading(true);

        let promise;
        if (initialData) {
            promise = axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
        } else {
            promise = axios.post(`/api/${params.storeId}/billboards`, data);
        }

        toast.promise(promise, {
            loading: toastLoadingMessage,
            success: () => {
                router.push(`/${params.storeId}/billboards`);
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
        const promise = axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
        toast.promise(promise, {
            loading: "Deleting billboard...",
            success: () => {
                router.push(`/${params.storeId}/billboards`);
                router.refresh();
                return "Billboard deleted.";
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

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit a billboard." : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated." : "Billboard created.";
    const toastLoadingMessage = initialData ? "Updating billboard name..." : "Creating billboard...";
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        values={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onDelete={() => field.onChange("")}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
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
