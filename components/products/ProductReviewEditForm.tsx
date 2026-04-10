"use client";
import { ActionState, editReview } from "@/actions/editReview";
import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import Rating from "@/components/ui/Rating";
import { useToast } from "@/components/ui/Toast";
import { Comment } from "@/lib/types/products.types";
import { useActionState, useEffect, useState } from "react";
import { RefreshCw, Save, History } from "lucide-react";

interface ProductReviewEditFormProps {
  productId: string;
  comment: Comment;
}

const initialState: ActionState = { success: false, message: "" };

export default function ProductReviewEditForm({
  productId,
  comment,
}: ProductReviewEditFormProps) {
  const [rating, setRating] = useState(comment.rating || 0);
  const { toast } = useToast();

  const boundAction = editReview.bind(null, productId, comment.id, rating);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  useEffect(() => {
    if (!state?.message) return;
    toast({
      variant: "error",
      description: state.message,
    });
  }, [state, toast]);

  return (
    <div className="bg-card rounded-3xl border border-border/50 p-8 md:p-10 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <History size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            Atualizar Avaliação
          </h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Edita a tua experiência anterior
          </p>
        </div>
      </div>
      <form action={formAction} className="space-y-8">
        <Field className="space-y-4">
          <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            A tua classificação *
          </FieldLabel>
          <div className="bg-muted/20 p-8 rounded-2xl border border-border/40 flex justify-center transition-all focus-within:border-primary/40 focus-within:bg-primary/5">
            <Rating
              size={10}
              rating={rating}
              interactable
              onClick={(r) => setRating(r)}
            />
          </div>
        </Field>

        <Field className="space-y-4">
          <FieldLabel
            htmlFor="review"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground"
          >
            Editar a tua opinião *
          </FieldLabel>
          <textarea
            required
            id="review"
            name="review"
            rows={6}
            defaultValue={comment.comment}
            placeholder="O que achaste do conforto, design e qualidade dos teus novos sneakers?"
            className="w-full p-5 rounded-2xl bg-background border border-border/60 text-sm placeholder:text-muted-foreground/40 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:outline-none transition-all duration-300 resize-none"
          />
        </Field>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={isPending || rating === 0}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <>
                Guardar Alterações
                <Save size={18} />
              </>
            )}
          </Button>

          <p className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-widest">
            A tua avaliação será atualizada imediatamente
          </p>
        </div>
      </form>
    </div>
  );
}
