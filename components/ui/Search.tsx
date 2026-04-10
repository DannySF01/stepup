"use client";
import useDebounce from "@/hooks/useDebounce";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types/products.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon, X } from "lucide-react";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [query, cancel] = useDebounce(search, 500);

  const router = useRouter();
  const supabase = createClient();

  async function searchFallback(): Promise<{ data: Product[] | null }> {
    let queryBuilder = supabase.from("products").select("*");

    if (query.length < 3) {
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    } else {
      queryBuilder = queryBuilder.textSearch("name", query, {
        config: "simple",
        type: "websearch",
      });
    }

    const { data } = await queryBuilder.limit(5);
    return { data };
  }

  useEffect(() => {
    async function search() {
      if (!query) return setResults([]);
      const { data } = await searchFallback();
      setResults(data || []);
    }
    search();
  }, [query]);

  function handleClickResult() {
    setResults([]);
    setSearch("");
  }

  function handleClickSearch() {
    if (!search) return;
    setResults([]);
    router.push(`/products?q=${search}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      cancel();
      handleClickSearch();
    }
  }

  return (
    <div className="relative w-full max-w-md group">
      <div className="relative flex items-center">
        <SearchIcon
          size={18}
          className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-muted/40 text-sm font-medium border border-border/40 rounded-2xl pl-11 pr-12 py-2.5 transition-all duration-300 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground/60"
          placeholder="Pesquisar sneakers..."
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              setResults([]);
            }}
            className="absolute right-12 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        )}

        <button
          className="absolute right-2 h-8 w-8 flex items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          type="button"
          onClick={handleClickSearch}
        >
          <SearchIcon size={14} strokeWidth={3} />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 p-2 bg-background/95 backdrop-blur-md border border-border/40 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-3 py-1.5 mb-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
            Sugestões
          </div>
          {results.map((result) => (
            <Link
              key={result.id}
              onClick={handleClickResult}
              href={`/products/${result.id}`}
              className="flex items-center gap-3 p-2 text-sm font-semibold rounded-xl hover:bg-primary/5 hover:text-primary transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted overflow-hidden shrink-0">
                {result.image_url && (
                  <img
                    src={result.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="truncate">{result.name}</span>
            </Link>
          ))}
          <button
            onClick={handleClickSearch}
            className="w-full mt-1 p-2 text-xs font-bold text-center text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
          >
            Ver todos os resultados
          </button>
        </div>
      )}
    </div>
  );
}
