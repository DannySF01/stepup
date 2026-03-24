import { createServer } from "../supabase/server";

export default async function getFavorites() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { data: [], error: null, fav_count: 0 };

  const { data, error, count } = await supabase
    .from("favorites")
    .select("*, products!inner(*, categories!inner(*))", { count: "exact" })
    .eq("user_id", user.id);

  return { data, error, fav_count: count || 0 };
}
