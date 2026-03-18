import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types/products.types";
import isFavorite from "@/lib/favorites/isFavorite";
import ProductDetails from "@/components/products/ProductDetails";
import ProductReviews from "@/components/products/ProductReviews";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();

  const { id } = await params;
  const { data: product, error } = await supabase
    .from("products")
    .select("*, product_sizes(*, sizes!inner(*))")
    .eq("id", id)
    .order("sizes(value)", {
      referencedTable: "product_sizes",
      ascending: true,
    })
    .single();

  if (!product || error) throw new Error("Produto não encontrado");

  const isFav = await isFavorite(product.id);

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("product_id", id)
    .order("created_at");

  return (
    <div className="flex flex-col m-auto max-w-7xl">
      <ProductDetails product={product} isFav={isFav} />
      <ProductReviews comments={comments || []} productId={product.id} />
    </div>
  );
}
