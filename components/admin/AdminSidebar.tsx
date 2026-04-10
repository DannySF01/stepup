"use client";
import { Profile } from "@/lib/types/auth.types";
import {
  LayoutDashboardIcon,
  MoveLeft,
  Package,
  SquareChartGantt,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  user: any;
  profile: Profile;
}

export default function AdminSidebar({ user, profile }: AdminSidebarProps) {
  const pathname = usePathname();

  const NavItem = ({
    label,
    icon,
    href,
  }: {
    label: string;
    icon: React.ReactNode;
    href: string;
  }) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group
          ${
            active
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        `}
      >
        <span
          className={`${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"} transition-colors`}
        >
          {icon}
        </span>
        <span className="tracking-tight">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 flex flex-col h-screen border-r border-border/50 bg-card/50 backdrop-blur-xl sticky top-0">
      <div className="p-8">
        <h2 className="text-xl font-bold tracking-tighter italic">
          Step<span className="text-primary">Up</span>
          <span className="text-[10px] uppercase tracking-widest ml-2 font-medium text-muted-foreground not-italic">
            Admin
          </span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        <NavItem
          label="Dashboard"
          icon={<LayoutDashboardIcon size={20} />}
          href="/admin"
        />
        <NavItem
          label="Produtos"
          icon={<Package size={20} />}
          href="/admin/products"
        />
        <NavItem
          label="Encomendas"
          icon={<SquareChartGantt size={20} />}
          href="/admin/orders"
        />
        <NavItem
          label="Utilizadores"
          icon={<Users size={20} />}
          href="/admin/users"
        />
      </nav>

      <div className="p-4 mt-auto border-t border-border/40">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all rounded-xl hover:bg-muted"
        >
          <MoveLeft size={18} />
          <span className="tracking-tight">Voltar à loja</span>
        </Link>
      </div>
    </aside>
  );
}
