"use client";
import { ProductWithEffectivePrice } from "@/lib/types/products.types";
import { useRouter } from "next/navigation";
import Card from "../ui/Card";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE } from "@/lib/utils/pagination";

interface ProductsListProps {
  products: ProductWithEffectivePrice[] | null;
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
    <div className="mx-auto">
      <div className="grid grid-cols-5 gap-3 h-fit">
        {products?.map((p: ProductWithEffectivePrice) => (
          <Card key={p.id} {...p} href={`/products/${p.id}`} />
        ))}
      </div>
      {products?.length === 0 && (
        <span className="text-muted-foreground">Nenhum produto encontrado</span>
      )}
      {products &&
        (products?.length >= PAGE_SIZE || pagination.currentPage > 1) && (
          <Pagination pagination={pagination} onPageChange={setPage} />
        )}
    </div>
  );
}
