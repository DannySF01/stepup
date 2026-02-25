import { Category, Database } from "./database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type CommentWithProfile = Comment & {
  profiles: Database["public"]["Tables"]["profiles"]["Row"];
};

export type ProductSize = Database["public"]["Tables"]["product_sizes"]["Row"];

export type ProductWithCategory = Product & { categories: Category | null };
