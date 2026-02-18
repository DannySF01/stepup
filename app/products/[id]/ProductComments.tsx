"use client";
import { Comment } from "@/lib/types/database.types";

export default function ProductComments({ commments }: any) {
  return (
    <div className="pb-6">
      <h3 className="pb-4 font-semibold border-b">
        Comentarios ({commments?.length})
      </h3>
      <div className="flex flex-col">
        {commments?.length === 0 && (
          <p className="py-6 text-muted-foreground">Nenhum comentario ainda</p>
        )}

        {commments.map((comment: Comment) => (
          <div key={comment.id} className="py-6 border-b">
            <div className="flex pb-2 gap-2 items-center">
              <h4 className="font-semibold">{comment.user_id}</h4>
              <p className="text-muted-foreground text-sm">
                {comment.created_at}
              </p>
            </div>

            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
