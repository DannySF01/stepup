"use client";
import { ActionState, addReview } from "@/actions/addReview";
import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import Rating from "@/components/ui/Rating";
import { useToast } from "@/components/ui/Toast";
import { useActionState, useEffect, useState } from "react";
import { MessageSquarePlus, SendHorizontal } from "lucide-react";

interface ProductReviewFormProps {
  productId: string;
}

const initialState: ActionState = { success: false, message: "" };

export default function ProductReviewForm({
  productId,
}: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const boundAction = addReview.bind(null, productId, rating);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  useEffect(() => {
    if (!state?.message) return;
    toast({
      description: state.message,
    });
  }, [state, toast]);

  return (
    <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <MessageSquarePlus size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            Nova Avaliação
          </h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Partilha a tua experiência
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-8">
        <Field className="space-y-4">
          <FieldLabel className="text-xs font-black uppercase tracking-widest text-foreground/70">
            A tua classificação *
          </FieldLabel>
          <div className="bg-muted/30 p-6 rounded-2xl border border-border/40 flex justify-center transition-all focus-within:border-primary/40 focus-within:bg-primary/5">
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
            className="text-xs font-black uppercase tracking-widest text-foreground/70"
          >
            A tua opinião *
          </FieldLabel>
          <textarea
            required
            id="review"
            name="review"
            rows={6}
            placeholder="O que achaste do conforto, design e qualidade dos teus novos sneakers?"
            className={`
              w-full p-5 rounded-2xl bg-background border border-border/60 text-sm 
              placeholder:text-muted-foreground/40 font-medium
              focus:ring-4 focus:ring-primary/10 focus:border-primary/40 focus:outline-none 
              transition-all duration-300 resize-none
            `}
          />
        </Field>

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isPending || rating === 0}
            className={`
              w-full sm:w-auto min-w-[240px] h-14 rounded-2xl font-black uppercase tracking-widest gap-3 
              shadow-xl shadow-primary/20 transition-all active:scale-95
              ${isPending ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isPending ? (
              <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <>
                Publicar agora
                <SendHorizontal size={18} />
              </>
            )}
          </Button>
          {rating === 0 && (
            <p className="mt-4 text-[10px] font-bold text-destructive uppercase tracking-tighter animate-pulse">
              * Seleciona uma classificação por estrelas para continuar
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
