import { formatToCurrency } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import { CreditCard, ShieldCheck } from "lucide-react";

interface SidebarProps {
  subtotal: number;
  total: number;
  discount: number;
  discount_percentage: number;
  delivery: number;
  items: CartItemWithProduct[];
}

export default function PaymentSidebar({
  subtotal,
  total,
  discount,
  discount_percentage,
  delivery,
  items,
}: SidebarProps) {
  return (
    <div className="bg-card rounded-4xl p-8 space-y-8 relative overflow-hidden">
      <div className="space-y-1 relative">
        <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.3em] mb-1">
          <ShieldCheck size={12} strokeWidth={3} />
          <span>Revisão Final</span>
        </div>
        <h2 className="text-2xl font-black tracking-tighter uppercase italic text-foreground">
          Pagamento
        </h2>
        <div className="h-1.5 w-10 bg-primary rounded-full" />
      </div>

      <div className="max-h-70 overflow-y-auto pr-2 custom-scrollbar border-b border-border/40 pb-6">
        <div className="space-y-5 py-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="relative shrink-0">
                  <div className="h-14 w-14 rounded-xl overflow-hidden border border-border/40 bg-muted/20">
                    <img
                      src={item.products.image_url || ""}
                      alt={item.products.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-foreground text-background text-[10px] font-black rounded-full flex items-center justify-center border-2 border-card shadow-sm">
                    {item.quantity || 1}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-tight text-foreground truncate">
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
          <p>Envio Garantido</p>
          <span
            className={`tabular-nums ${delivery === 0 ? "text-primary italic" : "text-foreground"}`}
          >
            {delivery === 0 ? "Grátis" : formatToCurrency(delivery)}
          </span>
        </div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary">
          <p>Desconto ({discount_percentage}%)</p>
          <span className="tabular-nums">-{formatToCurrency(discount)}</span>
        </div>

        <div className="flex justify-between border-t border-border/60 pt-8 mt-2">
          <p className="text-xl font-black uppercase tracking-tighter italic">
            Total a Pagar
          </p>
          <div className="text-right">
            <span className="text-3xl font-black tracking-tighter tabular-nums text-foreground leading-none">
              {formatToCurrency(total)}
            </span>
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-2 opacity-60">
              Taxas & IVA incluídos
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Button
          form="payment-form"
          className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs gap-3 bg-foreground text-background hover:bg-primary shadow-xl shadow-primary/20 transition-all active:scale-[0.97] group"
        >
          Confirmar e Pagar
          <CreditCard
            size={18}
            className="transition-transform group-hover:rotate-12"
          />
        </Button>

        <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20">
          <p className="text-[9px] leading-relaxed text-primary font-bold uppercase tracking-tight italic text-center">
            Pagamento 100% seguro. Ao clicar, autorizas o processamento imediato
            da tua reserva StepUp.
          </p>
        </div>
      </div>
    </div>
  );
}
