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
