import { createClient } from "@/lib/supabase/client";
import type { ProductDetailed } from "@/lib/types/products.types";
import isFavorite from "@/lib/favorites/isFavorite";
import ProductDetails from "@/components/products/ProductDetails";
import ProductReviews from "@/components/products/ProductReviews";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products_view")
    .select("*, product_sizes(*, sizes!inner(*))")
    .eq("id", id)
    .order("sizes(value)", {
      referencedTable: "product_sizes",
      ascending: true,
    })
    .single<ProductDetailed>();

  if (error || !product) {
    throw new Error("Produto não encontrado");
  }

  const isFav = await isFavorite(product.id);

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="app-container py-10 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <nav className="flex items-center gap-4">
        <Link
          href="/products"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <ChevronLeft size={16} />
          </div>
          Voltar ao catálogo
        </Link>
      </nav>

      <main className="grid grid-cols-1 gap-12">
        <ProductDetails product={product} isFav={isFav} />
      </main>

      <section className="pt-16 border-t border-border/40">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Reviews da Comunidade
          </h2>
        </div>

        <ProductReviews
          comments={comments || []}
          productId={product.id}
          rating={{ average: product.rating_avg, count: product.rating_count }}
        />
      </section>
    </div>
  );
}
