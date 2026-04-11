import { CartItemWithProduct } from "@/lib/types/cart.types";
import CartItem from "./CartItem";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

interface CartTableProps {
  items: CartItemWithProduct[];
}

export default function CartTable({ items }: CartTableProps) {
  return (
    <div className="w-full bg-card rounded-3xl border border-border/40 shadow-sm overflow-hidden antialiased">
      <div className="hidden sm:grid grid-cols-4 gap-6 px-10 py-6 border-b border-border/40 bg-muted/20 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
        <div className="col-span-2">Produto</div>
        <div className="text-center">Quantidade</div>
        <div className="text-right">Total</div>
      </div>

      <div className="divide-y divide-border/40">
        {!items?.length ? (
          <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative p-8 rounded-full bg-background border border-border/60 text-muted-foreground/40 shadow-xl">
                <PackageSearch size={56} strokeWidth={1} />
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <h3 className="text-3xl font-black tracking-tighter text-foreground italic uppercase">
                O teu carrinho está vazio
              </h3>
              <p className="text-sm font-medium text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Parece que ainda não encontraste os teus sneakers ideais para
                dar o próximo passo.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground text-background text-xs font-black uppercase tracking-widest transition-all hover:bg-primary hover:shadow-2xl hover:shadow-primary/30"
            >
              Explorar Catálogo
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        ) : (
          <div className="px-6 sm:px-10 pb-6">
            {items.map((item: any) => (
              <CartItem
                key={item.id}
                id={item.id}
                item={item.products}
                quantity={item.quantity}
                size={item.sizes.value}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
