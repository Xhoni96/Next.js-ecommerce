import type { Product } from "@/lib/types";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const previewModalAtom = atom<Product | null>(null);

export const cartProductsAtom = atomWithStorage<Array<Product>>("cart", []);
