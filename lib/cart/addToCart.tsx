import { createClient } from "@/lib/supabase/client";

export async function addToCart(product_id: string, size_id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      state: "error",
      message: "É necessário iniciar sessão",
      item: null,
    };

  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .single();

  if (!cart)
    return { state: "error", message: "Carrinho não encontrado", item: null };

  const { data: item, error } = await supabase
    .from("cart_items")
    .insert({
      cart_id: cart.id,
      product_id: product_id,
      quantity: 1,
      size_id: size_id,
    })
    .eq("cart_id", cart?.id)
    .single();

  if (error) return { state: "error", message: error.message, item: null };
  return { state: "success", message: null, item };
}
