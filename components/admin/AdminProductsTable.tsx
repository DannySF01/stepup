"use client";
import { ProductDetailed, ProductSize } from "@/lib/types/products.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { StarIcon, Package, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import { useTableFilters } from "@/hooks/useTableFilters";
import Table from "../ui/Table";

interface AdminProductsTableProps {
  products: ProductDetailed[] | null;
  product_sizes: ProductSize[] | null;
  pagination: { currentPage: number; totalPages: number };
  search: string;
}

export default function AdminProductsTable({
  products,
  product_sizes,
  pagination,
  search,
}: AdminProductsTableProps) {
  const router = useRouter();
  const { searchTerm, setSearchTerm, setPage } = useTableFilters(search);

  const columns = [
    {
      header: "Produto",
      className: "col-span-2",
      render: (p: ProductDetailed) => (
        <div className="flex gap-4 items-center col-span-2 group">
          <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-muted/30">
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src={p.image_url || "/placeholder-product.png"}
              alt={p.name}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-foreground truncate tracking-tight">
              {p.name}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
              <Layers size={10} /> {p.categories?.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Avaliação",
      render: (p: ProductDetailed) => (
        <div className="flex items-center gap-1.5 font-medium text-sm">
          <span className="text-foreground">
            {p.rating_avg?.toFixed(1) || "0.0"}
          </span>
          <StarIcon size={14} className="fill-yellow-400 text-yellow-400" />
        </div>
      ),
    },
    {
      header: "Marca",
      render: (p: ProductDetailed) => (
        <span className="text-sm font-medium text-muted-foreground bg-muted/40 px-2 py-1 rounded-lg border border-border/30">
          {p.brands?.name}
        </span>
      ),
    },
    {
      header: "Stock",
      render: (p: ProductDetailed) => {
        const stock =
          product_sizes?.find((size) => size.product_id === p.id)?.stock || 0;
        const isLow = stock <= 5;
        return (
          <div
            className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full w-fit border ${
              isLow
                ? "bg-red-500/10 text-red-600 border-red-200/50"
                : "bg-emerald-500/10 text-emerald-600 border-emerald-200/50"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${isLow ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`}
            />
            {stock} unidades
          </div>
        );
      },
    },
    {
      header: "Preço",
      render: (p: ProductDetailed) => (
        <span className="font-bold text-foreground tabular-nums">
          {formatToCurrency(p.effective_price)}
        </span>
      ),
    },
  ];

  const handleRowClick = (product: ProductDetailed) => {
    router.push(`/admin/products/${product.id}`);
  };

  return (
    <div className="space-y-0">
      <div className="p-4 border-b border-border/40 bg-muted/5">
        <TableSearch value={searchTerm} onChange={setSearchTerm} />
      </div>
      <Table
        data={products}
        columns={columns}
        columnCount={7}
        onRowClick={handleRowClick}
      />
      <div className="p-4 border-t border-border/40 bg-muted/5">
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>
    </div>
  );
}
