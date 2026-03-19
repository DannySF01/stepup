import { createServer } from "@/lib/supabase/server";
import Sort from "@/components/ui/Sort";
import Sidenav from "@/components/ui/Sidenav";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import ProductsList from "@/components/products/ProductsList";
import { formatToCents } from "@/lib/utils/formatPrice";
import { ProductDetailed } from "@/lib/types/products.types";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    page: string;
    sale: boolean;
    sort: string;
    category: string;
    gender: string;
    brand: string;
    min: string;
    max: string;
    sizes: string;
  }>;
}) {
  const supabase = await createServer();

  const params = await searchParams;

  const { from, to, currentPage } = getPagination(params.page);

  //se tiverem tamanhos selecionados, faz um join na query para pegar os produtos com esses tamanhos, se não, pega todos os produtos
  const selectString = params.sizes
    ? "*, brands!inner(slug), categories!inner(slug), product_sizes!inner(*, sizes!inner(*))"
    : "*, brands!inner(slug), categories!inner(slug), product_sizes(*, sizes!inner(*))";

  //created a supabase view to calculate the effective price
  let query = supabase
    .from("products_view")
    .select(selectString, {
      count: "exact",
    })
    .range(from, to);

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
    const MAX_PRICE_RANGE = 99999999;
    const minCents = formatToCents(Number(params.min));
    const maxCents = formatToCents(Number(params.max) || MAX_PRICE_RANGE);

    query = query
      .gte("effective_price", minCents)
      .lte("effective_price", maxCents);
  }

  switch (params.sort) {
    case "asc":
      query = query.order("effective_price", { ascending: true });
      break;
    case "desc":
      query = query.order("effective_price", { ascending: false });
      break;
  }

  if (params.q) {
    query = query.textSearch("name", params.q);
  }

  if (params.sizes) {
    //converter o string de sizes para um array de numbers
    const selectedSizes = params.sizes.split(",").map(Number);
    query = query.in("product_sizes.sizes.value", selectedSizes);
  }

  const { data: products, count } = await query;
  const { data: brands } = await supabase.from("brands").select("*");
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: sizes } = await supabase.from("sizes").select("*");

  const category_name = categories?.find(
    (c) => c.slug === params.category,
  )?.name;

  const totalPages = getTotalPages(count);

  return (
    <div className="flex flex-col py-6 min-h-screen">
      <div className="flex justify-between py-6">
        <h1 className="text-2xl ">{category_name || "Todos os produtos"}</h1>
        <Sort />
      </div>
      <div className="flex gap-9">
        <Sidenav
          brands={brands || []}
          categories={categories || []}
          sizes={sizes || []}
        />
        <ProductsList
          products={products as ProductDetailed[]}
          searchParams={params}
          pagination={{ currentPage, totalPages }}
        />
      </div>
    </div>
  );
}
