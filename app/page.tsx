import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/lib/types/database.types";

export default async function Home() {
  const { data: products, error } = await supabase.from("products").select("*");

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="grid grid-cols-4">
        {products?.map((product: Product) => (
          <Link
            key={product.id}
            className="p-6"
            href={"/products/" + product.id}
          >
            <img
              className="w-full max-w-80 aspect-square object-cover mb-2"
              src={product.image_url}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>{product.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
