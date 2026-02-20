import getFavorites from "@/lib/favorites/getFavorites";
import FavoriteList from "./FavoriteList";

export default async function FavoritesPage() {
  const { data: favorites, error } = await getFavorites();

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex min-h-screen p-6 flex-col gap-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Os teus favoritos</h1>
      <FavoriteList initialFavorites={favorites} />
    </div>
  );
}
