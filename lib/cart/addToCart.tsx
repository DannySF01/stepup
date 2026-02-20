import { createClient } from "@/lib/supabase/client";

export async function addToCart(product_id: string, size_id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .single();

  if (!cart) return;

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

  return { item, error };
}
