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
    <section className="relative group h-100 md:h-125 w-full rounded-[2.5rem] overflow-hidden flex items-center border border-primary/40 shadow-2xl transition-all duration-500 hover:border-primary/20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover opacity-60 grayscale-20 transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="relative w-full h-full bg-background">
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-primary/40 to-primary/50" />
          </div>
        )}
      </div>

      <div className="relative z-10 p-8 md:p-20 text-foreground max-w-3xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-8 bg-primary rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary antialiased">
              Drop Limitado
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-[0.85] text-foreground">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="text-sm md:text-lg max-w-md leading-relaxed tracking-tight">
            {subtitle}
          </p>
        )}

        <div className="pt-6">
          <Link
            href={ctaHref}
            className="group/btn relative inline-flex items-center gap-4 bg-foreground text-background px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:bg-primary hover:text-white hover:shadow-2xl hover:shadow-primary/30 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">{ctaLabel}</span>
            <ArrowRight
              size={20}
              strokeWidth={3}
              className="relative z-10 transition-transform group-hover/btn:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
