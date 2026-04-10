"use client";
import Checkbox from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Label } from "@/components/ui/Label";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { ChevronDownIcon, X } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { Brand, Category, Size } from "@/lib/types/products.types";

export default function Sidenav({
  brands,
  categories,
  sizes,
}: {
  brands: Brand[];
  categories: Category[];
  sizes: Size[];
}) {
  const {
    isActive,
    toggleMultiParam,
    setParam,
    setArrayParams,
    clearAll,
    params,
  } = useFilters();

  const Collapse = ({
    title,
    defaultOpen = false,
    children,
  }: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <Collapsible
        defaultOpen={defaultOpen}
        className="py-5 border-b border-border/40 group"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between group">
          <span className="text-xs font-black uppercase tracking-widest text-foreground/80 group-hover:text-primary transition-colors">
            {title}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="w-full lg:w-64 space-y-2">
      {/* Clear All Header */}
      <div className="flex items-center justify-between pb-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Filtros
        </span>
        <button
          onClick={clearAll}
          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
        >
          Limpar <X size={10} />
        </button>
      </div>

      <Collapse defaultOpen title="Gênero">
        <div className="space-y-3">
          {[
            { label: "Homem", value: "men" },
            { label: "Mulher", value: "women" },
            { label: "Unissexo", value: "unisex" },
          ].map((g) => (
            <Field
              key={g.value}
              orientation="horizontal"
              className="gap-3 group cursor-pointer"
            >
              <Checkbox
                id={g.value}
                checked={isActive("gender", g.value)}
                onCheckedChange={() => toggleMultiParam("gender", g.value)}
                className="rounded-md border-border/60 data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor={g.value}
                className="text-sm font-medium text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors"
              >
                {g.label}
              </Label>
            </Field>
          ))}
        </div>
      </Collapse>

      <Collapse defaultOpen title="Marcas">
        <div className="space-y-3 max-h-48 pr-2 ">
          {brands.map((brand) => (
            <Field
              key={brand.slug}
              orientation="horizontal"
              className="gap-3 group cursor-pointer"
            >
              <Checkbox
                id={brand.slug}
                checked={isActive("brand", brand.slug)}
                onCheckedChange={() => toggleMultiParam("brand", brand.slug)}
              />
              <Label
                htmlFor={brand.slug}
                className="text-sm font-medium text-muted-foreground group-hover:text-foreground cursor-pointer"
              >
                {brand.name}
              </Label>
            </Field>
          ))}
        </div>
      </Collapse>

      <Collapse defaultOpen title="Tamanhos">
        <div className="grid grid-cols-4 gap-2">
          {sizes
            .sort((a, b) => a.value - b.value)
            .map((size) => {
              const active = isActive("sizes", size.value.toString());
              return (
                <button
                  key={size.id}
                  onClick={() =>
                    toggleMultiParam("sizes", size.value.toString())
                  }
                  className={`
                  h-9 rounded-lg border text-xs font-bold transition-all duration-200
                  ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-background border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }
                `}
                >
                  {size.value}
                </button>
              );
            })}
        </div>
      </Collapse>

      <Collapse defaultOpen title="Preço">
        <div className="space-y-3">
          {[
            { label: "Até 50€", min: 0, max: 50 },
            { label: "50€ – 100€", min: 50, max: 100 },
            { label: "100€ – 150€", min: 100, max: 150 },
            { label: "+150€", min: 150 },
          ].map((range) => {
            const active = params.get("min") === range.min?.toString();
            return (
              <Field
                key={range.label}
                orientation="horizontal"
                className="gap-3 group cursor-pointer"
              >
                <Checkbox
                  id={range.label}
                  checked={active}
                  onCheckedChange={() => {
                    active
                      ? setArrayParams({ min: undefined, max: undefined })
                      : setArrayParams({
                          min: range.min?.toString(),
                          max: range.max?.toString(),
                        });
                  }}
                />
                <Label
                  htmlFor={range.label}
                  className="text-sm font-medium text-muted-foreground group-hover:text-foreground cursor-pointer"
                >
                  {range.label}
                </Label>
              </Field>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
}
