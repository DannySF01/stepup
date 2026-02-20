import { createServer } from "../supabase/server";

export default async function isFavorite(productId: string) {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Utilizador não autenticado");

  const { data } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("product_id", productId)
    .eq("user_id", user.id)
    .single();

  return !!data;
}
