import { getCart } from "@/lib/cart/getCart";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PaymentForm from "@/components/cart/PaymentForm";
import PaymentSidebar from "@/components/cart/PaymentSidebar";
import { createServer } from "@/lib/supabase/server";
import { Lock } from "lucide-react";
import { formatToCurrency } from "@/lib/utils/formatPrice";

export default async function Payment() {
  const { cart } = await getCart();
  const items = cart?.cart_items as CartItemWithProduct[];

  const supabase = await createServer();
  const { data: address } = await supabase
    .from("addresses")
    .select("*")
    .single();

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
  const subtotal = calculateSubtotal(items);
  const delivery = subtotal > 80 ? 0 : items?.length > 0 ? 500 : 0;
  const total_discount = subtotal * (discount / 100);
  const total = subtotal + delivery - total_discount;

  return (
    <div className="app-container py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-12 space-y-4">
        <Breadcrumb />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
              <Lock size={14} strokeWidth={3} />
              <span>Pagamento Seguro</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic text-foreground leading-none">
              Checkout
            </h1>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Pedido total
            </p>
            <p className="text-2xl font-black tracking-tighter italic text-foreground">
              {formatToCurrency(total)}
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7 w-full space-y-12">
          <div className="bg-card rounded-4xl border border-border/40 shadow-sm p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
            <PaymentForm address={address} />
          </div>
        </div>

        <aside className="lg:col-span-5 w-full sticky top-28">
          <div className="relative">
            <div className="relative">
              <PaymentSidebar
                subtotal={subtotal}
                total={total}
                discount={total_discount}
                discount_percentage={discount}
                delivery={delivery}
                items={items}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
