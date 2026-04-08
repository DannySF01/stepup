import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { Button } from "@/components/ui/Button";
import { createServer } from "@/lib/supabase/server";
import { ProductDetailed } from "@/lib/types/products.types";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";

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
  const { from, to, currentPage } = getPagination(page);

  // Queries
  const supabase = await createServer();
  const search = q || "";

  const { data: products, count } = await supabase
    .from("products_view")
    .select("*, categories(*), brands(*)", { count: "exact" })
    .range(from, to)
    .ilike("name", `%${search}%`);

  const { data: product_sizes } = await supabase
    .from("product_sizes")
    .select("*");

  // Pagination
  const totalPages = getTotalPages(count);

  return (
    <div className="bg-card p-9 rounded-md space-y-6">
      <div>
        <h1 className="text-xl ">Produtos</h1>
        <p className="text-sm text-muted-foreground">
          {count} produtos encontrados
        </p>
      </div>

      <AdminProductsTable
        products={products as ProductDetailed[]}
        product_sizes={product_sizes}
        pagination={{ currentPage, totalPages }}
        search={search}
      />
    </div>
  );
}
