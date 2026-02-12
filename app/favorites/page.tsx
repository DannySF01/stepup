import { redirect } from "next/navigation";
import { createServer } from "@/lib/supabase/server";

export default async function FavoritesPage() {
  const supabase = createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div>
      <h1>Os teus favoritos</h1>
      {favorites?.length === 0 && <p>Sem favoritos</p>}
    </div>
  );
}
