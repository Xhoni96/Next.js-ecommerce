import type { Product } from "@/lib/types";
import { atom } from "jotai";

export const previewModalAtom = atom<Product | null>(null);

export const cartProductsAtom = atom<Array<Product>>([]);

export const cartProductsLengthAtom = atom((get) => get(cartProductsAtom).length);
