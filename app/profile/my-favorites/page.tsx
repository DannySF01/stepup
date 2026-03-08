import FavoritesList from "@/components/profile/FavoritesList";
import { createServer } from "@/lib/supabase/server";

export default async function MyFavorites() {
  const supabase = await createServer();

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*, products!inner(*, categories!inner(*))");

  return <FavoritesList initialFavorites={favorites} />;
}
