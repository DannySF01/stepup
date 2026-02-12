export type Product = Database["public"]["Tables"]["products"]["Row"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type ProductSize = Database["public"]["Tables"]["product_sizes"]["Row"];

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type Brand = Database["public"]["Tables"]["brands"]["Row"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          on_sale: boolean;
          sale_price: number | null;
          image_url: string;
          category_id: string | null;
          created_at: string;
          is_featured: boolean;
          brand_id: string | null;
          gender: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          on_sale: boolean;
          sale_price: number | null;
          image_url: string;
          category_id?: string | null;
          created_at?: string;
          is_featured?: boolean;
          brand_id: string | null;
          gender: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          on_sale: boolean;
          sale_price: number | null;
          image_url: string;
          category_id?: string | null;
          created_at?: string;
          is_featured?: boolean;
          brand_id: string | null;
          gender: string | null;
        };
      };
      product_sizes: {
        Row: {
          id: string;
          product_id: string;
          size_id: string;
          stock: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          size_id: string;
          stock: number;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          comment: string;
          created_at?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          avatar_url?: string | null;
          role: string;
          created_at?: string;
        };
      };
    };
  };
}
