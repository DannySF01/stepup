import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Banner from "@/components/ui/Banner";
import { Category, Product } from "@/lib/types/products.types";

export default async function Home() {
  const supabase = createClient();

  const { data: categories } = await supabase.from("categories").select("*");
  const { data: newArrivals } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(8);

  return (
    <div>
      <nav className="flex items-center font-semibold justify-center gap-12 p-6">
        {categories?.map((c: Category) => (
          <Link
            href={`/products?category=${c.slug}`}
            className="hover:underline-offset-4 hover:underline cursor-pointer"
            key={c.slug}
          >
            {c.name}
          </Link>
        ))}
      </nav>
      <Banner
        title="Mid-season sale"
        subtitle="Até 30% de desconto em modelos selecionados"
        ctaLabel="Shop sale"
        ctaHref="/products?sale=true"
        imageUrl=""
      />
      <section className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Em destaque</h2>
        <div className="grid grid-cols-4">
          {featured?.map((fp: any) => (
            <Card
              key={fp.id}
              name={fp.name}
              image_url={fp.image_url}
              price={fp.price}
              on_sale={fp.on_sale}
              sale_price={fp.sale_price}
              href={`/products/${fp.id}`}
            />
          ))}
        </div>
      </section>
      <section className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Novidades</h2>
        <div className="grid grid-cols-4">
          {newArrivals?.map((nap: Product) => (
            <Card
              key={nap.id}
              name={nap.name}
              image_url={nap.image_url}
              price={nap.price}
              on_sale={nap.on_sale}
              sale_price={nap.sale_price}
              href={`/products/${nap.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
