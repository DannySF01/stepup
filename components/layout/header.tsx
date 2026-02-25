"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Heart, LogOut, ShoppingBag, User, UserCircle2 } from "lucide-react";
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
    <header className="absolute top-0 left-0 w-screen bg-white">
      <div className="app-container min-h-(--header-height) mx-auto flex items-center justify-between ">
        <Link className="text-2xl font-bold" href="/">
          StepUp
        </Link>
        <Input className="w-69" placeholder="Pesquisar" />
        <div className="flex gap-4">
          <Link className="flex items-center" href="/favorites">
            <Badge value={fav_count}>
              <Heart />
            </Badge>
          </Link>
          <Link className="flex items-center relative" href="/cart">
            <Badge value={cart_count}>
              <ShoppingBag />
            </Badge>
          </Link>
          {isAuthenticated ? (
            <div>
              <Menu className="p-2" icon={<User />} title={profile?.name || ""}>
                <MenuItem
                  icon={<UserCircle2 />}
                  onClick={() => redirect("/profile")}
                >
                  My Profile
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
