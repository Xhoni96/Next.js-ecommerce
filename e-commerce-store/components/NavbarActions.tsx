"use client";

import { useCart } from "@/lib/hooks/useCart";
import { useOrigin } from "@/lib/hooks/useOrigin";
import { ShoppingBag } from "lucide-react";

import Link from "next/link";
import { Loader } from "./ui/Loader";

export const NavbarActions = () => {
  const origin = useOrigin();
  const cart = useCart();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link className="flex items-center rounded-full bg-black px-4 py-2" href="/cart">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{origin ? cart.total : <Loader />}</span>
      </Link>
    </div>
  );
};
