"use client";
import { ProductDetailed } from "@/lib/types/products.types";
import { useRouter } from "next/navigation";
import Card from "../ui/Card";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE } from "@/lib/utils/pagination";
import { PackageSearch } from "lucide-react";

interface ProductsListProps {
  products: ProductDetailed[] | null;
  searchParams: any;
  pagination: { currentPage: number; totalPages: number };
}

export default function ProductsList({
  products,
  searchParams,
  pagination,
}: ProductsListProps) {
  const router = useRouter();

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
        {products?.map((p: ProductDetailed, index: number) => (
          <div
            key={p.id}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card {...p} href={`/products/${p.id}`} />
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/40 rounded-3xl bg-muted/5">
          <div className="p-4 bg-muted/20 rounded-full mb-4">
            <PackageSearch size={40} className="text-muted-foreground/40" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Sem resultados para a sua busca
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Tente remover alguns filtros ou procure por termos mais genéricos.
          </p>
        </div>
      )}

      {products &&
        (products.length >= PAGE_SIZE || pagination.currentPage > 1) && (
          <div className="pt-12 border-t border-border/40">
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        )}
    </div>
  );
}
