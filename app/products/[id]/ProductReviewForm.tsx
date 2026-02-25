"use client";
import { ActionState, addComment } from "@/actions/addComment";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import Rating from "@/components/ui/rating";
import { useToast } from "@/components/ui/toast";
import { useActionState, useEffect, useState } from "react";

interface ProductReviewFormProps {
  productId: string;
}

const initialState: ActionState = { success: false, message: "" };

export default function ProductReviewForm({
  productId,
}: ProductReviewFormProps) {
  const [rating, setRating] = useState(0);

  function onClick(rating: number) {
    setRating(rating);
  }

  const boundAction = addComment.bind(null, productId, rating);

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  const { toast } = useToast();

  useEffect(() => {
    if (!state?.message) return;

    toast({
      title: state.success ? "Sucesso" : "Erro",
      description: state.message,
    });
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 px-6">
      <Field orientation="vertical">
        <FieldLabel htmlFor="review">Escreva uma avaliação</FieldLabel>
        <textarea
          required
          id="review"
          name="review"
          rows={4}
          placeholder="Escreva sua avaliação aqui"
          className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </Field>
      <Field orientation="vertical">
        <Rating size={6} rating={rating} interactable onClick={onClick} />
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer"
      >
        {isPending ? "A enviar avaliação..." : "Enviar avaliação"}
      </Button>
    </form>
  );
}
