import { createServer } from "@/lib/supabase/server";
import { CartWithItems } from "../types/cart";

export async function getCart() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { cart: null, items: [] };

  const { data: cart } = await supabase
    .from("carts")
    .select(
      `
      *,
      cart_items (
        *,
        products ( 
          *,
           categories (
            *
          )
        ),
        sizes (
          *
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .single<CartWithItems>();

  if (!cart) return { cart: null, items: [] };

  return { cart, items: cart.cart_items };
}
