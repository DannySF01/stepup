import { ProductWithCategory } from "./products.types";

export type Favorite = {
  id: string;
  product_id: string | null;
  user_id: string | null;
  created_at: string | null;
};

export type FavoriteWithProduct = Favorite & {
  products: ProductWithCategory | null;
};
