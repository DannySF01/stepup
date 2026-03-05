import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "../ui/Button";
import Link from "next/link";

interface SidebarProps {
  subtotal: number;
  total: number;
  discount: number;
  discount_percentage: number;
  delivery: number;
}

export default function CartSidebar({
  subtotal,
  total,
  discount,
  discount_percentage,
  delivery,
}: SidebarProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
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
      <div className="flex justify-between border-t py-4">
        <p className="font-bold">Total</p>
        <span className="font-bold">{formatPrice(total)}</span>
      </div>
      <Link href="/cart/shipping">
        <Button className="w-full font-bold py-6 cursor-pointer">
          AVANÇAR PARA O CHECKOUT
        </Button>
      </Link>
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
