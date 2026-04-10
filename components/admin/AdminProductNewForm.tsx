"use client";
import { Brand, Category, Size } from "@/lib/types/products.types";
import { Button } from "../ui/Button";
import {
  Field,
  FieldLabel,
  FieldSet,
  FieldGroup,
  FieldTitle,
  FieldDescription,
} from "../ui/Field";
import { useActionState, useEffect, useState } from "react";
import { useToast } from "../ui/Toast";
import {
  ArrowLeft,
  Check,
  Package,
  Image as ImageIcon,
  Info,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";
import createProduct from "@/actions/admin/createProduct";

interface AdminProductNewFormProps {
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
}

export default function AdminProductNewForm({
  categories,
  brands,
  sizes,
}: AdminProductNewFormProps) {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction, pending] = useActionState(createProduct, null);

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  const categoryOptions = [
    {
      value: "",
      label: "Selecione uma categoria",
    },
    ...categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const brandOptions = [
    {
      value: "",
      label: "Selecione uma marca",
    },
    ...brands?.map((brand) => ({
      value: brand.id,
      label: brand.name,
    })),
  ];

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-5xl mx-auto space-y-8 pb-20 antialiased"
    >
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border-border/60 hover:bg-muted"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Novo Produto
              </h1>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Criar catálogo
              </p>
            </div>
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={pending}
            className="rounded-xl shadow-lg shadow-primary/20 px-8 font-bold gap-2 transition-all active:scale-95"
          >
            {pending ? (
              <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <Check size={18} strokeWidth={3} />
            )}
            {pending ? "Publicando..." : "Publicar Produto"}
          </Button>
        </div>
      </div>

      <FieldSet className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Info size={18} className="text-primary" />
                <FieldTitle className="text-lg font-bold">
                  Informações Gerais
                </FieldTitle>
              </div>

              <Field>
                <FieldLabel
                  htmlFor="name"
                  className="text-xs font-bold uppercase text-muted-foreground tracking-wide"
                >
                  Nome do produto
                </FieldLabel>
                <Input
                  name="name"
                  id="name"
                  placeholder="Ex: Air Jordan 1 Retro"
                  className="bg-background rounded-xl border-border/60"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-xs font-bold uppercase text-muted-foreground tracking-wide"
                >
                  Descrição
                </FieldLabel>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  placeholder="Descreva os detalhes e materiais do produto..."
                  className="w-full rounded-xl border border-border/60 p-4 bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-sm"
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={18} className="text-primary" />
                <FieldTitle className="text-lg font-bold">
                  Informações de Preços
                </FieldTitle>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="price">Preço Base (€)</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setPrice(Number(e.target.value) * 100)}
                    className="bg-background rounded-xl"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sale_price">Com Desconto (€)</FieldLabel>
                  <Input
                    id="sale_price"
                    name="sale_price"
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setSalePrice(Number(e.target.value) * 100)}
                    className="bg-background rounded-xl"
                  />
                </Field>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/40">
                <Checkbox name="on_sale" id="on_sale" disabled={!salePrice} />
                <FieldLabel
                  htmlFor="on_sale"
                  className="font-semibold text-sm cursor-pointer"
                >
                  Ativar selo de promoção no site
                </FieldLabel>
              </div>
            </FieldGroup>
          </div>

          <div className="space-y-8">
            <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon size={18} className="text-primary" />
                <FieldTitle className="text-lg font-bold">Média</FieldTitle>
              </div>

              <div className="aspect-square w-full bg-muted/40 rounded-2xl border border-dashed border-border/80 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover transition-all hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                    <Package size={48} strokeWidth={1} />
                    <span className="text-xs font-medium">Sem prévia</span>
                  </div>
                )}
              </div>

              <Field>
                <FieldLabel
                  htmlFor="image_url"
                  className="text-xs font-bold uppercase text-muted-foreground tracking-wide"
                >
                  URL da Imagem
                </FieldLabel>
                <Input
                  name="image_url"
                  id="image_url"
                  placeholder="https://..."
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-background rounded-xl"
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
              <FieldTitle className="text-lg font-bold">Organização</FieldTitle>

              <Field>
                <FieldLabel htmlFor="category">Categoria</FieldLabel>
                <Select
                  name="category"
                  value={category}
                  options={categoryOptions}
                  onchange={setCategory}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="brand">Marca</FieldLabel>
                <Select
                  name="brand"
                  value={brand}
                  options={brandOptions}
                  onchange={setBrand}
                />
              </Field>
            </FieldGroup>
          </div>
        </div>
      </FieldSet>
    </form>
  );
}
