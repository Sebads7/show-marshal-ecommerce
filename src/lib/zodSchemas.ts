import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["published", "draft", "archived"]),
  price: z.number().min(1, "Must be at least $1"),
  images: z.array(z.string()).min(1, "Must have at least one image"),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
});
