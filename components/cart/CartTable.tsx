import { CartItemWithProduct } from "@/lib/types/cart.types";
import CartItem from "./CartItem";

interface CartTableProps {
  items: CartItemWithProduct[];
}

export default function CartTable({ items }: CartTableProps) {
  return (
    <div>
      <div>
        <div className="grid grid-cols-4 place-items-center gap-3 border-b pb-2 font-bold">
          <div className="col-span-2 place-self-start">Produto</div>
          <div>Quantidade</div>
          <div>Preço</div>
        </div>
      </div>
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
  );
}
