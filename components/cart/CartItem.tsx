"use client";
import { useState } from "react";
import CounterInput from "../ui/CounterInput";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { Category } from "@/lib/types/products.types";
import { Trash2 } from "lucide-react"; // Added for a premium delete action

interface CartItemProps {
  id: string;
  item: {
    id: string;
    name: string;
    image_url: string;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    categories: Category;
  };
  quantity: number;
  size: string;
}

export default function CartItem({ id, item, quantity, size }: CartItemProps) {
  const supabase = createClient();
  const [qtd, setQuantity] = useState(quantity);
  const router = useRouter();

  const updateQuantity = async (value: number) => {
    setQuantity(value);
    if (value === 0) return removeItem();
    await supabase.from("cart_items").update({ quantity: value }).eq("id", id);
    router.refresh();
  };

  const removeItem = async () => {
    await supabase.from("cart_items").delete().eq("id", id);
    router.refresh();
  };

  const unitPrice = getEffectivePrice(
    item.price,
    item.on_sale,
    item.sale_price,
  );
  const totalPrice = formatToCurrency(unitPrice * qtd);

  return (
    <div className="group grid grid-cols-4 items-center gap-8 py-10 border-b border-border/40 transition-all hover:bg-muted/10 px-6 -mx-6 rounded-3xl relative">
      <div className="flex gap-8 col-span-2 items-center">
        <div className="relative aspect-square w-32 overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/5">
          <img
            className="h-full w-full object-cover"
            src={item.image_url}
            alt={item.name}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Link
            className="relative inline-block w-fit text-xl font-black italic uppercase tracking-tighter text-foreground group/link"
            href={`/products/${item.id}`}
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
          </Link>

          <Link
            className="text-[10px] font-black uppercase tracking-[0.2em] text-primary"
            href={`/products?category=${item.categories.slug}`}
          >
            {item.categories.name || "Sem categoria"}
          </Link>

          <div className="mt-3 flex items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Tamanho{" "}
              <span className="ml-1 text-foreground bg-muted px-2 py-1 rounded-lg border border-border/40 font-bold">
                {size} EU
              </span>
            </p>

            <button
              onClick={removeItem}
              className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-destructive hover:scale-110 transition-all"
            >
              <Trash2 size={12} />
              Remover
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center">
        <CounterInput value={qtd} onChange={(value) => updateQuantity(value)} />
      </div>

      <p className="justify-self-end text-2xl font-black tracking-tighter tabular-nums text-foreground italic uppercase">
        {totalPrice}
      </p>
    </div>
  );
}
