import useDebounce from "@/hooks/useDebounce";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/lib/types/products.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [query, cancel] = useDebounce(search, 500);

  const router = useRouter();
  const supabase = createClient();

  async function searchFallback(): Promise<{ data: Product[] | null }> {
    let queryBuilder = supabase.from("products").select("*");

    if (query.length < 3) {
      // Para termos curtos, ilike funciona melhor
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    } else {
      // Para pesquisas complexas, usar textSearch
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
  }

  function handleClickSearch() {
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
    <div className="max-w-sm min-w-30">
      <div className="relative mt-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm border rounded-md pr-12 pl-3 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow focus:border-accent hover:border-accent"
          placeholder="Pesquisar..."
        />

        <button
          className="absolute right-1 top-1 rounded bg-primary p-1.5 border border-transparent text-center text-sm text-primary-foreground transition-all shadow-sm hover:shadow hover:bg-primary/80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleClickSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      {results.length > 0 && (
        <div className="absolute z-99 border rounded-md mt-2 p-2 bg-background">
          {results.map((result) => (
            <div
              className="p-1.5 text-sm cursor-pointer hover:bg-muted rounded-md"
              key={result.id}
            >
              <Link
                onClick={handleClickResult}
                href={`/products/${result.id}`}
                className="text-ellipsis whitespace-nowrap overflow-hidden"
              >
                {result.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
