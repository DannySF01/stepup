import { Database } from "./database.types";
import { ProductWithCategory } from "./products.types";

export type Favorite = Database["public"]["Tables"]["favorites"]["Row"];

export type FavoriteWithProduct = Favorite & {
  products: ProductWithCategory | null;
};
