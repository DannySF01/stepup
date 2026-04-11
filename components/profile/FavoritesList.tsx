"use client";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { createClient } from "@/lib/supabase/client";
import { FavoriteWithProduct } from "@/lib/types/favorites.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FavoritesListProps {
  initialFavorites: any;
}

export default function FavoritesList({
  initialFavorites,
}: FavoritesListProps) {
  const router = useRouter();
  const [favorites, setFavoritesList] = useState<FavoriteWithProduct[]>(
    initialFavorites || [],
  );

  async function removeFavorite(id: string) {
    try {
      setFavoritesList((prev) => prev.filter((f) => f.product_id !== id));
      await addToFavorites(id);
      router.refresh();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="divide-y divide-border/40">
      {favorites?.map((f: FavoriteWithProduct) => (
        <div
          key={f.id}
          className="group grid grid-cols-4 items-center gap-8 py-10 transition-all hover:bg-muted/10 px-6 -mx-6 rounded-3xl"
        >
          <div className="flex gap-8 col-span-2 items-center">
            <div className="relative aspect-square w-24 overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-sm transition-all duration-500 group-hover:scale-105">
              <img
                className="h-full w-full object-cover"
                src={f.products?.image_url || ""}
                alt={f.products?.name}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Link
                className="relative inline-block w-fit text-lg font-black italic uppercase tracking-tighter text-foreground group/link"
                href={`/products/${f.products?.id}`}
              >
                {f.products?.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
              </Link>
              <Link
                className="text-[10px] font-black uppercase tracking-[0.2em] text-primary"
                href={`/products?category=${f.products?.categories?.slug}`}
              >
                {f.products?.categories?.name}
              </Link>
              <p className="mt-2 text-base font-black tracking-tighter tabular-nums italic uppercase text-foreground">
                {formatToCurrency(f.products?.price)}
              </p>
            </div>
          </div>

          <div className="justify-self-center">
            <Link href={`/products/${f.products?.id}`}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary active:scale-95 shadow-lg shadow-foreground/5">
                <ShoppingBag size={14} />
                Comprar
              </button>
            </Link>
          </div>

          <div className="justify-self-end">
            <button
              onClick={() => removeFavorite(f.product_id || "")}
              className="p-3 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-full transition-all active:scale-90"
              title="Remover dos favoritos"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
