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
    ApiAlert,
    Loader,
} from "@/components/ui";
import { AlertModal } from "@/components/modals/AlertModal";
import { useOrigin } from "@/hooks/useOrigin";
import { settingsFormSchema } from "@/lib/validationSchemas";
import type { Store } from "@/lib/types";

interface SettingsFormProps {
    initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<Store>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: initialData,
    });

    const onSubmit = (data: Store) => {
        setLoading(true);
        const promise = axios.patch(`/api/stores/${params.storeId}`, data);
        toast.promise(promise, {
            loading: "Updating store name...",
            success: () => {
                router.refresh();
                setLoading(false);
                return "Store name updated";
            },
            error: () => {
                setLoading(false);
                return "Something went wrong";
            },
        });
    };

    const onDelete = () => {
        setLoading(true);
        const promise = axios.delete(`/api/stores/${params.storeId}`);
        toast.promise(promise, {
            loading: "Deleting store...",
            success: () => {
                router.refresh();
                setLoading(false);
                closeAlertModal();
                return "Store deleted.";
            },
            error: () => {
                setLoading(false);
                closeAlertModal();
                return "Make sure you removed all products and categories first";
            },
        });
    };

    const closeAlertModal = () => {
        setOpen(false);
    };

    const openAlertModal = () => {
        setOpen(true);
    };

    return (
        <>
            <AlertModal isOpen={open} onClose={closeAlertModal} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title="Store settings" description="Manage store preferences" />
                <Button disabled={loading} variant="destructive" size="sm" onClick={openAlertModal}>
                    <Trash className="h-4 w-4" />
                </Button>
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
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />

            {origin ? (
                <ApiAlert
                    title="NEXT_PUBLIC_API_URL"
                    variant="public"
                    description={`${origin}/api/${params.storeId}`}
                />
            ) : (
                <div className="flex justify-center items-center h-20">
                    <Loader size={25} />
                </div>
            )}
        </>
    );
};
