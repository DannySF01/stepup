"use client";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { FavoriteWithProduct } from "@/lib/types/favorites.types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FavoriteListProps {
  initialFavorites: FavoriteWithProduct[] | null;
}
export default function FavoriteList({ initialFavorites }: FavoriteListProps) {
  const [favoritesList, setFavoritesList] = useState<FavoriteWithProduct[]>(
    initialFavorites || [],
  );

  async function onItemRemove(id: string) {
    try {
      setFavoritesList((prev) => prev.filter((f) => f.product_id !== id));
      await addToFavorites(id);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div>
      {favoritesList?.length === 0 && <p>Sem favoritos</p>}

      {favoritesList?.map((f: FavoriteWithProduct) => (
        <div key={f.id} className="flex gap-2 p-8 border-b">
          <img
            className="w-full max-w-48 aspect-square object-cover"
            src={f.products?.image_url || ""}
            alt={f.products?.name}
          />
          <div className="flex flex-4 flex-col ">
            <div className="flex w-full justify-between gap-2 text-lg">
              <Link href={`/products/${f.product_id}`}>{f.products?.name}</Link>
              <p className="font-semibold">
                {formatPrice(f.products?.price || 0)}
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              {f.products?.categories?.name || "Sem categoria"}
            </p>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <button
              onClick={() => onItemRemove(f.product_id || "")}
              className="cursor-pointer p-6 hover:bg-slate-200 rounded-full"
            >
              <XIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
