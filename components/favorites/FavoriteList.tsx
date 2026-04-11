"use client";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { FavoriteWithProduct } from "@/lib/types/favorites.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { XIcon, ShoppingBag, HeartOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FavoriteListProps {
  initialFavorites: FavoriteWithProduct[] | null;
}

export default function FavoriteList({ initialFavorites }: FavoriteListProps) {
  const [favoritesList, setFavoritesList] = useState<FavoriteWithProduct[]>(
    initialFavorites || [],
  );

  const router = useRouter();

  async function onItemRemove(id: string) {
    try {
      setFavoritesList((prev) => prev.filter((f) => f.product_id !== id));
      await addToFavorites(id);
      router.refresh();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (favoritesList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/40 rounded-3xl bg-muted/5">
        <div className="p-4 bg-muted/20 rounded-full mb-4">
          <HeartOff size={40} className="text-muted-foreground/40" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          A tua wishlist está vazia
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Guarda os teus sneakers favoritos para os encontrares facilmente mais
          tarde.
        </p>
        <Link
          href="/products"
          className="mt-6 text-xs font-black uppercase tracking-widest text-primary hover:underline"
        >
          Explorar Catálogo →
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/40">
      {favoritesList.map((f: FavoriteWithProduct) => (
        <div
          key={f.id}
          className="group flex flex-col sm:flex-row items-center gap-6 py-8 transition-all hover:bg-muted/5"
        >
          <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={f.products?.image_url || ""}
              alt={f.products?.name}
            />
          </div>

          <div className="flex-1 flex flex-col text-center sm:text-left gap-1">
            <Link
              href={`/products/${f.product_id}`}
              className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              {f.products?.name}
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {f.products?.categories?.name || "Sneakers"}
            </p>
            <p className="text-lg font-black tracking-tighter tabular-nums">
              {formatToCurrency(f.products?.price)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/products/${f.product_id}`}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <ShoppingBag size={14} />
              Ver Produto
            </Link>

            <button
              onClick={() => onItemRemove(f.product_id || "")}
              className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
              title="Remover"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
