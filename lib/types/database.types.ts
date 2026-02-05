export type Product = Database["public"]["Tables"]["products"]["Row"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type ProductSize = Database["public"]["Tables"]["product_sizes"]["Row"];

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string;
          category_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url: string;
          category_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url: string;
          category_id?: string | null;
          created_at?: string;
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
    };
  };
}
