"use client";
import {
  ProductSize,
  ProductWithCategoryAndBrand,
} from "@/lib/types/products.types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import { useTableFilters } from "@/hooks/useTableFilters";
import Table from "../ui/Table";

interface AdminProductsTableProps {
  products: ProductWithCategoryAndBrand[] | null;
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
      render: (p: ProductWithCategoryAndBrand) => (
        <div className="flex gap-3 items-center col-span-2">
          <img
            className="w-12 aspect-square rounded-full object-cover"
            src={p.image_url || ""}
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
      render: (p: ProductWithCategoryAndBrand) => (
        <div className="flex gap-1.5">
          {5} <StarIcon size={20} className="text-yellow-400" />
        </div>
      ),
    },
    {
      header: "Categoria",
      render: (p: ProductWithCategoryAndBrand) => p.categories?.name,
    },
    {
      header: "Marca",
      render: (p: ProductWithCategoryAndBrand) => p.brands?.name,
    },
    {
      header: "Stock",
      render: (p: ProductWithCategoryAndBrand) => (
        <div>
          {product_sizes?.find((size) => size.product_id === p.id)?.stock || 0}
        </div>
      ),
    },
    {
      header: "Preço",
      render: (p: ProductWithCategoryAndBrand) => {
        const productSize = product_sizes?.find((ps) => ps.product_id === p.id);
        if (productSize) {
          return formatPrice(p.price);
        } else {
          return "";
        }
      },
    },
  ];

  const handleRowClick = (product: ProductWithCategoryAndBrand) => {
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
