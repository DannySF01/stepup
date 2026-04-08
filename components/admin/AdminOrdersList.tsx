"use client";
import { OrderWithItems } from "@/lib/types/cart.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import Table from "../ui/Table";
import { useTableFilters } from "@/hooks/useTableFilters";
import { PAGE_SIZE } from "@/lib/utils/pagination";
import Tag from "../ui/Tag";

interface OrdersListProps {
  orders: OrderWithItems[] | null;
  pagination: { currentPage: number; totalPages: number };
  search: string;
}
export default function AdminOrdersList({
  orders,
  pagination,
  search,
}: OrdersListProps) {
  const { searchTerm, setSearchTerm, setPage } = useTableFilters(search);

  const columns = [
    {
      header: "Nº do Pedido",
      className: "text-sm",
      render: (p: OrderWithItems) => p.id,
    },
    {
      header: "Utilizador",
      render: (p: OrderWithItems) => p.shipping_name + " " + p.shipping_surname,
    },
    {
      header: "Estado",
      render: (p: OrderWithItems) => <Tag status={p.status}>{p.status}</Tag>,
    },
    {
      header: "Data",
      render: (p: OrderWithItems) =>
        new Date(p.created_at).toLocaleDateString(),
    },
    {
      header: "Total",
      render: (p: OrderWithItems) => formatToCurrency(p.total),
    },
    {
      header: "Entrega",
      render: (p: OrderWithItems) => "Gratis",
    },
  ];

  return (
    <div className="space-y-6">
      <TableSearch
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Pesquise pelo nº do pedido"
      />
      <Table data={orders} columns={columns} columnCount={7} />
      {((orders && orders?.length >= PAGE_SIZE) ||
        pagination.currentPage > 1) && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
}
