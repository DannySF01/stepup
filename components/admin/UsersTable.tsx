"use client";
import { Profile } from "@/lib/types/auth.types";
import Pagination from "../ui/Pagination";
import TableSearch from "../ui/TableSearch";
import { useTableFilters } from "@/hooks/useTableFilters";
import Table from "../ui/Table";
import { ShieldCheck, User } from "lucide-react";

interface UsersTableProps {
  profiles: Profile[] | null;
  search: string;
  pagination: { currentPage: number; totalPages: number };
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
        <div className="flex gap-4 items-center">
          <div className="relative w-10 h-10 shrink-0">
            {p.avatar_url ? (
              <img
                className="w-full h-full rounded-full object-cover border border-border/50"
                src={p.avatar_url}
                alt={p.name || ""}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {p.name?.substring(0, 2).toUpperCase() || <User size={14} />}
              </div>
            )}
            {p.role === "admin" && (
              <div className="absolute -right-1 -bottom-1 bg-background rounded-full p-0.5">
                <ShieldCheck
                  size={12}
                  className="text-primary fill-primary/10"
                />
              </div>
            )}
          </div>
          <p className="font-semibold text-foreground tracking-tight">
            {p.name || "Sem nome"}
          </p>
        </div>
      ),
    },
    {
      header: "Email",
      render: (p: Profile) => (
        <span className="text-muted-foreground font-medium">{p.email}</span>
      ),
    },
    {
      header: "Cargo",
      render: (p: Profile) => {
        const isAdmin = p.role === "admin";
        return (
          <span
            className={`
            px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border
            ${
              isAdmin
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-border/50"
            }
          `}
          >
            {p.role}
          </span>
        );
      },
    },
    {
      header: "Membro desde",
      render: (p: Profile) => (
        <span className="text-muted-foreground tabular-nums">
          {new Date(p.created_at || "").toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="divide-y divide-border/40">
      <div className="p-4 bg-muted/5">
        <TableSearch value={searchTerm} onChange={setSearchTerm} />
      </div>

      <Table data={profiles} columns={columns} columnCount={4} />

      <div className="p-4 bg-muted/5">
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>
    </div>
  );
}
