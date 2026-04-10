import { createServer } from "@/lib/supabase/server";
import Sort from "@/components/ui/Sort";
import Sidenav from "@/components/ui/Sidenav";
import { getPagination, getTotalPages } from "@/lib/utils/pagination";
import ProductsList from "@/components/products/ProductsList";
import { formatToCents } from "@/lib/utils/formatPrice";
import { ProductDetailed } from "@/lib/types/products.types";
import { Filter, SlidersHorizontal } from "lucide-react";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const supabase = await createServer();
  const params = await searchParams;
  const { from, to, currentPage } = getPagination(params.page);

  const selectString = params.sizes
    ? "*, brands!inner(slug), categories!inner(slug), product_sizes!inner(*, sizes!inner(*))"
    : "*, brands!inner(slug), categories!inner(slug), product_sizes(*, sizes!inner(*))";

  let query = supabase
    .from("products_view")
    .select(selectString, { count: "exact" })
    .range(from, to);

  if (params.sale) query = query.eq("on_sale", true);
  if (params.category) query = query.eq("categories.slug", params.category);
  if (params.gender) query = query.in("gender", params.gender.split(","));
  if (params.brand) query = query.in("brands.slug", params.brand.split(","));
  if (params.min || params.max) {
    query = query
      .gte("effective_price", formatToCents(Number(params.min)))
      .lte("effective_price", formatToCents(Number(params.max) || 99999999));
  }
  if (params.sort === "asc")
    query = query.order("effective_price", { ascending: true });
  if (params.sort === "desc")
    query = query.order("effective_price", { ascending: false });
  if (params.q) query = query.textSearch("name", params.q);
  if (params.sizes)
    query = query.in(
      "product_sizes.sizes.value",
      params.sizes.split(",").map(Number),
    );

  const { data: products, count } = await query;
  const { data: brands } = await supabase.from("brands").select("*");
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: sizes } = await supabase.from("sizes").select("*");

  const category_name = categories?.find(
    (c) => c.slug === params.category,
  )?.name;
  const totalPages = getTotalPages(count);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 antialiased min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
            <SlidersHorizontal size={14} />
            <span>Coleção</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">
            {category_name || "Todos os produtos"}
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Mostrando {products?.length || 0} de {count || 0} modelos
            disponíveis
          </p>
        </div>

        <Sort />
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-64 shrink-0 h-fit sticky top-24 hidden lg:block">
          <div className="flex items-center gap-2 mb-6 text-foreground font-bold text-sm tracking-tight">
            <Filter size={16} />
            <span>Filtros Avançados</span>
          </div>
          <Sidenav
            brands={brands || []}
            categories={categories || []}
            sizes={sizes || []}
          />
        </aside>

        <main className="flex-1">
          {products && products.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ProductsList
                products={products as ProductDetailed[]}
                searchParams={params}
                pagination={{ currentPage, totalPages }}
              />
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border/40 rounded-3xl">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Filter className="text-muted-foreground/40" size={32} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">
                Nenhum produto encontrado
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Tente ajustar os filtros ou pesquisar por outro termo.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
