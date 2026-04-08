"use server";

import { createServer } from "@/lib/supabase/server";
import { formatToCents } from "@/lib/utils/formatPrice";
import { revalidatePath } from "next/cache";
import z from "zod";

const productsSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  sale_price: z.number().optional(),
  on_sale: z.boolean().default(false).optional(),
  image_url: z.string(),
  category_id: z.string().optional(),
  brand_id: z.string().optional(),
});

export default async function createProduct(
  prevState: any,
  formData: FormData | null,
) {
  const supabase = await createServer();

  if (!formData) return { success: false, message: "Dados inválidos" };

  const parsed = productsSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formatToCents(Number(formData.get("price"))),
    sale_price: formatToCents(Number(formData.get("sale_price"))),
    on_sale: formData.get("on_sale") || false,
    image_url: formData.get("image_url"),
    category_id: formData.get("category") || undefined,
    brand_id: formData.get("brand") || undefined,
  });
  console.log("parsed", parsed);

  if (!parsed.success) {
    console.log("parsed", parsed);
    return { success: false, message: "Dados inválidos" };
  }

  const updatedProduct = parsed.data;

  const { error } = await supabase.from("products").insert(updatedProduct);

  if (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/products/[id]", "page");

  return { success: true, message: "Produto criado com sucesso" };
}
