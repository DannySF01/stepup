import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types/products.types";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import isFavorite from "@/lib/favorites/isFavorite";
import ProductReviewForm from "./ProductReviewForm";

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

  if (!product) throw new Error("Produto nao encontrado");

  const isFav = await isFavorite(product.id);

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
    .select("*, profiles(*)")
    .eq("product_id", id)
    .order("created_at");

  return (
    <div className="flex flex-col m-auto max-w-6xl">
      <ProductDetails product={product} sizes={sizes || []} isFav={isFav} />
      <ProductReviews comments={comments || []} productId={product.id} />
      <ProductReviewForm productId={product.id} />
    </div>
  );
}
