"use client";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { createClient } from "@/lib/supabase/client";
import { FavoriteWithProduct } from "@/lib/types/favorites.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FavoritesListProps {
  initialFavorites: any;
}

export default function FavoritesList({
  initialFavorites,
}: FavoritesListProps) {
  const supabase = createClient();
  const router = useRouter();

  const [favorites, setFavoritesList] = useState<FavoriteWithProduct[]>(
    initialFavorites || [],
  );

  async function removeFavorite(id: string) {
    try {
      setFavoritesList((prev: any) =>
        prev.filter((f: any) => f.product_id !== id),
      );
      await addToFavorites(id);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div>
      {favorites?.map((f: FavoriteWithProduct) => {
        return (
          <div
            key={f.id}
            className="grid grid-cols-3 place-items-center gap-3 py-6 border-b"
          >
            <div className="flex gap-6 col-span-2 place-self-start">
              <img
                className="max-w-24 aspect-square object-cover"
                src={f.products?.image_url || ""}
                alt={f.products?.name}
              />
              <div className="flex flex-col gap-2">
                <Link className="" href={`/products/${f.products?.id}`}>
                  {f.products?.name}
                </Link>
                <Link
                  className="text-sm place-self-start text-muted-foreground"
                  href={`/products?category=${f.products?.categories?.slug}`}
                >
                  {f.products?.categories?.name}
                </Link>
                <p className="">{formatToCurrency(f.products?.price)} </p>
              </div>
            </div>
            <button
              onClick={() => removeFavorite(f.product_id || "")}
              className="cursor-pointer p-3 hover:bg-primary hover:text-primary-foreground rounded-full transition duration-300 ml-auto"
            >
              <XIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
