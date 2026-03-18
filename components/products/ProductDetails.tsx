"use client";
import { Button } from "@/components/ui/Button";
import { addToCart } from "@/lib/cart/addToCart";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { ProductWithSizes } from "@/lib/types/products.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import {
  CircleQuestionMark,
  Heart,
  HeartCrack,
  Share2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/Toast";

type ProductStockWithSize = {
  stock: number;
  sizes: {
    id: string;
    value: number;
  };
};

type ProductDetailsProps = {
  product: ProductWithSizes;
  isFav: boolean;
};

export default function ProductDetails({
  product,
  isFav,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<ProductStockWithSize>();
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(isFav);

  const sizes = product.product_sizes as ProductStockWithSize[];

  const { toast } = useToast();

  const addItemToCart = async () => {
    try {
      setError(null);
      if (!selectedSize) throw new Error("Nenhum tamanho selecionado");
      await addToCart(product.id, selectedSize.sizes.id);
      toast({ description: "Produto adicionado ao carrinho" });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const addItemToFavorites = async () => {
    try {
      setError(null);
      setIsFavorite(!isFavorite);
      await addToFavorites(product.id);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) toast({ description: error, variant: "error" });
    setError(null);
  }, [error]);

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ variant: "info", description: "Link copiado" });
  };

  return (
    <div className="flex w-full gap-9 py-12">
      <div className="flex-3">
        <img
          className="w-full max-h-full aspect-square object-cover rounded-md border"
          src={product?.image_url || ""}
          alt={product?.name}
        />
      </div>
      <div className="flex flex-2 flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{product?.name}</h2>
          <p className="text-2xl">{formatToCurrency(product?.price)}</p>
        </div>
        <div>
          <h3 className="pb-3 font-semibold">Tamanhos</h3>
          <div className="flex gap-3">
            {sizes?.map((s: ProductStockWithSize) => (
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
            {sizes?.length === 0 && (
              <p className="text-destructive">
                Produto indisponivel no momento
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-9 font-semibold"
            onClick={addItemToCart}
          >
            <ShoppingBag /> Adicionar ao carrinho
          </Button>

          {isFavorite ? (
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={addItemToFavorites}
            >
              <HeartCrack className="text-destructive" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={addItemToFavorites}
            >
              <Heart />
            </Button>
          )}
        </div>
        <div>
          <h3 className="pb-3 font-semibold">Informação do produto</h3>
          {product?.description || "Sem descrição disponivel"}
        </div>
        <div>
          <h3 className=" pb-3 font-semibold">Informações adicionais</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex gap-3 border-b pb-3">
              <p className="flex-1">Marca</p>
              <p className="text-muted-foreground flex-1">Nike</p>
            </div>
            <div className="flex gap-3 border-b pb-3">
              <p className="flex-1">Cor</p>
              <p className="text-muted-foreground flex-1">Branca</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm border-y py-3 mt-auto">
          <Button variant="ghost" className="flex items-center gap-2">
            <CircleQuestionMark />
            Perguntas
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Truck />
            Entregas e devoluções
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => shareProduct()}
          >
            <Share2 />
            Partilhar
          </Button>
        </div>
      </div>
    </div>
  );
}
