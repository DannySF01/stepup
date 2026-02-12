import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types/database.types";
import ProductDetails from "./ProductDetails";
import ProductComments from "./ProductComments";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();

  const { id } = await params;
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single<Product>();

  if (error || !product) {
    throw new Error("Produto não encontrado");
  }

  const { data: sizes } = await supabase
    .from("product_sizes")
    .select(
      `
    stock,
    sizes (
      id,
      value
    )
  `,
    )
    .eq("product_id", id)
    .order("sizes(value)", { ascending: true });

  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
    id,
    content,
    rating,
    created_at,
    user:users (
      email
    )
  `,
    )
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col m-auto max-w-6xl">
      <ProductDetails product={product} sizes={sizes || []} />
      <ProductComments commments={comments || []} />
    </div>
  );
}
