"use client";
import {
  Brand,
  Category,
  ProductSizeWithSize,
  ProductWithCategoryAndBrand,
} from "@/lib/types/products.types";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/Field";
import { Input } from "../ui/Input";
import { formatPrice } from "@/lib/utils/formatPrice";
import Select from "../ui/Select";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import updateProduct from "@/actions/admin/updateProduct";
import { useToast } from "../ui/Toast";
import { Package } from "lucide-react";

interface AdminProductFormProps {
  product: ProductWithCategoryAndBrand;
  categories: Category[];
  brands: Brand[];
  product_sizes: ProductSizeWithSize[];
}
export default function AdminProductForm({
  product,
  categories,
  brands,
  product_sizes,
}: AdminProductFormProps) {
  const [category, setCategory] = useState(product.categories?.id);
  const [brand, setBrand] = useState(product.brands?.id);
  const [imageUrl, setImageUrl] = useState(product.image_url);

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

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
      });
    }
  }, [state]);

  const ProductImage = ({ url }: { url?: string | null }) => (
    <div className="w-32 h-32">
      {url ? (
        <img
          src={url}
          alt=""
          className="aspect-square rounded-md object-cover"
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
          <FieldLegend>Detalhes do produto</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <ProductImage url={imageUrl} />
              <Field>
                <FieldLabel htmlFor="image_url">URL da imagem</FieldLabel>
                <Input
                  name="image_url"
                  id="image_url"
                  defaultValue={product.image_url || ""}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Field>
            </Field>

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

            <Field>
              <FieldLabel htmlFor="price">Preço</FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={product.price}
                step="0.01"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="stock">Stock dos tamanhos</FieldLabel>
              {product_sizes.map(
                (product_size: ProductSizeWithSize) => (
                  console.log(product_size),
                  (
                    <Field
                      key={product_size.id}
                      orientation="horizontal"
                      className="flex items-center"
                    >
                      <FieldLabel htmlFor={product_size.id}>
                        {product_size.sizes?.value}
                      </FieldLabel>
                      <Input
                        id={product_size.id}
                        type="number"
                        defaultValue={product_size.stock}
                        min="0"
                        max="99"
                      />
                    </Field>
                  )
                ),
              )}
              {product_sizes.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum tamanho disponivel
                </p>
              )}
            </Field>
          </FieldGroup>
          <Button type="submit" className="w-32">
            Guardar
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
