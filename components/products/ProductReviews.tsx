"use client";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Rating from "@/components/ui/Rating";
import { CommentWithProfile } from "@/lib/types/products.types";
import {
  Edit,
  MoreHorizontal,
  Trash2,
  UserCircle,
  MessageSquarePlus,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { useRouter } from "next/navigation";

interface ReviewsProps {
  comments: CommentWithProfile[];
  productId: string;
  rating: {
    average: number;
    count: number;
  };
}

export default function ProductReviews({
  comments,
  productId,
  rating,
}: ReviewsProps) {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const { profile } = useAuth();

  const ratingPercentage = (r: number) =>
    (comments.filter((c) => c.rating === r).length / comments.length) * 100 ||
    0;

  async function handleAddReview() {
    if (!profile)
      return toast({
        variant: "error",
        description: "Inicie sessão para avaliar",
      });

    if (comments.some((comment) => comment.user_id === profile.id)) {
      return toast({
        variant: "error",
        description: "Já tem uma avaliação para este produto",
      });
    } else {
      // verifica se comprou o produto
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", profile.id);

      if (!orders) {
        console.error("Ocorreu um erro ao buscar os pedidos", error);
        return toast({
          variant: "error",
          description: "Ocorreu um erro, tente novamente mais tarde",
        });
      }

      if (
        !orders.some((order) =>
          order.order_items.some((item) => item.product_id === productId),
        )
      ) {
        return toast({
          variant: "error",
          description: "Só pode avaliar produtos que comprou",
        });
      }

      router.push(`/products/${productId}/new`);
    }
  }

  async function deleteComment(commentId: string) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) return console.error(error.message);

    router.refresh();

    return toast({
      title: "Sucesso",
      description: "Avaliação removida com sucesso",
    });
  }

  function handleEditComment() {
    router.push(`/products/${productId}/edit`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-12 border-t border-border/40">
      <div className="space-y-8">
        <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <span className="text-6xl font-black tracking-tighter text-foreground tabular-nums">
              {rating.average.toFixed(1)}
            </span>
            <Rating size={5} rating={rating.average} />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Baseado em {rating.count} avaliações
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/40">
            {[5, 4, 3, 2, 1].map((num) => (
              <div
                key={num}
                className="grid grid-cols-12 items-center gap-3 group"
              >
                <span className="col-span-2 text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors">
                  {num} ★
                </span>
                <div className="col-span-8 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${ratingPercentage(num)}%` }}
                  />
                </div>
                <span className="col-span-2 text-[10px] font-bold text-muted-foreground text-right tabular-nums">
                  {Math.round(ratingPercentage(num))}%
                </span>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-primary/20 hover:bg-primary/5 hover:text-primary gap-2 text-xs font-black uppercase tracking-widest transition-all"
            onClick={handleAddReview}
          >
            <MessageSquarePlus size={16} />
            Avaliar Produto
          </Button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        {comments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground bg-muted/20 rounded-3xl border-2 border-dashed border-border/40">
            <p className="text-sm font-medium tracking-tight">
              Este produto ainda não tem avaliações.
            </p>
            <p className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60">
              Sê o primeiro a comentar!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {comments.map((comment: CommentWithProfile) => (
              <div
                key={comment.id}
                className="group relative bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="relative shrink-0">
                    {comment.profiles?.avatar_url ? (
                      <img
                        src={comment.profiles?.avatar_url}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border border-border/60 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserCircle size={24} />
                      </div>
                    )}
                    <div className="absolute -right-1 -bottom-1 bg-background rounded-full p-0.5 border border-border/50">
                      <ShieldCheck
                        size={10}
                        className="text-primary fill-primary/10"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                          {comment.profiles?.name}
                          {profile?.id === comment.user_id && (
                            <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-md uppercase font-black tracking-tighter">
                              Tu
                            </span>
                          )}
                        </h4>
                        <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-tighter">
                          {new Date(
                            comment.created_at || "",
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Rating size={3} rating={comment.rating} />
                        {profile?.id === comment.user_id && (
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={handleEditComment}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => deleteComment(comment.id)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
