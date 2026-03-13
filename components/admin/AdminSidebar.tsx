"use client";
import { Profile } from "@/lib/types/auth.types";
import {
  LayoutDashboardIcon,
  MoveLeft,
  Package,
  SkipBack,
  SquareChartGantt,
  TruckIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  user: any;
  profile: Profile;
}

export default function AdminSidebar({ user, profile }: AdminSidebarProps) {
  const NavItem = ({
    label,
    icon,
    href,
  }: {
    label: string;
    icon?: React.ReactNode;
    href: string;
  }) => {
    const pathname = usePathname();

    function isActive() {
      return pathname === href;
    }

    return (
      <Link
        href={href}
        className={`grid grid-cols-5 gap-3  place-items-center cursor-pointer rounded-md px-3 py-1.5 ${
          isActive()
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground hover:bg-muted"
        }
        `}
      >
        <span>{icon}</span>
        <span className="col-span-4 place-self-start my-auto">{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-card">
      <aside className="w-64 p-6 text-sm ">
        <h2 className="text-xl font-bold mb-8">
          Step<span className="text-primary">Up</span> Admin
        </h2>
        <nav className="flex flex-col gap-3">
          <NavItem
            label="Dashboard"
            icon={<LayoutDashboardIcon />}
            href="/admin"
          />
          <NavItem label="Produtos" icon={<Package />} href="/admin/products" />
          <NavItem
            label="Encomendas"
            icon={<SquareChartGantt />}
            href="/admin/orders"
          />
          <NavItem
            label="Entregas"
            icon={<TruckIcon />}
            href="/admin/deliveries"
          />
          <NavItem label="Clientes" icon={<Users />} href="/admin/customers" />
        </nav>
        <div className="mt-9">
          <NavItem label="Voltar a loja" icon={<MoveLeft />} href="/" />
        </div>
      </aside>
    </div>
  );
}
