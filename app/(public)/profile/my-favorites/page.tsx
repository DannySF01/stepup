import FavoritesList from "@/components/profile/FavoritesList";
import { createServer } from "@/lib/supabase/server";
import { Heart } from "lucide-react";

export default async function MyFavorites() {
  const supabase = await createServer();

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*, products!inner(*, categories!inner(*))");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <Heart size={14} strokeWidth={3} className="fill-primary/20" />
          <span>Coleção Pessoal</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          Os Meus Favoritos
        </h1>
        <div className="h-1.5 w-12 bg-primary rounded-full" />
      </header>

      <div className="p-8 md:p-12">
        {favorites && favorites.length > 0 ? (
          <FavoritesList initialFavorites={favorites} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="p-6 rounded-full bg-muted/20 text-muted-foreground/30 border border-dashed border-border">
              <Heart size={48} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                A tua lista está vazia
              </h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                Guarda os teus sneakers favoritos para os encontrares mais
                tarde.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
