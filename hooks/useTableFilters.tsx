import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export function useTableFilters(initialSearch: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // Mudar de página
  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push("?" + params.toString(), { scroll: false });
  };

  // Atualizar a busca na URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("q", debouncedSearch);
    } else {
      params.delete("q");
    }

    params.set("page", "1"); // Reset para página 1 ao pesquisar
    router.push("?" + params.toString(), { scroll: false });
  }, [debouncedSearch]);

  return { searchTerm, setSearchTerm, setPage };
}
