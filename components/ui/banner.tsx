import Link from "next/link";

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
    <section className="relative h-64 md:h-80 rounded-xl overflow-hidden flex items-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-8 text-white max-w-lg">
        <h2 className="text-3xl font-bold">{title}</h2>

        {subtitle && <p className="mt-2 text-lg">{subtitle}</p>}

        <Link
          href={ctaHref}
          className="inline-block mt-4 bg-white text-black px-6 py-2 rounded-md font-medium"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
