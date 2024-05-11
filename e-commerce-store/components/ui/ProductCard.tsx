"use client";

import Image from "next/image";

import type { Product } from "@/lib/types";
import { IconButton } from "./IconButton";
import { Expand, ShoppingCart } from "lucide-react";
import { Currency } from "./Currency";

type ProductCardProps = {
  data: Product;
};

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image alt="Image" src={data.images[0]} fill className="aspect-square object-cover rounded-md" />

        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-6 bottom-5">
          <div className="flex gap-x-4 justify-center">
            <IconButton onClick={() => {}}>
              <Expand size={20} className="text-gray-600" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <ShoppingCart size={20} className="text-gray-600" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};
