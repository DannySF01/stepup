"use client";
import { Profile } from "@/lib/types/auth.types";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import { useTableFilters } from "@/hooks/useTableFilters";
import Table from "../ui/Table";

interface UsersTableProps {
  profiles: Profile[] | null;
  search: string;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export default function UsersTable({
  profiles,
  search,
  pagination,
}: UsersTableProps) {
  const { searchTerm, setSearchTerm, setPage } = useTableFilters(search);

  const columns = [
    {
      header: "Utilizador",
      render: (p: Profile) => (
        <div className="flex gap-6 items-center">
          <img
            className="w-12 aspect-square rounded-full object-cover"
            src={p.avatar_url || ""}
            alt=""
          />
          <p>{p.name}</p>
        </div>
      ),
    },
    { header: "Email", render: (p: Profile) => p.email },
    { header: "Cargo", render: (p: Profile) => p.role },
    {
      header: "Data",
      render: (p: Profile) => new Date(p.created_at || "").toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <TableSearch value={searchTerm} onChange={setSearchTerm} />
      <Table data={profiles} columns={columns} columnCount={4} />
      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}
