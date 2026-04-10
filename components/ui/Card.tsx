import Link from "next/link";
import { formatToCurrency } from "@/lib/utils/formatPrice";

interface CardProps {
  name: string | null;
  image_url: string | null;
  price: number | null;
  sale_price: number | null;
  on_sale: boolean | null;
  href: string;
}

export default function Card({
  name,
  image_url,
  price,
  sale_price,
  on_sale,
  href,
}: CardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-card rounded-2xl border border-border/40 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          src={image_url || "/placeholder-shoe.png"}
          alt={name || "Produto"}
        />

        {on_sale && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-lg animate-in fade-in zoom-in duration-300">
            Oferta
          </div>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-sm font-bold text-foreground truncate tracking-tight group-hover:text-primary transition-colors">
          {name}
        </h2>

        <div className="flex items-baseline gap-2">
          {on_sale ? (
            <>
              <span className="text-lg font-black text-foreground tabular-nums tracking-tighter">
                {formatToCurrency(sale_price)}
              </span>
              <span className="text-xs text-muted-foreground line-through tabular-nums opacity-60">
                {formatToCurrency(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-black text-foreground tabular-nums tracking-tighter">
              {formatToCurrency(price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
