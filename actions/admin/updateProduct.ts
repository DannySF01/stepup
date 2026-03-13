"use server";

import { createServer } from "@/lib/supabase/server";

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
    price: Number(formData.get("price")),
    image_url: formData.get("image_url")?.toString(),
  };

  console.log(updatedProduct);

  const { error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return { success: false, message: "Ocorreu um erro" };
  }

  return { success: true, message: "Produto atualizado com sucesso" };
}
