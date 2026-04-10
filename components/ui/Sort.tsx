"use client";
import Select from "@/components/ui/Select";
import { useFilters } from "@/hooks/useFilters";
import { ListFilter } from "lucide-react";

export default function Sort() {
  const { setParam, params } = useFilters();
  const sort = params.get("sort");

  const handleSort = (value: string) => {
    if (value === "" || value === sort) {
      setParam("sort", undefined);
    } else {
      setParam("sort", value);
    }
  };

  const SORT_OPTIONS = [
    { label: "Ordenar por: Relevância", value: "" },
    { label: "Preço: Menor ao Maior", value: "asc" },
    { label: "Preço: Maior ao Menor", value: "desc" },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
        <ListFilter size={14} />
        Filtro
      </span>

      <div className="min-w-50">
        <Select
          value={sort ?? ""}
          options={SORT_OPTIONS}
          onchange={handleSort}
        />
      </div>
    </div>
  );
}
