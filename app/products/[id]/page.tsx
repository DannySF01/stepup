"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Product() {
  const [qtd, setQtd] = useState(1);
  const exampleProduct = {
    id: 1,
    name: "NIKE AIR FORCE 1",
    imageSrc:
      "https://img01.ztat.net/article/spp-media-p1/54ebff14c74f4e55a760de6f09436896/99693223863b4d87871e6aada1547495.jpg?imwidth=1800&filter=packshot",
    imageAlt: "NIKE AIR FORCE",
    price: "120 €",
    tamanhos: ["37", "38", "39", "40", "41", "42"],
    colors: ["WHITE", "BLACK"],
  };

  return (
    <div className="flex flex-1 items-center p-12">
      <div className="flex w-full gap-6">
        <div className="flex-1">
          <img
            className="w-full max-h-full aspect-square object-cover"
            src={exampleProduct.imageSrc}
            alt={exampleProduct.imageAlt}
          />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">{exampleProduct.name}</h2>
            <p className="text-2xl">{exampleProduct.price}</p>
          </div>
          <div>
            <h3 className="pb-4 font-semibold">
              Escolha um tamanho disponível
            </h3>
            <div className="flex gap-2">
              {exampleProduct.tamanhos.map((tamanho: string) => (
                <Button size="lg" variant="outline" key={tamanho}>
                  {tamanho}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="pb-4 font-semibold">Escolha uma cor disponível</h3>
            <div className="flex gap-2">
              {exampleProduct.colors.map((color: string) => (
                <Button size="lg" variant="outline" key={color}>
                  {color}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="pb-4 font-semibold">Quantidade</h3>
            <div className="flex gap-2">
              <Input
                type="number"
                className="flex-1"
                value={qtd}
                min={1}
                onChange={(e) => setQtd(Number(e.target.value))}
              />
              <Button size="lg" className="bg-teal-400 flex-4">
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
          <div>
            <h3 className="pb-4 font-semibold">Descrição</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              quae, quod atque quia quos quibusdam quidem quae quibusdam quae
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
