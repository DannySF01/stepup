import AdminProductForm from "@/components/admin/AdminProductForm";
import { createClient } from "@/lib/supabase/client";

interface AdminProductProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProduct({ params }: AdminProductProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: categories } = await supabase.from("categories").select("*");

  if (!categories) return null;

  const { data: brands } = await supabase.from("brands").select("*");

  if (!brands) return null;

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(*), brands(*)")
    .eq("id", id)
    .single();

  if (!products) return null;

  const { data: product_sizes } = await supabase
    .from("product_sizes")
    .select("*, sizes(*)")
    .eq("product_id", id);

  if (!product_sizes) return null;

  return (
    <div className="bg-card p-9 rounded-md space-y-6">
      <AdminProductForm
        product={products}
        product_sizes={product_sizes}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
