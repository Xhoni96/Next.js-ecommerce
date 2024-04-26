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
import { productFormSchema } from "@/lib/validationSchemas";
import type { Product, ProductFormType, ProductsRouteParams } from "@/lib/types";
import { ImageUpload } from "@/components/ui/image-upload";
import { AlertModal } from "@/components/modals/AlertModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type BaseType = { name: string; id: string };

interface ProductFormProps {
    initialData: Product | null;
    categories: Array<BaseType>;
    sizes: Array<BaseType>;
    colors: Array<BaseType>;
    // images: Array<{ url: string }>;
}

export const ProductForm = ({ initialData, categories, sizes, colors }: ProductFormProps) => {
    const params = useParams<ProductsRouteParams>();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<ProductFormType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData
            ? {
                  //   id: initialData.id,
                  name: initialData.name,
                  price: initialData.price,
                  images: initialData.images,
                  categoryId: initialData.category.id,
                  colorId: initialData.color.id,
                  sizeId: initialData.size.id,
                  isFeatured: initialData.isFeatured,
                  isArchived: initialData.isArchived,
              }
            : {
                  name: "",
                  price: "",
                  images: [],
                  categoryId: "",
                  colorId: "",
                  sizeId: "",
                  isFeatured: false,
                  isArchived: false,
              },
    });

    const onSubmit = (data: ProductFormType) => {
        setLoading(true);

        let promise;
        if (initialData) {
            promise = axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
        } else {
            promise = axios.post(`/api/${params.storeId}/products`, data);
        }

        toast.promise(promise, {
            loading: toastLoadingMessage,
            success: () => {
                router.push(`/${params.storeId}/products`);
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
        const promise = axios.delete(`/api/${params.storeId}/products/${params.productId}`);
        toast.promise(promise, {
            loading: "Deleting product...",
            success: () => {
                router.push(`/${params.storeId}/products`);
                router.refresh();
                return "Product deleted.";
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

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product." : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const toastLoadingMessage = initialData ? "Updating product name..." : "Creating product...";
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        values={field.value}
                                        onChange={(urls) => field.onChange([...field.value, ...urls])}
                                        onDelete={(url) =>
                                            field.onChange(field.value.filter((prevUrl) => prevUrl !== url))
                                        }
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="Product price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sizes?.map((size) => (
                                                    <SelectItem key={size.id} value={size.id}>
                                                        {size.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colors?.map((color) => (
                                                    <SelectItem key={color.id} value={color.id}>
                                                        {color.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="items-top flex space-x-2 border p-4 rounded-sm">
                                            <Checkbox
                                                id="featured"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={loading}
                                            />
                                            <div className="flex flex-col gap-1.5 leading-none">
                                                <label
                                                    htmlFor="featured"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Featured
                                                </label>
                                                <p className="text-sm text-muted-foreground">
                                                    This product will appear in the home page.
                                                </p>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="items-top flex space-x-2 border p-4 rounded-sm">
                                            <Checkbox
                                                id="archived"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={loading}
                                            />
                                            <div className="flex flex-col gap-1.5 leading-none">
                                                <label
                                                    htmlFor="archived"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Archived
                                                </label>
                                                <p className="text-sm text-muted-foreground">
                                                    This product will not appear anywhere in the store.
                                                </p>
                                            </div>
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
