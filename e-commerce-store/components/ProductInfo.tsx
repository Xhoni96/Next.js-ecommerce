"use client";

import { useSetAtom } from "jotai";
import { ShoppingCart } from "lucide-react";

import type { Product } from "@/lib/types";
import { Currency } from "@/components/ui/Currency";
import { Button } from "@/components/ui/Button";
import { cartProductsAtom, previewModalAtom } from "@/atoms/atoms";
import toast from "react-hot-toast";

interface InfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: InfoProps) => {
  const setCartProducts = useSetAtom(cartProductsAtom);
  const setPreviewModal = useSetAtom(previewModalAtom);

  const onAddToCart = () => {
    setCartProducts((prev) => [...prev, product]);
    toast.success("Product added to cart");
    setPreviewModal(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={product.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{product.size.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product.color.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex gap-2 items-center w-40 mt-4 rounded-full px-5 py-5 font-semibold"
        >
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};
