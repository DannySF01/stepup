"use client";
import { OrderWithItems } from "@/lib/types/cart.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import Table from "../ui/Table";
import { useTableFilters } from "@/hooks/useTableFilters";
import { PAGE_SIZE } from "@/lib/utils/pagination";
import { Hash, Calendar, CreditCard, User } from "lucide-react";

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
      header: "Pedido",
      render: (p: OrderWithItems) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground">
            <Hash size={14} />
          </div>
          <span className="font-bold text-foreground tabular-nums tracking-tight">
            {p.id.toString()}
          </span>
        </div>
      ),
    },
    {
      header: "Cliente",
      render: (p: OrderWithItems) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground leading-none mb-1">
            {p.shipping_name} {p.shipping_surname}
          </span>
        </div>
      ),
    },
    {
      header: "Estado",
      render: (p: OrderWithItems) => {
        // Semantic status logic
        const statusStyles: Record<string, string> = {
          completed: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
          pending: "bg-amber-500/10 text-amber-600 border-amber-200/50",
          cancelled: "bg-red-500/10 text-red-600 border-red-200/50",
          shipped: "bg-blue-500/10 text-blue-600 border-blue-200/50",
        };

        const status_index = (p.status && p.status.toLowerCase()) || "pending";

        return (
          <span
            className={`
            px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border
            ${statusStyles[status_index] || "bg-muted text-muted-foreground border-border"}
          `}
          >
            {p.status}
          </span>
        );
      },
    },
    {
      header: "Data",
      render: (p: OrderWithItems) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={14} />
          <span className="text-xs font-medium">
            {new Date(p.created_at).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      header: "Total",
      render: (p: OrderWithItems) => (
        <div className="flex items-center gap-2 font-bold text-foreground tabular-nums">
          <CreditCard size={14} className="text-muted-foreground/50" />
          {formatToCurrency(p.total)}
        </div>
      ),
    },
  ];

  return (
    <div className="divide-y divide-border/40">
      <div className="p-4 bg-muted/5">
        <TableSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Pesquise pelo ID do pedido..."
        />
      </div>

      <Table data={orders} columns={columns} columnCount={5} />

      {((orders && orders?.length >= PAGE_SIZE) ||
        pagination.currentPage > 1) && (
        <div className="p-4 bg-muted/5">
          <Pagination pagination={pagination} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
