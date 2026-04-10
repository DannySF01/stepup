import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Banner from "@/components/ui/Banner";
import { Category, Product } from "@/lib/types/products.types";
import { getUserWithProfile } from "@/lib/auth/getUserWithProfile";
import { Sparkles, Zap, Heart } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { profile } = await getUserWithProfile();
  const gender = profile?.gender || "";

  const { data: categories } = await supabase.from("categories").select("*");
  const { data: newArrivals } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .limit(5);
  const { data: forYou } = await supabase
    .from("products")
    .select("*")
    .in("gender", [gender, "unisex"])
    .limit(5);

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-20 pb-20 antialiased">
      <nav className="flex items-center justify-center gap-12 py-8 border-b border-border/40">
        {categories?.map((c: Category) => (
          <Link
            href={`/products?category=${c.slug}`}
            key={c.slug}
            className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300 relative group"
          >
            {c.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
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

      <HomeSection
        title="Em Destaque"
        icon={<Sparkles size={20} className="text-amber-500" />}
        data={featured}
      />

      <HomeSection
        title="Novidades"
        icon={<Zap size={20} className="text-primary" />}
        data={newArrivals}
      />

      <HomeSection
        title="Para Você"
        icon={<Heart size={20} className="text-red-500" />}
        data={forYou}
      />
    </div>
  );
}

function HomeSection({
  title,
  data,
  icon,
}: {
  title: string;
  data: any[] | null;
  icon: React.ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold tracking-tighter text-foreground italic uppercase">
            {title}
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          Ver Tudo →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.map((p: any) => (
          <div
            key={p.id}
            className="animate-in fade-in zoom-in-95 duration-500"
          >
            <Card
              name={p.name}
              image_url={p.image_url}
              price={p.price}
              on_sale={p.on_sale}
              sale_price={p.sale_price}
              href={`/products/${p.id}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
