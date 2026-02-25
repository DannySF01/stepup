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
    <div className="flex gap-2 p-8 border-b">
      <img
        className="w-full max-w-48 aspect-square object-cover"
        src={item.image_url}
        alt={item.name}
      />
      <div className="flex flex-1 flex-col ">
        <div className="flex w-full justify-between gap-2 text-lg">
          <Link href={`/products/${item.id}`}>{item.name} </Link>
          <p className="font-semibold">{price}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          {item.categories.name || "Sem categoria"}
        </p>
        <p className="text-muted-foreground text-sm">Tamanho {size}</p>
        <CounterInput value={qtd} onChange={(value) => updateQuantity(value)} />
      </div>
    </div>
  );
}
