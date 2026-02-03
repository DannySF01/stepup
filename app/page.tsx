import Link from "next/link";
export default function Home() {
  const exampleProducts = [
    {
      id: 1,
      name: "NIKE AIR FORCE 1",
      imageSrc:
        "https://img01.ztat.net/article/spp-media-p1/54ebff14c74f4e55a760de6f09436896/99693223863b4d87871e6aada1547495.jpg?imwidth=1800&filter=packshot",
      imageAlt: "NIKE AIR FORCE",
      price: "120 €",
      color: "WHITE",
    },
    {
      id: 2,
      name: "NIKE AIR FORCE 1",
      imageSrc:
        "https://img01.ztat.net/article/spp-media-p1/54ebff14c74f4e55a760de6f09436896/99693223863b4d87871e6aada1547495.jpg?imwidth=1800&filter=packshot",
      imageAlt: "NIKE AIR FORCE",
      price: "120 €",
      color: "WHITE",
    },
    {
      id: 3,
      name: "NIKE AIR FORCE 1",
      imageSrc:
        "https://img01.ztat.net/article/spp-media-p1/54ebff14c74f4e55a760de6f09436896/99693223863b4d87871e6aada1547495.jpg?imwidth=1800&filter=packshot",
      imageAlt: "NIKE AIR FORCE",
      price: "120 €",
      color: "WHITE",
    },
    {
      id: 4,
      name: "NIKE AIR FORCE 1",
      imageSrc:
        "https://img01.ztat.net/article/spp-media-p1/54ebff14c74f4e55a760de6f09436896/99693223863b4d87871e6aada1547495.jpg?imwidth=1800&filter=packshot",
      imageAlt: "NIKE AIR FORCE",
      price: "120 €",
      color: "WHITE",
    },
    {
      id: 5,
      name: "NIKE AIR JORDAN 1 RETRO",
      imageSrc:
        "https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516295_1000.jpg",
      imageAlt: "NIKE AIR JORDAN 1 RETRO",
      price: "199 €",
      color: "WHITE",
    },
    {
      id: 6,
      name: "NIKE AIR JORDAN 1 RETRO",
      imageSrc:
        "https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516295_1000.jpg",
      imageAlt: "NIKE AIR JORDAN 1 RETRO",
      price: "199 €",
      color: "WHITE",
    },
    {
      id: 7,
      name: "NIKE AIR JORDAN 1 RETRO",
      imageSrc:
        "https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516295_1000.jpg",
      imageAlt: "NIKE AIR JORDAN 1 RETRO",
      price: "199 €",
      color: "WHITE",
    },
    {
      id: 8,
      name: "NIKE AIR JORDAN 1 RETRO",
      imageSrc:
        "https://cdn-images.farfetch-contents.com/13/15/76/97/13157697_21516295_1000.jpg",
      imageAlt: "NIKE AIR JORDAN 1 RETRO",
      price: "199 €",
      color: "WHITE",
    },
    {
      id: 9,
      name: "NIKE AIR SHOX TL",
      imageSrc:
        "https://i8.amplience.net/t/jpl/jdpt_product_list?plu=jd_773205_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto",
      imageAlt: "NIKE AIR SHOX TL",
      price: "170 €",
      color: "BLACK",
    },
    {
      id: 10,
      name: "NIKE AIR SHOX TL",
      imageSrc:
        "https://i8.amplience.net/t/jpl/jdpt_product_list?plu=jd_773205_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto",
      imageAlt: "NIKE AIR SHOX TL",
      price: "170 €",
      color: "BLACK",
    },
    {
      id: 11,
      name: "NIKE AIR SHOX TL",
      imageSrc:
        "https://i8.amplience.net/t/jpl/jdpt_product_list?plu=jd_773205_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto",
      imageAlt: "NIKE AIR SHOX TL",
      price: "170 €",
      color: "BLACK",
    },
    {
      id: 12,
      name: "NIKE AIR SHOX TL",
      imageSrc:
        "https://i8.amplience.net/t/jpl/jdpt_product_list?plu=jd_773205_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto",
      imageAlt: "NIKE AIR SHOX TL",
      price: "170 €",
      color: "BLACK",
    },
  ];

  return (
    <div className="flex flex-1 items-center justify-center pt-(--header-height)">
      <div className="grid grid-cols-4">
        {exampleProducts.map((product) => (
          <Link key={product.id} className="p-6" href={"/products/1"}>
            <img
              className="w-full max-w-80 aspect-square object-cover mb-2"
              src={product.imageSrc}
              alt={product.imageAlt}
            />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
