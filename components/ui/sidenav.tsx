"use client";
import Checkbox from "@/components/ui/Checkbox";
import { Field, FieldLegend } from "@/components/ui/Field";
import { Label } from "@/components/ui/Label";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { ChevronDownIcon } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { Brand, Category } from "@/lib/types/products.types";

export default function Sidenav({
  brands,
  categories,
}: {
  brands: Brand[];
  categories: Category[];
}) {
  const {
    isActive,
    toggleMultiParam,
    setParam,
    setArrayParams,
    clearAll,
    params,
  } = useFilters();

  const GENDERS = [
    { label: "Homem", value: "men" },
    { label: "Mulher", value: "women" },
    { label: "Unissexo", value: "unisex" },
  ];

  const PRICE_RANGES = [
    { label: "Até 50€", min: 0, max: 50 },
    { label: "50€ – 100€", min: 50, max: 100 },
    { label: "100€ – 150€", min: 100, max: 150 },
    { label: "+150€", min: 150 },
  ];

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
      <Collapsible defaultOpen={defaultOpen} className="py-4 border-t">
        <CollapsibleTrigger className="flex items-center gap-2 group w-full">
          <FieldLegend variant="label">
            <Label>{title}</Label>
          </FieldLegend>
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  function isPriceActive(range: { min: number; max?: number }) {
    const min = params.get("min");
    const max = params.get("max");

    if (!min) return false;

    if (String(range.min) !== min) return false;

    if (!range.max) return !max;
    return String(range.max) === max;
  }

  return (
    <div className="flex-1">
      <Collapse defaultOpen title="Genero">
        <CollapsibleContent className="flex flex-col gap-2">
          {GENDERS.map((g) => (
            <Field key={g.value} orientation="horizontal">
              <Checkbox
                id={g.value}
                checked={isActive("gender", g.value)}
                onCheckedChange={() => toggleMultiParam("gender", g.value)}
              />
              <Label htmlFor={g.value}>{g.label}</Label>
            </Field>
          ))}
        </CollapsibleContent>
      </Collapse>
      <Collapse defaultOpen title="Preço">
        <CollapsibleContent className="flex flex-col gap-2">
          {PRICE_RANGES.map((range) => (
            <Field key={range.label} orientation="horizontal">
              <Checkbox
                id={range.label}
                checked={isActive("min", range.min?.toString())}
                onCheckedChange={() => {
                  if (isPriceActive(range)) {
                    setArrayParams({ min: undefined, max: undefined });
                  } else {
                    setArrayParams({
                      min: range.min?.toString(),
                      max: range.max?.toString(),
                    });
                  }
                }}
              />
              <Label htmlFor={range.label}>{range.label}</Label>
            </Field>
          ))}
        </CollapsibleContent>
      </Collapse>
      <Collapse defaultOpen title="Marcas">
        <CollapsibleContent className="flex flex-col gap-2">
          {brands.map((brand) => (
            <Field key={brand.slug} orientation="horizontal">
              <Checkbox
                id={brand.slug}
                checked={isActive("brand", brand.slug)}
                onCheckedChange={() => toggleMultiParam("brand", brand.slug)}
              />
              <Label htmlFor={brand.slug}>{brand.name}</Label>
            </Field>
          ))}
        </CollapsibleContent>
      </Collapse>
      <Collapse defaultOpen title="Categorias">
        <CollapsibleContent className="flex flex-col gap-2">
          {categories.map((category) => (
            <Field key={category.slug} orientation="horizontal">
              <Checkbox
                id={category.slug}
                checked={isActive("category", category.slug)}
                onCheckedChange={() => setParam("category", category.slug)}
              />
              <Label htmlFor={category.slug}>{category.name}</Label>
            </Field>
          ))}
        </CollapsibleContent>
      </Collapse>
    </div>
  );
}
