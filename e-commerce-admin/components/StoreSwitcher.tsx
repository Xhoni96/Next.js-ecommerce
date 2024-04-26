"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";

import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import { storeModalAtom } from "@/atoms/storeModalAtom";
import type { StoreSwitcherProps } from "@/lib/types";

export default function StoreSwitcher({ items = [] }: StoreSwitcherProps) {
    const setStoreModalOpen = useSetAtom(storeModalAtom);

    const params = useParams();
    const router = useRouter();

    const currentStore = items.find((item) => item.id === params.storeId);

    const [open, setOpen] = useState(false);

    const onStoreSelect = (storeId: string) => {
        let pathname: string | string[] = window.location.pathname.split("/");
        pathname.splice(0, 2, storeId);
        pathname = pathname.join("/");

        setOpen(false);
        router.push(`/${pathname}`);
    };

    const onStoreCreate = () => {
        setStoreModalOpen(true);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={"w-[200px] justify-between"}
                >
                    <Store className="mr-2 h-4 w-4" />
                    {currentStore?.name}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {items.map((store) => (
                                <CommandItem
                                    key={store.id}
                                    onSelect={() => onStoreSelect(store.id)}
                                    className="text-sm"
                                    value={store.name}
                                >
                                    <Store className="mr-2 h-4 w-4" />
                                    {store.name}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.id === store.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={onStoreCreate}>
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
