import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { createServer } from "@/lib/supabase/server";

interface AdminProductsProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

export default async function AdminProducts({
  searchParams,
}: AdminProductsProps) {
  const { page, q } = await searchParams;

  // Pagination
  const PAGE_SIZE = 10;
  const currentPage = Number(page) || 1;
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Queries
  const supabase = await createServer();
  const search = q || "";

  const { data: products, count } = await supabase
    .from("products")
    .select("*, categories(*), brands(*)", { count: "exact" })
    .range(from, to)
    .ilike("name", `%${search}%`);

  const { data: product_sizes } = await supabase
    .from("product_sizes")
    .select("*");

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  return (
    <div className="bg-card p-9 rounded-md space-y-6">
      <h1 className="text-xl ">Produtos</h1>
      <AdminProductsTable
        products={products}
        product_sizes={product_sizes}
        pagination={{ currentPage, totalPages }}
        search={search}
      />
    </div>
  );
}
