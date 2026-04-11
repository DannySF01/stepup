import { formatToCurrency } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";
import Link from "next/link";
import { CreditCard, Truck, ShieldCheck, ArrowRight } from "lucide-react";

interface SidebarProps {
  subtotal: number;
  total: number;
  discount: number;
  discount_percentage: number;
  delivery: number;
}

export default function CartSidebar({
  subtotal,
  total,
  discount,
  discount_percentage,
  delivery,
}: SidebarProps) {
  return (
    <div className="bg-card p-8 rounded-2xl space-y-8 relative overflow-hidden">
      <div className="space-y-2 relative">
        <h2 className="text-2xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          Resumo
        </h2>
        <div className="h-1.5 w-12 bg-primary rounded-full" />
      </div>

      <div className="space-y-5 relative">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em]">
          <p className="text-muted-foreground">Subtotal</p>
          <span className="text-foreground tabular-nums font-bold">
            {formatToCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck size={14} className="text-primary" strokeWidth={2.5} />
            <p>Entrega</p>
          </div>
          <span
            className={`tabular-nums font-bold ${delivery === 0 ? "text-primary italic" : "text-foreground"}`}
          >
            {delivery === 0 ? "Grátis" : formatToCurrency(delivery)}
          </span>
        </div>

        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.15em]">
          <p className="text-muted-foreground">
            Desconto ({discount_percentage}%)
          </p>
          <span className="text-primary tabular-nums font-bold">
            -{formatToCurrency(discount)}
          </span>
        </div>

        <div className="flex justify-between border-t border-border/60 pt-8 mt-2 items-end">
          <p className="text-xl font-black uppercase tracking-tighter italic leading-none">
            Total
          </p>
          <div className="text-right space-y-1">
            <span className="text-4xl font-black tracking-tighter tabular-nums text-foreground leading-none block">
              {formatToCurrency(total)}
            </span>
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">
              IVA incluído • Taxas pagas
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Link href="/cart/shipping" className="block group">
          <Button className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs gap-3 shadow-xl shadow-primary/20 transition-all active:scale-[0.97] bg-foreground text-background hover:bg-primary border-none">
            Finalizar Compra
            <ArrowRight
              size={18}
              strokeWidth={3}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/50">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default">
            <ShieldCheck size={12} strokeWidth={3} /> Pagamento Seguro
          </span>
          <span className="opacity-30">•</span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default">
            <CreditCard size={12} strokeWidth={3} /> MBWay & Cartão
          </span>
        </div>
      </div>

      <div className="p-5 bg-muted/30 rounded-2xl border border-border/40 group-hover:bg-muted/40 transition-colors">
        <p className="text-[9px] leading-relaxed text-muted-foreground font-black uppercase tracking-tight italic opacity-70">
          Ao finalizar, concordas com os termos StepUp. O processamento é
          prioritário e imediato para a nossa rede de logística.
        </p>
      </div>
    </div>
  );
}
