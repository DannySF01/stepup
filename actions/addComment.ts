"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ActionState = {
  success: boolean;
  message: string;
};

export async function addComment(
  productId: string,
  rating: number,
  _: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createServer();

  const review = formData.get("review")?.toString();
  if (!review || !rating) {
    return { success: false, message: "Preencha todos os campos" };
  }

  const { error } = await supabase.from("comments").insert({
    comment: review,
    rating: rating,
    product_id: productId,
  });

  if (error?.code === "23505") {
    return {
      success: false,
      message: "Já tem uma avaliação para este produto",
    };
  }

  if (error) {
    console.error(error.message);
    return {
      success: false,
      message: "Erro ao enviar avaliação",
    };
  }

  revalidatePath(`/products/${productId}`);

  return { success: true, message: "Avaliação enviada com sucesso" };
}
