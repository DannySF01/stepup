import { formatToCurrency } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface SidebarProps {
  subtotal: number;
  total: number;
  discount: number;
  discount_percentage: number;
  delivery: number;
  items: CartItemWithProduct[];
}

export default function ShippingSidebar({
  subtotal,
  total,
  discount,
  discount_percentage,
  delivery,
  items,
}: SidebarProps) {
  return (
    <div className="bg-card p-8 rounded-2xl space-y-8 relative overflow-hidden">
      <div className="space-y-1 relative">
        <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.3em] mb-1">
          <ShoppingBag size={12} />
          <span>O Teu Pedido</span>
        </div>
        <h2 className="text-2xl font-black tracking-tighter uppercase italic text-foreground">
          Resumo
        </h2>
        <div className="h-1.5 w-10 bg-primary rounded-full" />
      </div>

      <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar border-b border-border/40 pb-6">
        <div className="space-y-6 py-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <div className="h-16 w-16 rounded-xl overflow-hidden border border-border/40 bg-muted/20">
                    <img
                      src={item.products.image_url || ""}
                      alt={item.products.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-foreground text-background text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                    {item.quantity || 1}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-black uppercase tracking-tight text-foreground leading-tight">
                    {item.products.name}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {item.products.categories?.name}
                  </p>
                </div>
              </div>
              <span className="text-sm font-black tracking-tighter italic text-foreground tabular-nums">
                {formatToCurrency(
                  getEffectivePrice(
                    item.products.price,
                    item.products.on_sale,
                    item.products.sale_price,
                  ),
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <p>Subtotal</p>
          <span className="text-foreground tabular-nums">
            {formatToCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <p>Entrega</p>
          <span
            className={`tabular-nums ${delivery === 0 ? "text-primary italic" : "text-foreground"}`}
          >
            {delivery === 0 ? "Grátis" : formatToCurrency(delivery)}
          </span>
        </div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
          <p className="text-muted-foreground">
            Desconto ({discount_percentage}%)
          </p>
          <span className="text-primary tabular-nums">
            -{formatToCurrency(discount)}
          </span>
        </div>

        <div className="flex justify-between border-t border-border/60 pt-6 mt-2">
          <p className="text-xl font-black uppercase tracking-tighter italic">
            Total
          </p>
          <div className="text-right">
            <span className="text-3xl font-black tracking-tighter tabular-nums text-foreground leading-none">
              {formatToCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Button
          form="shipping-form"
          className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs gap-3 bg-foreground text-background hover:bg-primary shadow-xl shadow-primary/20 transition-all active:scale-[0.97] group"
        >
          Ir para Pagamento
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Button>

        <div className="p-5 bg-muted/20 rounded-2xl border border-border/40">
          <p className="text-[9px] leading-relaxed text-muted-foreground font-bold uppercase tracking-tight italic opacity-70">
            A StepUp garante o processamento imediato após a confirmação. Podes
            cancelar até o envio sem custos.
          </p>
        </div>
      </div>
    </div>
  );
}
