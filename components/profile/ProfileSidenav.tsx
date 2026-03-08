"use client";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/authService";
import {
  User2Icon,
  MapPinIcon,
  TruckIcon,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProfileSidenav() {
  const router = useRouter();
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  const ProfileNavItem = ({
    title,
    icon,
    isActive,
    onClick,
  }: {
    title: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
  }) => {
    return (
      <div
        onClick={onClick}
        className={`grid grid-cols-5 gap-2 place-items-center cursor-pointer rounded-md p-3 bg-sidebar-accent hover:bg-sidebar-accent-foreground hover:text-sidebar-primary-foreground transition duration-300 ${
          isActive
            ? "bg-sidebar-accent-foreground text-sidebar-primary-foreground"
            : ""
        }
        `}
      >
        <span>{icon}</span>
        <span className="col-span-4 place-self-start">{title}</span>
      </div>
    );
  };

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="space-y-3">
      <ProfileNavItem
        title="Informações Pessoais"
        isActive={isActive("/profile")}
        icon={<User2Icon />}
        onClick={() => {
          router.push("/profile");
        }}
      />
      <ProfileNavItem
        title="As Minhas Moradas"
        isActive={isActive("/profile/my-addresses")}
        icon={<MapPinIcon />}
        onClick={() => {
          router.push("/profile/my-addresses");
        }}
      />
      <ProfileNavItem
        title="Os Meus Pedidos"
        isActive={isActive("/profile/my-orders")}
        icon={<TruckIcon />}
        onClick={() => {
          router.push("/profile/my-orders");
        }}
      />
      <ProfileNavItem
        title="Os Meus Favoritos"
        isActive={isActive("/profile/my-favorites")}
        icon={<HeartIcon />}
        onClick={() => {
          router.push("/profile/my-favorites");
        }}
      />
      <ProfileNavItem
        title="Terminar Sessão"
        icon={<LogOutIcon />}
        onClick={() => handleSignOut()}
      />
    </div>
  );
}
