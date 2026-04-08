import AdminProductNewForm from "@/components/admin/AdminProductNewForm";
import { createClient } from "@/lib/supabase/client";

export default async function AdminProductNew() {
  const supabase = await createClient();

  const { data: categories } = await supabase.from("categories").select("*");

  if (!categories) return null;

  const { data: brands } = await supabase.from("brands").select("*");

  if (!brands) return null;

  const { data: sizes } = await supabase.from("sizes").select("*");

  if (!sizes) return null;

  return (
    <div className="p-3 space-y-6">
      <AdminProductNewForm
        categories={categories}
        sizes={sizes}
        brands={brands}
      />
    </div>
  );
}
