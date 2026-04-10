"use client";
import Link from "next/link";
import { Button } from "../ui/Button";
import {
  Heart,
  LogOut,
  ShoppingBag,
  SunMoonIcon,
  TruckIcon,
  User,
  UserCircle2,
  LayoutDashboard,
} from "lucide-react";
import { Menu, MenuItem } from "../ui/Menu";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Badge from "@/components/ui/Badge";
import Search from "../ui/Search";
import Topbar from "./topbar";

interface HeaderProps {
  cart_count: number;
  fav_count: number;
}

export default function header({ cart_count, fav_count }: HeaderProps) {
  const { profile, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <header className="absolute top-0 left-0 w-full glass-green z-50 transition-all duration-300">
      <Topbar />
      <div className="app-container mx-auto h-20 flex items-center justify-between gap-8">
        <Link
          className="text-2xl font-black tracking-tighter italic uppercase group"
          href="/"
        >
          Step
          <span className="text-primary transition-colors group-hover:text-foreground">
            Up
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden md:block">
          <Search />
        </div>

        <div className="flex  items-center">
          <button
            className="p-3 rounded-xl hover:bg-primary/10 text-foreground transition-all active:scale-90"
            onClick={() => document.body.classList.toggle("dark")}
          >
            <SunMoonIcon
              size={24}
              strokeWidth={2}
              className="hover:scale-110 hover:text-primary transition-all duration-300"
            />
          </button>

          <Link
            className="p-3 rounded-xl hover:bg-primary/10 text-foreground transition-all relative group active:scale-95"
            href="/favorites"
          >
            <Badge value={fav_count}>
              <Heart
                size={24}
                strokeWidth={2}
                className="group-hover:scale-110 group-hover:text-primary transition-all duration-300"
              />
            </Badge>
          </Link>

          <Link
            className="p-3 rounded-xl hover:bg-primary/10 text-foreground transition-all relative group active:scale-95"
            href="/cart"
          >
            <Badge value={cart_count}>
              <ShoppingBag
                size={24}
                strokeWidth={2}
                className="group-hover:scale-110 group-hover:text-primary transition-all duration-300"
              />
            </Badge>
          </Link>

          {isAuthenticated ? (
            <div className="border-l border-border/40 pl-2 sm:pl-5 ml-1">
              <Menu
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary/10 transition-colors font-bold text-sm tracking-tight"
                icon={
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                }
                title={profile?.name?.split(" ")[0] || ""}
              >
                <MenuItem
                  icon={<UserCircle2 size={16} />}
                  onClick={() => router.push("/profile")}
                >
                  Perfil
                </MenuItem>
                <MenuItem
                  icon={<TruckIcon size={16} />}
                  onClick={() => router.push("/profile/my-orders")}
                >
                  Pedidos
                </MenuItem>
                {profile?.role === "admin" && (
                  <MenuItem
                    icon={<LayoutDashboard size={16} />}
                    onClick={() => router.push("/admin")}
                  >
                    Admin Dashboard
                  </MenuItem>
                )}
                <div className="my-1 border-t border-border/40" />
                <MenuItem icon={<LogOut size={16} />} onClick={signOut}>
                  Sair
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              size="sm"
              asChild
              className="rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]"
            >
              <Link href="/auth/login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
