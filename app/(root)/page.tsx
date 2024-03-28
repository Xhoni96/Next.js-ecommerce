"use client";
import { useEffect } from "react";
import { useAtom } from "jotai";

import { storeModalAtom } from "@/atoms/storeModalAtom";

export default function SetupPage() {
    const [isOpen, setIsOpen] = useAtom(storeModalAtom);

    useEffect(() => {
        if (!isOpen) {
            setIsOpen(true);
        }
    }, [isOpen, setIsOpen]);

    return null;
}
