"use client";
import { signOut } from "@/services/authService";
import {
  User2Icon,
  MapPinIcon,
  TruckIcon,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function ProfileSidenav() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  const ProfileNavItem = ({
    title,
    icon,
    path,
    isDestructive,
    onClick,
  }: {
    title: string;
    icon: React.ReactNode;
    path?: string;
    isDestructive?: boolean;
    onClick?: () => void;
  }) => {
    const active = path ? pathname === path : false;

    return (
      <button
        onClick={onClick || (() => path && router.push(path))}
        className={`w-full group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 active:scale-95 ${
          active
            ? "bg-primary text-primary-foreground border-primary hover:bg-primary/80 hover:border-primary/20"
            : isDestructive
              ? "bg-transparent text-destructive border-transparent hover:bg-destructive/5 hover:border-destructive/20"
              : "bg-card text-muted-foreground border-border/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
        }`}
      >
        <span
          className={`text-[10px] font-black uppercase tracking-[0.2em] italic transition-all ${active ? "translate-x-1" : "group-hover:translate-x-1"}`}
        >
          {title}
        </span>
      </button>
    );
  };

  return (
    <nav className="flex flex-col gap-3 w-full max-w-70">
      <div className="flex flex-col gap-2">
        <ProfileNavItem title="Perfil" path="/profile" icon={<User2Icon />} />
        <ProfileNavItem
          title="Moradas"
          path="/profile/my-addresses"
          icon={<MapPinIcon />}
        />
        <ProfileNavItem
          title="Encomendas"
          path="/profile/my-orders"
          icon={<TruckIcon />}
        />
        <ProfileNavItem
          title="Favoritos"
          path="/profile/my-favorites"
          icon={<HeartIcon />}
        />
      </div>

      <div className="pt-4 mt-4 border-t border-border/40">
        <ProfileNavItem
          title="Sair da Conta"
          isDestructive
          icon={<LogOutIcon />}
          onClick={handleSignOut}
        />
      </div>
    </nav>
  );
}
