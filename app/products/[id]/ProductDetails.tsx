"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart/addToCart";
import { Product } from "@/lib/types/database.types";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useState } from "react";

type ProductStockWIthSize = {
  stock: number;
  sizes: {
    id: string;
    value: number;
  };
};

type ProductDetailsProps = {
  product: Product;
  sizes: ProductStockWIthSize[];
};

export default function ProductDetails({
  product,
  sizes,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<ProductStockWIthSize>();
  const [error, setError] = useState<string | null>(null);

  const addItemToCart = async () => {
    try {
      setError(null);
      if (!selectedSize) throw new Error("Nenhum tamanho selecionado");
      await addToCart(product.id, selectedSize.sizes.id);
      alert("Produto adicionado ao carrinho");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const addToFavorites = () => {
    if (!selectedSize) return;
    //TODO adicionar aos favoritos
  };

  return (
    <div className="flex w-full gap-6 py-12">
      <div className="flex-3">
        <img
          className="w-full max-h-full aspect-square object-cover"
          src={product?.image_url || ""}
          alt={product?.name}
        />
      </div>
      <div className="flex flex-2 flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{product?.name}</h2>
          <p className="text-2xl">{formatPrice(product?.price)}</p>
        </div>
        <div>
          <h3 className="pb-4 font-semibold">Escolha um tamanho disponível</h3>
          <div className="flex gap-2">
            {sizes?.map((s: ProductStockWIthSize) => (
              <Button
                disabled={s.stock === 0}
                size="lg"
                variant={
                  selectedSize?.sizes.id === s.sizes.id ? "default" : "outline"
                }
                key={s.sizes.id}
                onClick={() => setSelectedSize(s)}
              >
                EU {s.sizes.value}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button size="lg" className="cursor-pointer" onClick={addItemToCart}>
            Adicionar ao carrinho
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer"
            onClick={addToFavorites}
          >
            Adicionar aos favoritos
          </Button>
        </div>

        <div>
          <h3 className="pb-4 font-semibold">Informação do produto</h3>
          {product?.description || "Sem descrição disponivel"}
        </div>
      </div>
    </div>
  );
}
