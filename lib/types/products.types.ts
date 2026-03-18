import { Database } from "./database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type CommentWithProfile = Comment & {
  profiles: Database["public"]["Tables"]["profiles"]["Row"];
};

export type ProductWithCategory = Product & { categories: Category | null };

export type ProductWithCategoryAndBrand = ProductWithCategory & {
  brands: Brand | null;
};

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type Brand = Database["public"]["Tables"]["brands"]["Row"];

export type ProductWithEffectivePrice =
  Database["public"]["Views"]["products_with_effective_price"]["Row"];

export type ProductSize = Database["public"]["Tables"]["product_sizes"]["Row"];

export type Size = Database["public"]["Tables"]["sizes"]["Row"];

export type ProductSizeWithSize = ProductSize & { sizes: Size | null };

export type ProductWithSizes = Product & {
  product_sizes: ProductSizeWithSize[];
};
