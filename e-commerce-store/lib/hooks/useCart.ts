"use client";

import { cartProductsAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import type { Product } from "../types";
import toast from "react-hot-toast";

export const useCart = () => {
  const [cartProducts, setCartProducts] = useAtom(cartProductsAtom);
  const total = cartProducts.length;

  const addProduct = (newProduct: Product) => {
    if (cartProducts.findIndex((prod) => prod.id === newProduct.id) !== -1) {
      return toast.error(`Product *${newProduct.name}* is already in cart`);
    }
    setCartProducts((prev) => [...prev, newProduct]);
    toast.success(`Product *${newProduct.name}* added to cart`);
  };

  const removeProduct = (productId: Product["id"]) => {
    setCartProducts((prev) => prev.filter((prod) => prod.id !== productId));
    toast.success("Product removed from cart.");
  };

  const removeAll = () => {
    setCartProducts([]);
  };

  return {
    addProduct,
    removeProduct,
    removeAll,
    total,
    products: cartProducts,
  };
};
