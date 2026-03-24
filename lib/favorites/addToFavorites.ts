import { createClient } from "../supabase/client";

export const supabase = await createClient();

export default async function addToFavorites(
  productId: string,
): Promise<{ state: string; message: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { state: "error", message: "É necessário iniciar sessão" };

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id)
      .single();

    if (error) return { state: "error", message: error.message };
    return { state: "success", message: "Produto removido dos favoritos" };
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert({ product_id: productId, user_id: user.id })
      .single();

    if (error) return { state: "error", message: error.message };
    return { state: "success", message: "Produto adicionado aos favoritos" };
  }
}
