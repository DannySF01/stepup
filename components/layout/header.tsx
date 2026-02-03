import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ShoppingBag } from "lucide-react";

export default function header() {
  return (
    <header className="absolute header-height left-0 w-screen py-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-2xl font-bold" href="/">
          StepUp
        </Link>
        <div className="flex gap-6">
          <Input placeholder="Pesquisar" />
          <Button asChild size="lg">
            <Link href="/auth/login">Iniciar Sessão</Link>
          </Button>
          <Link className="flex items-center" href="/cart">
            <ShoppingBag />
          </Link>
        </div>
      </div>
    </header>
  );
}
