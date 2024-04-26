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
import { categoryFormSchema } from "@/lib/validationSchemas";
import type { Billboard, CategoriesRouteParams, CategoryFormType } from "@/lib/types";
import { AlertModal } from "@/components/modals/AlertModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
    initialData: { name: string; billboard: { id: string } } | null;
    billboards: Omit<Billboard, "imageUrl" | "createdAt">[] | null;
}

export const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
    const params = useParams<CategoriesRouteParams>();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<CategoryFormType>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData
            ? { billboardId: initialData.billboard.id, name: initialData.name }
            : { name: "", billboardId: "" },
    });

    const onSubmit = (data: CategoryFormType) => {
        setLoading(true);

        let promise;
        if (initialData) {
            promise = axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
        } else {
            promise = axios.post(`/api/${params.storeId}/categories`, data);
        }

        toast.promise(promise, {
            loading: toastLoadingMessage,
            success: () => {
                router.push(`/${params.storeId}/categories`);
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
        const promise = axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
        toast.promise(promise, {
            loading: "Deleting category...",
            success: () => {
                router.push(`/${params.storeId}/categories`);
                router.refresh();
                return "Category deleted.";
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

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const toastLoadingMessage = initialData ? "Updating category..." : "Creating category...";
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
                                        <Input disabled={loading} placeholder="Category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard Id</FormLabel>
                                    <FormControl>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a billboard" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {billboards?.map((billboard) => (
                                                    <SelectItem key={billboard.id} value={billboard.id}>
                                                        {billboard.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <div className="grid grid-cols-3 gap-8">
                      
                    </div> */}
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
