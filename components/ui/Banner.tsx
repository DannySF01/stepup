import Link from "next/link";
import { ArrowRight } from "lucide-react";

type BannerProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl?: string;
};

export default function Banner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageUrl,
}: BannerProps) {
  return (
    <section className="relative group h-75 md:h-100 w-full rounded-3xl overflow-hidden flex items-center border border-border/40 shadow-2xl">
      <div className="absolute inset-0 z-0 bg-zinc-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-tr from-zinc-950 via-primary/30 to-primary" />
        )}
      </div>

      <div className="absolute inset-0 z-1 bg-linear-to-r from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 p-8 md:p-16 text-white max-w-2xl space-y-4 animate-in fade-in slide-in-from-left-6 duration-700">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary antialiased">
            Oferta Exclusiva
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="text-sm md:text-lg text-zinc-400 font-medium max-w-md leading-relaxed tracking-tight">
            {subtitle}
          </p>
        )}

        <div className="pt-4">
          <Link
            href={ctaHref}
            className="group/btn inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-black/40"
          >
            {ctaLabel}
            <ArrowRight
              size={18}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
