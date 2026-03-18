import { formatToCurrency } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";
import { CartItemWithProduct } from "@/lib/types/cart.types";
import Badge from "../ui/Badge";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";

interface SidebarProps {
  subtotal: number;
  total: number;
  discount: number;
  discount_percentage: number;
  delivery: number;
  items: CartItemWithProduct[];
}

export default function ShippingSidebar({
  subtotal,
  total,
  discount,
  discount_percentage,
  delivery,
  items,
}: SidebarProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Resumo do pedido</h1>
      <div className="pb-3 border-b">
        {items &&
          items.map((item) => (
            <div key={item.id} className="grid grid-cols-3 grid-rows-2 py-1.5">
              <div className="flex gap-3 row-span-2 col-span-2">
                <Badge value={item.quantity || 1}>
                  <img
                    src={item.products.image_url || ""}
                    alt={item.products.name}
                    className="w-12 h-12 rounded-md aspect-square object-cover"
                  />
                </Badge>
                <div>
                  <p className="text-sm">{item.products.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.products.categories?.name}
                  </p>
                </div>
              </div>
              <div className="my-auto place-self-end row-span-2 ">
                <span className="font-semibold">
                  {formatToCurrency(
                    getEffectivePrice(
                      item.products.price,
                      item.products.on_sale,
                      item.products.sale_price,
                    ),
                  )}
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <span className="font-semibold">{formatToCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <p>Taxas de entrega</p>
        <span className="font-semibold ">{formatToCurrency(delivery)}</span>
      </div>
      <div className="flex justify-between">
        <p>Desconto ({discount_percentage}% Boas Vindas)</p>
        <span className="font-semibold"> -{formatToCurrency(discount)}</span>
      </div>
      <div className="flex justify-between border-t py-4">
        <p className="font-bold">Total</p>
        <span className="font-bold">{formatToCurrency(total)}</span>
      </div>
      <Button
        form="shipping-form"
        className="w-full font-bold py-6 cursor-pointer"
      >
        AVANÇAR PARA O PAGAMENTO
      </Button>
      <div id="disclaimer">
        <p className="text-sm text-muted-foreground">
          Ao finalizar o pedido, você concorda com os termos de uso e
          privacidade. Você pode cancelar o pedido a qualquer momento, sem
          penalidades. O pedido é processado imediatamente após o pagamento. Se
          houver alguma duvida sobre o pedido, entre em contato conosco. O
          pedido pode ser entregue em até 3 dias úteis.
        </p>
      </div>
    </div>
  );
}
