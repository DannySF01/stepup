import { createClient } from "../supabase/client";

export const supabase = await createClient();

export default async function addToFavorites(productId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Utilizador não autenticado");

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

    if (error) console.error(error);
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert({ product_id: productId, user_id: user.id })
      .single();

    if (error) console.error(error);
  }
}
