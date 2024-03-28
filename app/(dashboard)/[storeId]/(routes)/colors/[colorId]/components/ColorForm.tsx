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
import { colorFormSchema } from "@/lib/validationSchemas";
import type { ColorFormType, ColorsRouteParams } from "@/lib/types";
import { AlertModal } from "@/components/modals/AlertModal";

interface ColorFormProps {
    initialData: ColorFormType | null;
}

export const ColorForm = ({ initialData }: ColorFormProps) => {
    const params = useParams<ColorsRouteParams>();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<ColorFormType>({
        resolver: zodResolver(colorFormSchema),
        defaultValues: initialData ?? { name: "", value: "#000000" },
    });

    const onSubmit = (data: ColorFormType) => {
        setLoading(true);

        let promise;
        if (initialData) {
            promise = axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
        } else {
            promise = axios.post(`/api/${params.storeId}/colors`, data);
        }

        toast.promise(promise, {
            loading: toastLoadingMessage,
            success: () => {
                router.push(`/${params.storeId}/colors`);
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
        const promise = axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
        toast.promise(promise, {
            loading: "Deleting color...",
            success: () => {
                router.push(`/${params.storeId}/colors`);
                router.refresh();
                return "Color deleted.";
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

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color." : "Add a new color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const toastLoadingMessage = initialData ? "Updating color name..." : "Creating color...";
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
                                        <Input disabled={loading} placeholder="Color name" {...field} />
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
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Color value" {...field} />
                                            <input
                                                className="h-10 bg-transparent"
                                                type="color"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            {/* <div
                                                className="border p-4 rounded-md"
                                                style={{ backgroundColor: field.value }}
                                            /> */}
                                        </div>
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
