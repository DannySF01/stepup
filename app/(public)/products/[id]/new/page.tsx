import ProductReviewForm from "@/components/products/ProductReviewForm";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface NewProductReviewProps {
  params: Promise<{ id: string }>;
}

export default async function NewProductReview({
  params,
}: NewProductReviewProps) {
  const { id } = await params;
  const supabase = await createServer();
  const PATH = "/products/" + id;

  const { profile } = await getUserWithProfile();
  if (!profile) return redirect(PATH);

  const { data: comment } = await supabase
    .from("comments")
    .select("*")
    .eq("product_id", id)
    .eq("user_id", profile.id)
    .single();

  if (comment) {
    return redirect(PATH);
  } else {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", profile.id);

    if (error) return redirect(PATH);

    if (
      !orders.some((order) =>
        order.order_items.some((item) => item.product_id === id),
      )
    ) {
      return redirect(PATH);
    }
  }

  const { data: product } = await supabase
    .from("products")
    .select("*, categories!inner(name), brands!inner(name)")
    .eq("id", id)
    .single();

  return (
    <div className="min-h-screen p-9 max-w-6xl mx-auto">
      <div className="p-9 space-y-6 bg-card rounded-md">
        <h1 className="text-2xl">Escrever uma avaliação</h1>
        <div className="flex items-center gap-4">
          <img
            src={product?.image_url || ""}
            alt={product?.name}
            className="w-48 h-48 aspect-square rounded-md object-cover"
          />
          <div className="space-y-3">
            <div className="text-xl">{product?.name}</div>
            <div className="text-sm text-muted-foreground text-ellipsis overflow-hidden">
              {product?.description}
            </div>
          </div>
        </div>

        <ProductReviewForm productId={id} />
      </div>
    </div>
  );
}
