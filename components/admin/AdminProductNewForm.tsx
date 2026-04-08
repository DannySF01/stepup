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
  FieldLegend,
} from "../ui/Field";
import { useActionState, useEffect, useState } from "react";
import { useToast } from "../ui/Toast";
import { ArrowLeft, Check, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import Checkbox from "../ui/Checkbox";
import createProduct from "@/actions/admin/createProduct";

interface AdminProductNewFormProps {
  categories: Category[];
  sizes: Size[];
  brands: Brand[];
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

  const supabase = createClient();

  const router = useRouter();
  const { toast } = useToast();

  const [state, formAction, pending] = useActionState(createProduct, null);

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
              <FieldDescription> </FieldDescription>
            </div>
            <div className="flex gap-3 ml-auto">
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
                  <Input name="name" id="name" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Descrição</FieldLabel>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
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
                    onChange={(e) => setSalePrice(Number(e.target.value) * 100)}
                    min="0"
                    max={price / 100}
                    step="0.01"
                  />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    key="on_sale" //ver se dá bug de escolha o checkbox
                    name="on_sale"
                    id="on_sale"
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
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
