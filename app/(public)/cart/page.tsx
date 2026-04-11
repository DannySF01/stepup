import { getCart } from "@/lib/cart/getCart";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import CartSidebar from "@/components/cart/CartSidebar";
import CartTable from "@/components/cart/CartTable";
import { ShoppingBag, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Cart() {
  const { cart } = await getCart();
  const items = cart?.cart_items as CartItemWithProduct[];

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
    <div className="app-container py-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <Link
        href="/products"
        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Continuar a comprar
      </Link>

      <header className="mb-12 space-y-2">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <ShoppingBag size={16} strokeWidth={2.5} />
          <span>Saco de Compras</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          O Teu Carrinho
        </h1>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 w-full space-y-8">
          <div className="bg-card rounded-4xl border border-border/40 shadow-sm overflow-hidden backdrop-blur-sm">
            <CartTable items={items} />
          </div>

          <div className="flex items-center justify-between p-6 bg-muted/20 rounded-3xl border border-border/40">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-background rounded-2xl shadow-sm border border-border/40 text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight text-foreground">
                  Checkout Seguro
                </p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  SSL Encriptado • StepUp Verified
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-4 opacity-40 grayscale"></div>
          </div>
        </div>

        <aside className="lg:col-span-4 w-full sticky top-28">
          <div className="relative group">
            <div className="relative bg-card rounded-4xl border border-border/60 shadow-xl p-2">
              <CartSidebar
                subtotal={subtotal}
                total={total}
                discount={total_discount}
                discount_percentage={discount}
                delivery={delivery}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
