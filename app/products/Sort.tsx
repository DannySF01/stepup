"use client";
import Select from "@/components/ui/select";
import { useFilters } from "@/hooks/useFilters";

export default function Sort() {
  const { setParam, params } = useFilters();
  const sort = params.get("sort");

  const handleSort = (value: string) => {
    if (value === sort) {
      setParam("sort", undefined);
    } else {
      setParam("sort", value);
    }
  };

  const SORT_OPTIONS = [
    { label: "Relevância", value: "" },
    { label: "Preço: mais baixo", value: "asc" },
    { label: "Preço: mais alto", value: "desc" },
  ];

  return (
    <div>
      <Select value={sort ?? ""} options={SORT_OPTIONS} onchange={handleSort} />
    </div>
  );
}
