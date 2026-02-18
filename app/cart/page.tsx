import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/cart/getCart";
import CartItem from "@/components/ui/CartItem";
import { CartItemWithProduct } from "@/lib/types/cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getEffectivePrice } from "@/lib/utils/getEffectivePrice";

export default async function Cart() {
  const { cart } = await getCart();
  console.log(cart);

  const items = cart?.cart_items as CartItemWithProduct[];

  function calculateSubtotal(items: CartItemWithProduct[]): number {
    return (
      items?.reduce(
        (acc: number, item: any) =>
          acc +
          item.quantity *
            getEffectivePrice(
              item.products.price,
              item.products.on_sale,
              item.products.sale_price,
            ),
        0,
      ) || 0
    );
  }

  const discount = 10;
  const delivery = items?.length > 0 ? 500 : 0; // Valor em centimos, valor real -> 5€

  const subtotal = calculateSubtotal(items);
  const total_discount = subtotal * (discount / 100);
  const total = subtotal + delivery - total_discount;

  const Sidebar = ({
    subtotal,
    total,
    discount,
    discount_percentage,
    delivery,
  }: {
    subtotal: number;
    total: number;
    discount: number;
    discount_percentage: number;
    delivery: number;
  }) => {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Resumo do pedido</h1>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <p>Taxas de entrega</p>
          <span className="font-semibold ">{formatPrice(delivery)}</span>
        </div>
        <div className="flex justify-between">
          <p>Desconto ({discount_percentage}% Boas Vindas)</p>
          <span className="font-semibold"> -{formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between border-y py-4">
          <p className="font-bold">Total</p>
          <span className="font-bold">{formatPrice(total)}</span>
        </div>
        <Button className="w-full py-6 cursor-pointer">Finalizar compra</Button>
        <div id="disclaimer">
          <p className="text-sm text-muted-foreground">
            Ao finalizar o pedido, você concorda com os termos de uso e
            privacidade. Você pode cancelar o pedido a qualquer momento, sem
            penalidades. O pedido é processado imediatamente após o pagamento.
            Se houver alguma duvida sobre o pedido, entre em contato conosco. O
            pedido pode ser entregue em até 3 dias úteis.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4 min-h-screen p-6 ">
      <div className="flex flex-2 flex-col gap-4">
        <h1 className="text-2xl font-bold">Carrinho</h1>
        {!items?.length && <p>Não tens produtos no carrinho</p>}
        {items?.map((item: any) => (
          <CartItem
            key={item.id}
            id={item.id}
            item={item.products}
            quantity={item.quantity}
            size={item.sizes.value}
          />
        ))}
      </div>
      <Sidebar
        subtotal={subtotal}
        total={total}
        discount={total_discount}
        discount_percentage={discount}
        delivery={delivery}
      />
    </div>
  );
}
