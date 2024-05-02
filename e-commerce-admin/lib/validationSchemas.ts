import { z } from "zod";

export const settingsFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
});

export const billboardFormSchema = z.object({
  label: z.string().min(2, { message: "Label must be 2 or more characters long" }),
  imageUrl: z.string().url().min(1),
  isDefault: z.boolean().default(false).optional(),
});

export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  billboardId: z.string().min(1, { message: "Billboard is required" }),
});

export const sizeFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  value: z.string().min(1, { message: "Value must be 1 or more characters long" }),
});

export const colorFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  value: z
    .string()
    .min(4, { message: "Value must be 4 or more characters long" })
    .max(9, { message: "Value must be max 9 characters long" })
    .regex(/^#/, {
      message: "Value must be a valid hex code",
    }),
});

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 or more characters long" }),
  price: z.coerce.string({ invalid_type_error: "Required" }).min(1),
  // images: z.object({ url: z.string().url() }).array(),
  images: z.string().array().min(1, { message: "At least one image is required" }),
  categoryId: z.string().uuid(),
  colorId: z.string().uuid(),
  sizeId: z.string().uuid(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
