"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type ActionState = {
  success: boolean;
  message: string;
};

export async function editReview(
  productId: string,
  commentId: string,
  rating: number,
  _: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createServer();

  const review = formData.get("review")?.toString();
  if (!review || !rating) {
    return { success: false, message: "Preencha todos os campos" };
  }

  const { error } = await supabase
    .from("comments")
    .update({
      comment: review,
      rating: rating,
    })
    .eq("id", commentId);

  if (error) {
    console.error(error.message);
    return {
      success: false,
      message: "Erro ao editar avaliação",
    };
  }

  redirect(`/products/${productId}`);
}
