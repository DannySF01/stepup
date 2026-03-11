"use client";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import {
  Heart,
  LogOut,
  ShoppingBag,
  SunMoonIcon,
  TruckIcon,
  User,
  UserCircle2,
} from "lucide-react";
import { Menu, MenuItem } from "../ui/Menu";
import { signOut } from "@/services/authService";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Badge from "@/components/ui/Badge";

interface HeaderProps {
  cart_count: number;
  fav_count: number;
}
export default function header({ cart_count, fav_count }: HeaderProps) {
  const { profile, isAuthenticated } = useAuth();

  return (
    <header className="absolute top-0 left-0 w-screen">
      <div className="relative flex overflow-x-hidden bg-primary py-1.5 text-white text-sm tracking-widest">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-primary to-transparent z-10"></div>
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 pl-12">
          <span>🔥 SALDOS ATÉ 50% EM PRODUTOS SELECIONADOS</span>
          <span>📦 PORTES GRÁTIS EM TODAS AS ENCOMENDAS</span>
          <span>⭐ MAIS DE 5.000 CLIENTES SATISFEITOS</span>
        </div>
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 pl-12">
          <span>🔥 SALDOS ATÉ 50% EM PRODUTOS SELECIONADOS</span>
          <span>📦 PORTES GRÁTIS EM TODAS AS ENCOMENDAS</span>
          <span>⭐ MAIS DE 5.000 CLIENTES SATISFEITOS</span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-primary to-transparent z-10"></div>
      </div>
      <div className="app-container min-h-20 mx-auto flex items-center justify-between ">
        <Link className="text-2xl font-bold" href="/">
          Step<span className="text-primary">Up</span>
        </Link>
        <Input className="w-69" placeholder="Pesquisar" />
        <div className="flex gap-4 items-center">
          <SunMoonIcon
            className="cursor-pointer hover:text-primary"
            onClick={() => document.body.classList.toggle("dark")}
          />
          <Link
            className="flex items-center hover:text-primary"
            href="/favorites"
          >
            <Badge value={fav_count}>
              <Heart />
            </Badge>
          </Link>
          <Link
            className="flex items-center relative hover:text-primary"
            href="/cart"
          >
            <Badge value={cart_count}>
              <ShoppingBag />
            </Badge>
          </Link>
          {isAuthenticated ? (
            <div>
              <Menu
                className="p-2 hover:text-primary"
                icon={<User />}
                title={profile?.name || ""}
              >
                <MenuItem
                  icon={<UserCircle2 />}
                  onClick={() => redirect("/profile")}
                >
                  Perfil
                </MenuItem>
                <MenuItem icon={<TruckIcon />}>
                  <Link href="/profile/my-orders">Pedidos</Link>
                </MenuItem>
                <MenuItem icon={<LogOut />} onClick={signOut}>
                  Terminar Sessão
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button size="lg">
              <Link href="/auth/login">Iniciar Sessão</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
