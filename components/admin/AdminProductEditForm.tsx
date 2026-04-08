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
  FieldLegend,
} from "../ui/Field";
import { useActionState, useEffect, useState } from "react";
import updateProduct from "@/actions/admin/updateProduct";
import { useToast } from "../ui/Toast";
import { ArrowLeft, Check, Package, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";

interface AdminProductFormEditProps {
  product: ProductWithCategoryAndBrand;
  categories: Category[];
  sizes: Size[];
  brands: Brand[];
  product_sizes: ProductSizeWithSize[];
}
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

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
      });
    }
  }, [state]);

  const ProductImage = ({ url }: { url?: string | null }) => (
    <div className="h-48 pb-3">
      {url ? (
        <img
          src={url}
          alt=""
          className=" h-full aspect-square rounded-md object-cover"
        />
      ) : (
        <Package className="w-full h-full p-3 aspect-square rounded-md object-cover" />
      )}
    </div>
  );

  async function handleRemoveProduct() {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);
      if (error) return console.error(error.message);
      router.push("/admin/products");
    }
  }

  return (
    <div>
      <form action={formAction}>
        <FieldSet>
          <div className="flex items-center bg-card rounded-md border shadow p-6 gap-6">
            <Button variant="outline" type="button" onClick={router.back}>
              <ArrowLeft />
            </Button>
            <div>
              <FieldLegend>Informações do produto</FieldLegend>
              <FieldDescription>
                {"Ultima atualização: " +
                  new Date(product.created_at || "").toLocaleString()}
              </FieldDescription>
            </div>
            <div className="flex gap-3 ml-auto">
              <Button
                size="lg"
                variant="destructive"
                type="button"
                onClick={handleRemoveProduct}
              >
                <Trash2Icon />
                Remover
              </Button>
              <Button size="lg" type="submit" className="w-32">
                <Check />
                {pending ? " Publicando..." : "Publicar"}
              </Button>
            </div>
          </div>
          <FieldGroup>
            <div className="flex gap-6">
              <FieldGroup className="flex-2 bg-card rounded-md border shadow p-6">
                <FieldTitle>Informações gerais</FieldTitle>
                <Field>
                  <FieldLabel htmlFor="name">Nome do produto</FieldLabel>
                  <Input name="name" id="name" defaultValue={product.name} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Descrição</FieldLabel>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    defaultValue={product.description || ""}
                    className="w-full rounded-md border p-3"
                  />
                </Field>
              </FieldGroup>
              <FieldGroup className="flex-1 bg-card rounded-md border shadow p-6">
                <FieldTitle>Media do produto</FieldTitle>
                <Field>
                  <ProductImage url={imageUrl} />
                  <Field>
                    <FieldLabel htmlFor="image_url">URL da imagem</FieldLabel>
                    <Input
                      name="image_url"
                      id="image_url"
                      defaultValue={product.image_url || undefined}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </Field>
                </Field>
              </FieldGroup>
            </div>

            <div className="flex gap-6">
              <FieldGroup className="bg-card rounded-md border shadow p-6">
                <FieldTitle>Informações de preço</FieldTitle>
                <Field>
                  <FieldLabel htmlFor="price">Preço Base</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    onChange={(e) => setPrice(Number(e.target.value) * 100)}
                    defaultValue={(price / 100).toFixed(2)}
                    step="0.01"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sale_price">
                    Preço com desconto
                  </FieldLabel>
                  <Input
                    id="sale_price"
                    name="sale_price"
                    type="number"
                    defaultValue={
                      product?.sale_price
                        ? (product?.sale_price / 100).toFixed(2)
                        : undefined
                    }
                    onChange={(e) => setSalePrice(Number(e.target.value) * 100)}
                    min="0"
                    max={price / 100}
                    step="0.01"
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    key={"on_sale" + product?.on_sale}
                    name="on_sale"
                    id="on_sale"
                    defaultChecked={product?.on_sale || false}
                    disabled={!salePrice}
                    checked={salePrice ? undefined : false}
                  />
                  <FieldLabel htmlFor="on_sale">Em promoção?</FieldLabel>
                </Field>
              </FieldGroup>
              <FieldGroup className="bg-card rounded-md border shadow p-6">
                <FieldTitle>Categoria e Marca</FieldTitle>
                <Field>
                  <FieldLabel htmlFor="category">Categoria</FieldLabel>
                  <Select
                    name="category"
                    value={category || ""}
                    options={categoryOptions}
                    onchange={(value) => setCategory(value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="brand">Marca</FieldLabel>
                  <Select
                    name="brand"
                    value={brand || ""}
                    options={brandOptions}
                    onchange={(value) => setBrand(value)}
                  />
                </Field>
              </FieldGroup>
            </div>
            <div className="flex gap-6">
              <FieldGroup className="bg-card rounded-md border shadow p-6">
                <FieldTitle>Tamanhos disponiveis</FieldTitle>

                <Field>
                  <FieldLabel htmlFor="sizes">Selecione os tamanhos</FieldLabel>
                  <div id="sizes" className="flex gap-3">
                    {sizes.map((size: Size) => (
                      <Button
                        key={size.id}
                        size="lg"
                        variant="outline"
                        type="button"
                        className={
                          product_sizes.some((s) => s.size_id === size.id)
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }
                        onClick={() => addSize(size.id)}
                      >
                        {size.value}
                      </Button>
                    ))}
                  </div>
                </Field>
              </FieldGroup>

              <FieldGroup className="bg-card rounded-md border shadow p-6">
                <FieldTitle>Inventário </FieldTitle>
                <Field className="grid grid-cols-5 gap-6">
                  {product_sizes.map((product_size: ProductSizeWithSize) => (
                    <Field key={product_size.id} orientation="horizontal">
                      <FieldLabel htmlFor={product_size.id}>
                        {product_size.sizes?.value}
                      </FieldLabel>
                      <Input
                        id={product_size.id}
                        type="number"
                        name={
                          "size_" + product_size.id + "_" + product_size.size_id
                        }
                        defaultValue={product_size.stock}
                        min="0"
                        max="99"
                      />
                    </Field>
                  ))}
                </Field>
                {product_sizes.length === 0 && (
                  <Field className="text-muted-foreground text-sm">
                    Nenhum tamanho disponivel
                  </Field>
                )}
              </FieldGroup>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
