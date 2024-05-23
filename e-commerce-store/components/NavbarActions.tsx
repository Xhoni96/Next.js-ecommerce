"use client";

import { cartProductsLengthAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";
import { ShoppingBag } from "lucide-react";

import Link from "next/link";

export const NavbarActions = () => {
  const cartProductsLength = useAtomValue(cartProductsLengthAtom);

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link className="flex items-center rounded-full bg-black px-4 py-2" href="/cart">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{cartProductsLength}</span>
      </Link>
    </div>
  );
};
