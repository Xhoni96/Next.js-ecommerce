import {
  billboardFormSchema,
  categoryFormSchema,
  colorFormSchema,
  productFormSchema,
  settingsFormSchema,
  sizeFormSchema,
} from "./validationSchemas";
import { z } from "zod";

export type Store = z.infer<typeof settingsFormSchema>;
type StoreWithId = z.infer<typeof settingsFormSchema> & { id: string };

export type StoreSwitcherProps = {
  items: Array<StoreWithId>;
};

export type BillboardFormType = z.infer<typeof billboardFormSchema>;
export type Billboard = z.infer<typeof billboardFormSchema> & {
  id: string;
  createdAt: string;
};

export type Category = {
  id: string;
  billboard: {
    label: string;
  };
  createdAt: string;
};
export type CategoryFormType = z.infer<typeof categoryFormSchema>;

export type Size = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
export type SizeFormType = z.infer<typeof sizeFormSchema>;

export type Color = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};
export type ColorFormType = z.infer<typeof colorFormSchema>;

export type Product = {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: Array<string>;

  // createdAt: string;
  // updatedAt: Date;

  category: { id: string };
  size: { id: string };
  color: { id: string };
};
export type ProductFormType = z.infer<typeof productFormSchema>;

export type Order = {
  productNames: string;
  phone: string;
  isPaid: boolean;
  totalPrice: string;
};

// Next Route Params
export type BillboardRouteParams = {
  storeId: string;
  billboardId: string;
};
export type CategoriesRouteParams = {
  storeId: string;
  categoryId: string;
};

export type SizesRouteParams = {
  storeId: string;
  sizeId: string;
};

export type ColorsRouteParams = {
  storeId: string;
  colorId: string;
};

export type ProductsRouteParams = {
  storeId: string;
  productId: string;
};
