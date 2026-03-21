"use server";

import { createServer } from "@/lib/supabase/server";
import { ProductSize, ProductSizeWithSize } from "@/lib/types/products.types";
import { formatToCents } from "@/lib/utils/formatPrice";
import { revalidatePath } from "next/cache";

export default async function updateProduct(
  id: string,
  prevState: any,
  formData: FormData | null,
) {
  const supabase = await createServer();

  if (!formData) return { success: false, message: "Dados inválidos" };

  if (!id) return { success: false, message: "Dados inválidos" };

  const updatedProduct = {
    name: formData.get("name")?.toString(),
    description: formData.get("description")?.toString(),
    price: formatToCents(Number(formData.get("price"))),
    sale_price: formatToCents(Number(formData.get("sale_price"))),
    on_sale: Boolean(formData.get("on_sale")),
    image_url: formData.get("image_url")?.toString(),
    category_id: formData.get("category")?.toString() || undefined,
    brand_id: formData.get("brand")?.toString() || undefined,
  };

  const sizesToUpsert: ProductSize[] = [];

  formData.forEach((value, key) => {
    if (key.startsWith("size_")) {
      const parts = key.split("_");
      const productSizeId = parts[1];
      const sizeId = parts[2];
      const stock = Number(value);

      sizesToUpsert.push({
        id: productSizeId,
        product_id: id,
        stock: stock,
        created_at: new Date().toISOString(),
        size_id: sizeId,
      });
    }
  });

  const { error: upsertError } = await supabase
    .from("product_sizes")
    .upsert(sizesToUpsert, {
      onConflict: "product_id, size_id",
    });

  if (upsertError) {
    console.error(upsertError.message);
    return { success: false, message: "Erro ao atualizar stock dos tamanhos" };
  }

  const { error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return { success: false, message: "Ocorreu um erro" };
  }

  revalidatePath("/admin/products/[id]", "page");

  return { success: true, message: "Produto atualizado com sucesso" };
}
