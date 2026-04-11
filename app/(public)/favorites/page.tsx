import getFavorites from "@/lib/favorites/getFavorites";
import FavoriteList from "@/components/favorites/FavoriteList";
import { Heart } from "lucide-react";

export default async function FavoritesPage() {
  const { data: favorites, error } = await getFavorites();

  if (error) {
    console.error(error);
  }

  return (
    <div className="app-container py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">
          <Heart size={14} className="fill-primary/20" />
          <span>Wishlist</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-foreground">
          Os Meus Favoritos
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          {favorites?.length ?? 0}{" "}
          {favorites?.length === 1 ? "item guardado" : "itens guardados"} para
          mais tarde.
        </p>
      </header>

      <main className="min-h-[50vh]">
        <FavoriteList initialFavorites={favorites} />
      </main>
    </div>
  );
}
