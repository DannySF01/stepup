import { getCart } from "@/lib/cart/getCart";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import ShippingSidebar from "@/components/cart/ShippingSidebar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShippingForm from "@/components/cart/ShippingForm";
import { createServer } from "@/lib/supabase/server";
import { MapPin } from "lucide-react";
import { formatToCurrency } from "@/lib/utils/formatPrice";

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
  const subtotal = calculateSubtotal(items);
  const delivery = subtotal > 80 ? 0 : items?.length > 0 ? 5.99 : 0;
  const total_discount = subtotal * (discount / 100);
  const total = subtotal + delivery - total_discount;

  return (
    <div className="app-container py-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="mb-12 space-y-4">
        <Breadcrumb />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
              <MapPin size={16} strokeWidth={3} />
              <span>Logística StepUp</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic text-foreground leading-none">
              Envio
            </h1>
          </div>

          <div className="flex gap-8 items-center bg-muted/20 px-6 py-4 rounded-2xl border border-border/40">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Itens
              </p>
              <p className="text-lg font-black text-foreground">
                {items?.length || 0}
              </p>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                Total Estimado
              </p>
              <p className="text-lg font-black text-foreground tracking-tighter tabular-nums">
                {formatToCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 w-full space-y-10">
          <div className="bg-card rounded-[2.5rem] border border-border/40 shadow-sm p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
            <ShippingForm addresses={addresses} />
          </div>
        </div>

        <aside className="lg:col-span-4 w-full sticky top-28">
          <div className="bg-card rounded-4xl border border-border/60 shadow-2xl p-2 relative">
            <ShippingSidebar
              subtotal={subtotal}
              total={total}
              discount={total_discount}
              discount_percentage={discount}
              delivery={delivery}
              items={items}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
