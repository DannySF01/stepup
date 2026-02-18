import Link from "next/link";
import { ProductWithEffectivePrice } from "@/lib/types/database.types";
import { formatPrice } from "@/lib/utils/formatPrice";

interface CardProps extends ProductWithEffectivePrice {
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
    <Link href={href}>
      <img
        className="w-full max-w-80 aspect-square object-cover mb-2"
        src={image_url || ""}
        alt={name || ""}
      />
      <h2>{name}</h2>
      {on_sale ? (
        <div className="flex gap-2">
          <p className="text-red-500"> {formatPrice(sale_price)}</p>
          <p className="line-through"> {formatPrice(price)}</p>
        </div>
      ) : (
        <p>{formatPrice(price)}</p>
      )}
    </Link>
  );
}
