import { Category, Database } from "./database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export type ProductWithCategory = Product & { categories: Category | null };
