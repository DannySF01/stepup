"use client";
import { ActionState, editReview } from "@/actions/editReview";
import { Button } from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import Rating from "@/components/ui/Rating";
import { useToast } from "@/components/ui/Toast";
import { Comment } from "@/lib/types/products.types";
import { useActionState, useEffect, useState } from "react";

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

  function onClick(rating: number) {
    setRating(rating);
  }

  const boundAction = editReview.bind(null, productId, comment.id, rating);

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  const { toast } = useToast();

  useEffect(() => {
    if (!state?.message) return;

    toast({
      variant: "error",
      description: state.message,
    });
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <Field>
        <FieldLabel htmlFor="rating">Avalie o produto *</FieldLabel>
        <Rating size={9} rating={rating} interactable onClick={onClick} />
      </Field>
      <Field>
        <FieldLabel htmlFor="review">Escreva uma avaliação *</FieldLabel>
        <textarea
          required
          id="review"
          name="review"
          rows={8}
          defaultValue={comment.comment}
          placeholder="Escreva sua avaliação aqui"
          className="p-3 w-full rounded-md shadow-sm sm:text-sm border"
        />
      </Field>
      <Button type="submit" size="lg" className="  min-w-50">
        Publicar avaliação
      </Button>
    </form>
  );
}
