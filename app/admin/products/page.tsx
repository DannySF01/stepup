import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { createServer } from "@/lib/supabase/server";

export default async function AdminProducts() {
  const supabase = await createServer();

  const { data: products } = await supabase
    .from("products")
    .select("*, categories!inner(*), brands!inner(*)")
    .limit(10);

  const { data: product_sizes } = await supabase
    .from("product_sizes")
    .select("*");

  return (
    <div className="bg-card p-9 rounded-md space-y-6">
      <h1 className="text-xl ">Produtos</h1>
      <AdminProductsTable products={products} product_sizes={product_sizes} />
    </div>
  );
}
