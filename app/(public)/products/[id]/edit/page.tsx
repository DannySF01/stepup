import ProductReviewEditForm from "@/components/products/ProductReviewEditForm";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChevronLeft, History, Package } from "lucide-react";
import Link from "next/link";

interface EditProductProps {
  params: Promise<{ id: string }>;
}

export default async function EditProduct({ params }: EditProductProps) {
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

  if (!comment) return redirect(PATH);

  const { data: product } = await supabase
    .from("products")
    .select("*, categories!inner(name), brands!inner(name)")
    .eq("id", id)
    .single();

  return (
    <div className="app-container py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header & Navigation */}
      <header className="flex flex-col gap-6">
        <Link
          href={PATH}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <ChevronLeft size={16} />
          </div>
          Voltar ao produto
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
            <History size={14} />
            <span>Actualizar Feedback</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Editar Avaliação
          </h1>
        </div>
      </header>

      {/* 2. Product Summary Card (Bento Style) */}
      <div className="bg-card rounded-3xl border border-border/50 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 bg-linear-to-br from-card to-muted/20">
        <div className="relative w-40 h-40 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-xl shadow-black/5">
          <img
            src={product?.image_url || ""}
            alt={product?.name || "Produto"}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">
              {product?.brands?.name}
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              {product?.name}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-xl">
            {product?.description}
          </p>
        </div>
      </div>

      {/* 3. The Form Container */}
      <div className="max-w-3xl mx-auto w-full">
        <ProductReviewEditForm productId={id} comment={comment} />
      </div>
    </div>
  );
}
