import ProductReviewForm from "@/components/products/ProductReviewForm";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChevronLeft, MessageSquarePlus, ShoppingBag } from "lucide-react";
import Link from "next/link";

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

  if (comment) return redirect(PATH);

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", profile.id);

  if (
    error ||
    !orders.some((order) =>
      order.order_items.some((item) => item.product_id === id),
    )
  ) {
    return redirect(PATH);
  }

  const { data: product } = await supabase
    .from("products")
    .select("*, categories!inner(name), brands!inner(name)")
    .eq("id", id)
    .single();

  return (
    <div className="app-container py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-6">
        <Link
          href={PATH}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <ChevronLeft size={16} />
          </div>
          Cancelar e voltar
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
            <MessageSquarePlus size={14} />
            <span>Partilha a tua experiência</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-foreground">
            Escrever Avaliação
          </h1>
        </div>
      </header>

      <div className="bg-card rounded-3xl border border-border/50 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 bg-linear-to-br from-card to-muted/10">
        <div className="relative w-40 h-40 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-xl shadow-black/5">
          <img
            src={product?.image_url || ""}
            alt={product?.name || "Produto"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
              <ShoppingBag size={12} />
              Compra Verificada
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {product?.name}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-xl font-medium">
            {product?.description}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <ProductReviewForm productId={id} />
      </div>
    </div>
  );
}
