"use client";
import { useState } from "react";
import CounterInput from "../ui/CounterInput";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { Category } from "@/lib/types/products.types";

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

  const price = formatPrice(
    getEffectivePrice(item.price, item.on_sale, item.sale_price),
  );

  return (
    <div className="grid grid-cols-4 place-items-center gap-3 py-6 border-b">
      <div className="flex gap-6 col-span-2 place-self-start">
        <img
          className="max-w-32 aspect-square object-cover"
          src={item.image_url}
          alt={item.name}
        />
        <div className="flex flex-col gap-2">
          <Link className="font-bold" href={`/products/${item.id}`}>
            {item.name}
          </Link>
          <Link
            className="font-semibold text-sm"
            href={`/products?category=${item.categories.slug}`}
          >
            {item.categories.name || "Sem categoria"}
          </Link>
          <p className="text-muted-foreground text-sm">
            Tamanho:
            <span className="text-foreground font-semibold"> {size} EU</span>
          </p>
        </div>
      </div>
      <CounterInput value={qtd} onChange={(value) => updateQuantity(value)} />
      <p className="font-semibold">{price}</p>
    </div>
  );
}
