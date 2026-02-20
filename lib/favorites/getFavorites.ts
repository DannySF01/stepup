import { createServer } from "../supabase/server";

export default async function getFavorites() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { data: [], error: null };

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      *,
      products!inner (
        *,
        categories!inner (
          *
        )
      ) 
    `,
    )
    .eq("user_id", user.id);

  return { data, error };
}
