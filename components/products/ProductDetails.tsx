"use client";
import { Button } from "@/components/ui/Button";
import { addToCart } from "@/lib/cart/addToCart";
import addToFavorites from "@/lib/favorites/addToFavorites";
import { ProductDetailed } from "@/lib/types/products.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import { Heart, ShoppingBag, Truck, ShieldCheck, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/Toast";
import Rating from "../ui/Rating";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: ProductDetailed;
  isFav: boolean;
}

type ProductStockWithSize = {
  stock: number;
  sizes: {
    id: string;
    value: number;
  };
};

export default function ProductDetails({
  product,
  isFav,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<ProductStockWithSize>();
  const [isFavorite, setIsFavorite] = useState(isFav);
  const router = useRouter();
  const { toast } = useToast();
  const sizes = product.product_sizes as ProductStockWithSize[];

  const addItemToCart = async () => {
    if (!selectedSize)
      return toast({
        description: "Por favor, selecione um tamanho",
        variant: "error",
      });
    const response = await addToCart(product.id, selectedSize.sizes.id);
    if (response.message && response.state === "error")
      return toast({ description: response.message, variant: "error" });
    toast({
      description: "Produto adicionado ao carrinho",
    });
    router.refresh();
  };

  const addItemToFavorites = async () => {
    const response = await addToFavorites(product.id);
    if (response.state === "error")
      return toast({ description: response.message, variant: "error" });
    setIsFavorite(!isFavorite);
    toast({
      description: isFavorite
        ? "Removido dos favoritos"
        : "Adicionado aos favoritos",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="flex-1">
        <div className="sticky top-24 space-y-4">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border/40 bg-muted/20">
            <img
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              src={product?.image_url || ""}
              alt={product?.name || "Product"}
            />
            {product?.on_sale && (
              <span className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-xl shadow-primary/20">
                Promoção
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-24 space-y-8">
          <div className="space-y-4 border-b border-border/40 pb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                {product.brands?.name || "Premium Collection"}
              </span>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-tight text-foreground">
                {product?.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Rating rating={product?.rating_avg} />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {product.rating_count} Reviews
              </span>
            </div>

            <div className="text-3xl font-black tracking-tighter tabular-nums flex items-baseline gap-3">
              {product?.on_sale ? (
                <>
                  <span className="text-foreground">
                    {formatToCurrency(product.sale_price)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through opacity-40 font-bold">
                    {formatToCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-foreground">
                  {formatToCurrency(product.price)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
                Selecionar Tamanho
              </h3>
              <button className="text-[10px] font-bold text-primary underline underline-offset-4">
                Guia de tamanhos
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {sizes?.map((s) => {
                const active = selectedSize?.sizes.id === s.sizes.id;
                const outOfStock = s.stock === 0;
                return (
                  <button
                    key={s.sizes.id}
                    disabled={outOfStock}
                    onClick={() => setSelectedSize(active ? undefined : s)}
                    className={`
                      h-12 rounded-xl border text-sm font-bold transition-all duration-200 relative overflow-hidden
                      ${
                        active
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                          : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
                      }
                      ${outOfStock ? "opacity-30 cursor-not-allowed bg-muted/50" : "cursor-pointer"}
                    `}
                  >
                    {s.sizes.value}
                    {active && (
                      <Check size={10} className="absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest gap-3 shadow-xl shadow-primary/20"
              onClick={addItemToCart}
            >
              <ShoppingBag size={20} />
              Adicionar ao Carrinho
            </Button>

            <Button
              variant="outline"
              size="lg"
              className={`h-14 w-14 rounded-2xl border-border/60 transition-all ${isFavorite ? "text-red-500 bg-red-50 border-red-200" : "hover:text-primary hover:border-primary/40"}`}
              onClick={addItemToFavorites}
            >
              <Heart className={isFavorite ? "fill-current" : ""} size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
              <Truck size={18} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  Entrega Grátis
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Em compras acima de 80€
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
              <ShieldCheck size={18} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  Garantia StepUp
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Produtos 100% originais
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/40">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground">
              Sobre o Produto
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground font-medium">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
