import AdminProductsTable from "@/components/admin/AdminProductsTable";
import { Button } from "@/components/ui/Button";
import { createServer } from "@/lib/supabase/server";
import { ProductDetailed } from "@/lib/types/products.types";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import { Plus, PackageSearch } from "lucide-react";
import Link from "next/link";

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
  const { from, to, currentPage } = getPagination(page);

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

  const totalPages = getTotalPages(count);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-widest mb-1">
            <PackageSearch size={14} />
            <span>Inventário</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-foreground">
            Produtos
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {count ?? 0}{" "}
            {count === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        </div>

        <Button
          asChild
          className="rounded-xl shadow-lg shadow-primary/20 gap-2 h-11 px-6"
        >
          <Link href="/admin/products/new">
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-bold">Novo Produto</span>
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <AdminProductsTable
          products={products as ProductDetailed[]}
          product_sizes={product_sizes}
          pagination={{ currentPage, totalPages }}
          search={search}
        />
      </div>
    </div>
  );
}
