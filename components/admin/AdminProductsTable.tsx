"use client";
import { ProductDetailed, ProductSize } from "@/lib/types/products.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import { useTableFilters } from "@/hooks/useTableFilters";
import Table from "../ui/Table";

interface AdminProductsTableProps {
  products: ProductDetailed[] | null;
  product_sizes: ProductSize[] | null;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
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
        <div className="flex gap-3 items-center col-span-2">
          <img
            className="w-12 aspect-square rounded-full object-cover"
            src={p.image_url || undefined}
            alt=""
          />
          <div className="text-ellipsis whitespace-nowrap overflow-hidden">
            {p.name}
          </div>
        </div>
      ),
    },
    {
      header: "Classificação",
      render: (p: ProductDetailed) => (
        <div className="flex gap-1.5">
          {p.rating_avg} <StarIcon size={20} className="text-yellow-400" />
        </div>
      ),
    },
    {
      header: "Categoria",
      render: (p: ProductDetailed) => p.categories?.name,
    },
    {
      header: "Marca",
      render: (p: ProductDetailed) => p.brands?.name,
    },
    {
      header: "Stock",
      render: (p: ProductDetailed) => (
        <div>
          {product_sizes?.find((size) => size.product_id === p.id)?.stock || 0}
        </div>
      ),
    },
    {
      header: "Preço",
      render: (p: ProductDetailed) => {
        const productSize = product_sizes?.find((ps) => ps.product_id === p.id);
        if (productSize) {
          return formatToCurrency(p.price);
        } else {
          return "";
        }
      },
    },
  ];

  const handleRowClick = (product: ProductDetailed) => {
    router.push(`/admin/products/${product.id}`);
  };

  return (
    <div className="space-y-6">
      <TableSearch value={searchTerm} onChange={setSearchTerm} />
      <Table
        data={products}
        columns={columns}
        columnCount={7}
        onRowClick={handleRowClick}
      />
      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}
