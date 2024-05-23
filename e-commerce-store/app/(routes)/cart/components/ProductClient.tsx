"use client";

import { cartProductsAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";

export const ProductClient = () => {
  const product = useAtomValue(cartProductsAtom);

  console.log(product, "product");

  return <div></div>;
};
