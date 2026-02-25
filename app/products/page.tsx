import { createClient } from "@/lib/supabase/client";
import Sort from "../../components/ui/Sort";
import Card from "@/components/ui/Card";
import Sidenav from "@/components/ui/Sidenav";
import { ProductWithEffectivePrice } from "@/lib/types/products.types";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    sale: boolean;
    sort: string;
    category: string;
    gender: string;
    brand: string;
    min: string;
    max: string;
  }>;
}) {
  const supabase = createClient();

  const params = await searchParams;

  //created a supabase view to calculate the effective price
  let query = supabase
    .from("products_with_effective_price")
    .select("*,  brands!inner(slug), categories!inner(slug)");

  if (params.sale) {
    query = query.eq("on_sale", true);
  }

  if (params.category) {
    query = query.eq("categories.slug", params.category);
  }

  if (params.gender) {
    const selectedGenders = params.gender.split(",");
    query = query.in("gender", selectedGenders);
  }

  if (params.brand) {
    const selectedBrands = params.brand.split(",");
    query = query.in("brands.slug", selectedBrands);
  }

  if (params.min || params.max) {
    if (!params.min) params.min = "0";
    if (!params.max) params.max = "9999";
    query = query
      .gte("effective_price", params.min)
      .lte("effective_price", params.max);
  }

  switch (params.sort) {
    case "asc":
      query = query.order("effective_price", { ascending: true });
      break;
    case "desc":
      query = query.order("effective_price", { ascending: false });
      break;
  }

  const { data: products } = await query;
  const { data: brands } = await supabase.from("brands").select("*");
  const { data: categories } = await supabase.from("categories").select("*");

  const category_name = categories?.find(
    (c) => c.slug === params.category,
  )?.name;

  return (
    <div className="flex flex-col py-6 min-h-screen">
      <div className="flex justify-between py-6">
        <h1 className="text-2xl ">{category_name || "Todos os produtos"}</h1>
        <Sort />
      </div>
      <div className="flex gap-6">
        <Sidenav brands={brands || []} categories={categories || []} />
        <div className="grid grid-cols-4 gap-6 flex-6">
          {products?.map((p: ProductWithEffectivePrice) => (
            <Card key={p.id} {...p} href={`/products/${p.id}`} />
          ))}
        </div>
      </div>

      <div>{/* TODO: Pagination */}</div>
    </div>
  );
}
