import Link from "next/link";
import { formatPrice } from "@/lib/utils/formatPrice";

interface CardProps {
  name: string | null;
  image_url: string | null;
  price: number | null;
  sale_price: number | null;
  on_sale: boolean | null;
  href: string;
}
export default function Card({
  name,
  image_url,
  price,
  sale_price,
  on_sale,
  href,
}: CardProps) {
  return (
    <Link
      className="max-w-80 bg-base-100 border rounded-lg bg-card border-border"
      href={href}
    >
      <img
        className="w-full max-w-80 aspect-square object-cover rounded-t-lg"
        src={image_url || ""}
        alt={name || ""}
      />
      <div className="p-3">
        <h2 className="text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </h2>
        {on_sale ? (
          <div className="flex gap-2">
            <p className="font-semibold"> {formatPrice(sale_price)}</p>
            <p className="line-through text-muted-foreground text-sm self-center">
              {formatPrice(price)}
            </p>
          </div>
        ) : (
          <p className="font-semibold">{formatPrice(price)}</p>
        )}
      </div>
    </Link>
  );
}
