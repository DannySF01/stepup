"use client";
import {
  ProductSize,
  ProductWithCategoryAndBrand,
} from "@/lib/types/products.types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useState } from "react";
import { Edit2Icon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminProductsTableProps {
  products: ProductWithCategoryAndBrand[] | null;
  product_sizes: ProductSize[] | null;
}

export default function AdminProductsTable({
  products,
  product_sizes,
}: AdminProductsTableProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 bg-transparent text-sm border rounded-md pr-12 pl-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow focus:border-accent hover:border-accent"
          placeholder="Pesquisar..."
        />
      </div>
      <div>
        <div className="grid grid-cols-7 border-b text-muted-foreground p-3 place-items-center">
          <div className="col-span-2 place-self-start">Produto</div>
          <div>Classificação</div>
          <div>Categoria</div>
          <div>Marca</div>
          <div>Stock</div>
          <div>Preço</div>
        </div>
        <div>
          {products?.map((product: ProductWithCategoryAndBrand) => (
            <div
              key={product.id}
              className="grid grid-cols-7 border-b gap-6 hover:bg-muted/50 cursor-pointer p-3 items-center place-items-center"
              onClick={() => router.push(`/admin/products/${product.id}`)}
            >
              <div className="col-span-2 flex items-center gap-6 place-self-start">
                <img
                  src={product.image_url || ""}
                  alt={product.name}
                  className="w-12 h-12 rounded-md aspect-square object-cover "
                />
                <div className="text-ellipsis whitespace-nowrap overflow-hidden">
                  {product.name}
                </div>
              </div>
              <div className="flex gap-1.5">
                {5} <StarIcon size={20} className="text-yellow-400" />
              </div>
              <div>{product.categories?.name}</div>
              <div>{product.brands?.name}</div>
              <div>
                {product_sizes?.find((size) => size.product_id === product.id)
                  ?.stock || 0}
              </div>
              <div>{formatPrice(product.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
