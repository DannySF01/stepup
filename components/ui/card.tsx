import Link from "next/link";
export default function Card({
  image_url,
  name,
  price,
  on_sale,
  sale_price,
  href,
}: {
  image_url: string;
  name: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  href: string;
}) {
  return (
    <Link href={href}>
      <img
        className="w-full max-w-80 aspect-square object-cover mb-2"
        src={image_url}
        alt={name}
      />
      <h2>{name}</h2>
      {on_sale ? (
        <div className="flex gap-2">
          <p className="text-red-500"> {sale_price} €</p>
          <p className="line-through"> {price} €</p>
        </div>
      ) : (
        <p>{price} €</p>
      )}
    </Link>
  );
}
