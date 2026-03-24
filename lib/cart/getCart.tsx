import { createServer } from "@/lib/supabase/server";
import { CartWithItems } from "../types/cart.types";

export async function getCart() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { cart: null, items: [], cart_count: 0 };

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

  if (!cart) return { cart: null, items: [], cart_count: 0 };

  const cart_count =
    cart.cart_items
      .map((item) => item.quantity)
      .reduce((a: any, b: any) => a + b, 0) || 0;

  return { cart, items: cart.cart_items, cart_count };
}
