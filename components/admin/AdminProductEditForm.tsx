"use client";
import {
  Brand,
  Category,
  ProductSizeWithSize,
  ProductWithCategoryAndBrand,
  Size,
} from "@/lib/types/products.types";
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
import updateProduct from "@/actions/admin/updateProduct";
import { useToast } from "../ui/Toast";
import {
  ArrowLeft,
  Check,
  Package,
  Trash2Icon,
  Info,
  Image as ImageIcon,
  Tag,
  History,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";

type AdminProductFormEditProps = {
  product: ProductWithCategoryAndBrand;
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  product_sizes: ProductSizeWithSize[];
};

export default function AdminProductEditForm({
  product,
  categories,
  brands,
  sizes,
  product_sizes,
}: AdminProductFormEditProps) {
  const [category, setCategory] = useState(product.categories?.id);
  const [brand, setBrand] = useState(product.brands?.id);
  const [imageUrl, setImageUrl] = useState(product.image_url);
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.sale_price);

  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  const boundAction = updateProduct.bind(null, product.id);
  const [state, formAction, pending] = useActionState(boundAction, null);

  useEffect(() => {
    if (state?.message) toast({ description: state.message });
  }, [state, toast]);

  async function handleRemoveProduct() {
    if (
      window.confirm(
        "Tem certeza que deseja excluir permanentemente este produto?",
      )
    ) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);
      if (error)
        return toast({
          description: "Erro ao remover: " + error.message,
          variant: "error",
        });
      router.push("/admin/products");
    }
  }

  async function addSize(sizeId: string) {
    const productSizeId = product_sizes.find((p) => p.size_id === sizeId)?.id;
    if (productSizeId) {
      console.log(productSizeId);
      if (window.confirm("Tem certeza que deseja excluir?")) {
        const { error } = await supabase
          .from("product_sizes")
          .delete()
          .eq("id", productSizeId);
        if (error) return console.error(error.message);
        router.refresh();
      }
      return;
    }
    const { error } = await supabase.from("product_sizes").insert({
      product_id: product.id,
      size_id: sizeId,
    });

    if (error) return console.error(error.message);
    router.refresh();
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="rounded-xl"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Editar Produto
              </h1>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                <History size={12} />
                <span>
                  Atualizado em{" "}
                  {new Date(product.created_at || "").toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="destructive"
              type="button"
              onClick={handleRemoveProduct}
              className="rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border-none shadow-none"
            >
              <Trash2Icon size={18} />
              <span className="hidden sm:inline">Remover</span>
            </Button>

            <Button
              size="lg"
              type="submit"
              disabled={pending}
              className="rounded-xl shadow-lg shadow-primary/20 px-8 font-bold gap-2"
            >
              {pending ? (
                "A guardar..."
              ) : (
                <>
                  <Check size={18} strokeWidth={3} /> Guardar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <FieldSet className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                className="text-xs font-bold uppercase text-muted-foreground"
              >
                Nome do Produto
              </FieldLabel>
              <Input
                name="name"
                id="name"
                defaultValue={product.name}
                className="bg-background rounded-xl"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="description"
                className="text-xs font-bold uppercase text-muted-foreground"
              >
                Descrição
              </FieldLabel>
              <textarea
                name="description"
                id="description"
                rows={5}
                defaultValue={product.description || ""}
                className="w-full rounded-xl border border-border/60 p-4 bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={18} className="text-primary" />
              <FieldTitle className="text-lg font-bold">
                Informações de Preço
              </FieldTitle>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Preço Base (€)</FieldLabel>
                <Input
                  type="number"
                  defaultValue={(product.price / 100).toFixed(2)}
                  onChange={(e) => setPrice(Number(e.target.value) * 100)}
                  className="bg-background rounded-xl"
                  step="0.01"
                />
              </Field>
              <Field>
                <FieldLabel>Com Desconto (€)</FieldLabel>
                <Input
                  type="number"
                  defaultValue={
                    product.sale_price
                      ? (product.sale_price / 100).toFixed(2)
                      : ""
                  }
                  onChange={(e) => setSalePrice(Number(e.target.value) * 100)}
                  className="bg-background rounded-xl"
                  step="0.01"
                />
              </Field>
            </div>
          </FieldGroup>

          <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-primary" />
                <FieldTitle className="text-lg font-bold">
                  Tamanhos & Stock
                </FieldTitle>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter bg-muted px-2 py-1 rounded-md">
                {product_sizes.length} Ativos
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {sizes.map((s) => {
                const isSelected = product_sizes.some(
                  (ps) => ps.size_id === s.id,
                );

                return (
                  <div
                    key={s.id}
                    className={`
                              relative flex flex-col p-3 rounded-xl border transition-all duration-300 group
                              ${
                                isSelected
                                  ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                                  : "border-border/60 bg-background hover:border-primary/30 hover:shadow-md"
                              }
                            `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-bold tracking-tight ${isSelected ? "text-primary" : "text-foreground/70"}`}
                      >
                        {s.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => addSize(s.id)}
                        className={`
                                  cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200
                                  ${
                                    isSelected
                                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                                      : "bg-muted text-muted-foreground hover:bg-primary hover:text-white"
                                  }
                                `}
                      >
                        {isSelected ? (
                          <Check size={12} strokeWidth={4} />
                        ) : (
                          <Plus size={14} />
                        )}
                      </button>
                    </div>

                    {isSelected && (
                      <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                        <div className="relative mt-1 pt-2">
                          <input
                            type="number"
                            min={0}
                            placeholder="Stock"
                            defaultValue={
                              product_sizes.find((ps) => ps.size_id === s.id)
                                ?.stock || 0
                            }
                            className="w-full p-2 bg-transparent text-xs font-bold focus:outline-none placeholder:text-primary/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute right-0 bottom-0 text-[8px] font-black uppercase text-primary/40 tracking-tighter">
                            QTY
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package
                  size={48}
                  className="text-muted-foreground/40"
                  strokeWidth={1}
                />
              )}
            </div>

            <Field>
              <FieldLabel className="text-xs font-bold uppercase text-muted-foreground">
                URL da Imagem
              </FieldLabel>
              <Input
                name="image_url"
                defaultValue={product.image_url || ""}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-background rounded-xl"
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-6">
            <FieldTitle className="text-lg font-bold">Organização</FieldTitle>
            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <Select
                name="category"
                value={category || ""}
                options={categoryOptions}
                onchange={setCategory}
              />
            </Field>
            <Field>
              <FieldLabel>Marca</FieldLabel>
              <Select
                name="brand"
                value={brand || ""}
                options={brandOptions}
                onchange={setBrand}
              />
            </Field>
          </FieldGroup>
        </div>
      </FieldSet>
    </form>
  );
}
