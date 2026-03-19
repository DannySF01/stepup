"use client";

import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Rating from "@/components/ui/Rating";
import { CommentWithProfile } from "@/lib/types/products.types";
import { Edit, MoreHorizontal, Trash2, UserCircle } from "lucide-react";
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
  const MAX_COMMENTS = 3;
  const MAX_RATING = 5;

  const { toast } = useToast();
  const router = useRouter();

  const supabase = createClient();
  const { profile } = useAuth();

  if (!profile) return null;

  function ratingPercentage(rating: number) {
    return (
      (comments.filter((c) => c.rating === rating).length / comments.length) *
        100 || 0
    );
  }

  async function handleAddReview() {
    if (!profile)
      return toast({
        title: "Erro",
        variant: "error",
        description: "É necessário estar autenticado para avaliar",
      });

    if (comments.some((comment) => comment.user_id === profile.id)) {
      return toast({
        title: "Erro",
        variant: "error",
        description: "Já tem uma avaliação para este produto",
      });
    } else {
      // verifica se comprou o produto supabase
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
    <div className="pb-12">
      <h3 className="text-xl mb-9 font-semibold underline underline-offset-9">
        Avaliações ({rating.count})
      </h3>
      <div className="flex gap-6 pb-12">
        <div className="flex flex-col flex-2 gap-6 px-6">
          <div className="flex justify-center items-center gap-6">
            <div className="text-5xl">{rating.average.toFixed(1)}</div>
            <Rating size={8} rating={rating.average} />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <span>5 estrelas</span>
            <span className="col-span-2 my-auto">
              <ProgressBar progress={ratingPercentage(5)} />
            </span>
            <span>4 estrelas</span>
            <span className="col-span-2 my-auto">
              <ProgressBar progress={ratingPercentage(4)} />
            </span>
            <span>3 estrelas</span>
            <span className="col-span-2 my-auto">
              <ProgressBar progress={ratingPercentage(3)} />
            </span>
            <span>2 estrelas</span>
            <span className="col-span-2 my-auto">
              <ProgressBar progress={ratingPercentage(2)} />
            </span>
            <span>1 estrelas</span>
            <span className="col-span-2 my-auto">
              <ProgressBar progress={ratingPercentage(1)} />
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddReview}
          >
            Escrever uma avaliação
          </Button>
        </div>
        <div className="flex-3">
          <div className="flex flex-col gap-6">
            {comments?.length === 0 && (
              <p className="py-6 text-muted-foreground">
                Ainda não existe uma avaliação para este produto
              </p>
            )}

            {comments.map((comment: CommentWithProfile) => (
              <div key={comment.id} className="bg-muted/80 p-6 rounded-md">
                <div className="flex gap-3 mb-3">
                  <div className="my-auto">
                    {comment.profiles?.avatar_url ? (
                      <img
                        src={comment.profiles?.avatar_url}
                        alt={comment.profiles?.avatar_url}
                        className="w-9 h-9 rounded-full"
                      />
                    ) : (
                      <UserCircle className="w-9 h-9" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold flex gap-2">
                        {comment.profiles?.name}
                        {profile?.id === comment.user_id && (
                          <Menu icon={<MoreHorizontal className="w-4 h-4" />}>
                            <div className="flex flex-col gap-2 items-center">
                              <MenuItem
                                icon={<Edit className="w-4 h-4" />}
                                onClick={() => handleEditComment()}
                              >
                                Editar
                              </MenuItem>
                              <MenuItem
                                icon={<Trash2 className="w-4 h-4" />}
                                onClick={() => deleteComment(comment.id)}
                              >
                                Excluir
                              </MenuItem>
                            </div>
                          </Menu>
                        )}
                      </h4>

                      <p className="text-muted-foreground text-sm">
                        {new Date(
                          comment.created_at || "",
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Rating size={4} rating={comment.rating} />
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
