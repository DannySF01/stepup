import { getCart } from "@/lib/cart/getCart";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import ShippingSidebar from "@/components/cart/ShippingSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShippingForm from "@/components/cart/ShippingForm";
import { createServer } from "@/lib/supabase/server";

export default async function Shipping() {
  const { cart } = await getCart();
  const items = cart?.cart_items as CartItemWithProduct[];

  const supabase = await createServer();

  const { data: addresses } = await supabase.from("addresses").select("*");

  function calculateSubtotal(items: CartItemWithProduct[]): number {
    return (
      items?.reduce(
        (acc: number, item: any) =>
          acc +
          item.quantity *
            getEffectivePrice(
              item.products.price,
              item.products.on_sale,
              item.products.sale_price,
            ),
        0,
      ) || 0
    );
  }

  const discount = 10;
  const delivery = items?.length > 0 ? 500 : 0; // Valor em centimos, valor real -> 5€

  const subtotal = calculateSubtotal(items);
  const total_discount = subtotal * (discount / 100);
  const total = subtotal + delivery - total_discount;

  return (
    <div className="flex gap-6 min-h-screen p-6">
      <div className="flex flex-2 flex-col gap-6">
        <Breadcrumb />
        <ShippingForm addresses={addresses} />
      </div>
      <div className="flex-1">
        <ShippingSidebar
          subtotal={subtotal}
          total={total}
          discount={total_discount}
          discount_percentage={discount}
          delivery={delivery}
          items={items}
        />
      </div>
    </div>
  );
}
