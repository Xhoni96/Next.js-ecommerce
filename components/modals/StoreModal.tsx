"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { storeModalAtom } from "@/atoms/storeModalAtom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    Loader,
    Modal,
} from "@/components/ui";
import { settingsFormSchema } from "@/lib/validationSchemas";
import type { Store } from "@/lib/types";

export const StoreModal = () => {
    const [isOpen, setIsOpen] = useAtom(storeModalAtom);
    const [loading, setLoading] = useState(false);

    const form = useForm<Store>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            name: "",
        },
    });

    const handleOnClose = () => {
        setIsOpen(false);
    };

    const onSubmit = async (values: Store) => {
        try {
            setLoading(true);
            const response = await axios.post<{ id: string }>("/api/stores", values);
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={handleOnClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                    <Button type="button" disabled={loading} variant="outline" onClick={handleOnClose}>
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} type="submit">
                                        {loading ? <Loader className="mr-2" /> : null} Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
