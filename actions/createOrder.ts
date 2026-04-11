"use server";

import { createServer } from "@/lib/supabase/server";
import { formatToCents } from "@/lib/utils/formatPrice";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import { revalidatePath } from "next/cache";

export async function createOrder(prevState: any) {
  const supabase = await createServer();

  const { data: address } = await supabase
    .from("addresses")
    .select("*")
    .single();

  if (!address) {
    console.log("Endereço nao encontrado");
    return { success: false, message: "Ocorreu um erro" };
  }

  const { data: cart, error: cart_error } = await supabase
    .from("carts")
    .select()
    .single();

  if (cart_error) {
    console.log("cart_select ", cart_error);
    return { success: false, message: "Ocorreu um erro" };
  }

  if (!cart) {
    console.log("carrinho nao encontrado");
    return { success: false, message: "Ocorreu um erro" };
  }

  const { data: cartItems, error: cart_items_error } = await supabase
    .from("cart_items")
    .select("*, products!inner(*)")
    .eq("cart_id", cart.id);

  if (cart_items_error) {
    console.log("cart_items_select ", cart_items_error);
    return { success: false, message: "Ocorreu um erro" };
  }

  if (!cartItems) {
    console.log("Nao foram encontrados itens no carrinho");
    return { success: false, message: "Ocorreu um erro" };
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = getEffectivePrice(
      item.products.price,
      item.products.on_sale,
      item.products.sale_price,
    );
    return acc + price * item.quantity;
  }, 0);

  const discount = 10; // 10%
  const delivery = 500; // 5€

  const total_discount = Math.floor(subtotal * (discount / 100));
  const total = subtotal + delivery - total_discount;

  const { data: order, error: orders_error } = await supabase
    .from("orders")
    .insert({
      shipping_address: address.address,
      shipping_district: address.district,
      shipping_city: address.city,
      shipping_postal_code: address.postal_code,
      shipping_country: address.country,
      shipping_name: address.name,
      shipping_surname: address.surname,
      shipping_email: address.email,
      shipping_phone: address.phone,
      shipping_tax: address.tax,
      status: "pending",
      total: total,
    })
    .select()
    .single();

  if (orders_error) {
    console.log("orders_insert ", orders_error);
    return { success: false, message: "Ocorreu um erro" };
  }

  const cartItemsWithPrice = cartItems.map((item) => ({
    ...item,
    price_at_purchase: getEffectivePrice(
      item.products.price,
      item.products.on_sale,
      item.products.sale_price,
    ),
  }));

  const { error: order_items_error } = await supabase
    .from("order_items")
    .insert(
      cartItemsWithPrice.map((item) => ({
        order_id: order?.id,
        product_id: item.products.id,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase,
      })),
    );

  if (order_items_error) {
    console.log("order_items_insert ", order_items_error);
    return { success: false, message: "Ocorreu um erro" };
  }

  const { error: cart_delete_items_error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id);

  if (cart_delete_items_error) {
    console.log("cart_items_delete ", cart_delete_items_error);
    return { success: false, message: "Ocorreu um erro" };
  }

  revalidatePath("/");

  return { success: true, message: "Pedido efetuado com sucesso" };
}
