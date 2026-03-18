import { OrderItemWithProduct, OrderWithItems } from "@/lib/types/cart.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/Collapsible";
import { ChevronDownIcon } from "lucide-react";

interface OrdersListProps {
  orders: OrderWithItems[] | null;
}
export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div>
      <div>
        <div className="grid grid-cols-7 place-items-center border-b pb-2 font-bold">
          <div className="place-self-start col-span-2">Nº do Pedido</div>
          <div className="col-span-2">Estado do Pedido</div>
          <div className="col-span-2">Preço</div>
        </div>
      </div>
      {!orders?.length && <p>Não tens pedidos</p>}
      {orders?.map((order: OrderWithItems) => (
        <Collapsible className="grid border-b" key={order.id}>
          <CollapsibleTrigger className="grid grid-cols-7 place-items-center group gap-3 py-6">
            <p className="text-sm col-span-2 place-self-start">#{order.id}</p>
            <p className="col-span-2">{order.status}</p>
            <p className="col-span-2">{formatToCurrency(order.total)}</p>
            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180 col-span-1" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              <p>
                Data de compra:{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p>
                Morada de entrega:{" "}
                {order.shipping_address +
                  ", " +
                  order.shipping_city +
                  ", " +
                  order.shipping_district +
                  ", " +
                  order.shipping_country}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 py-6">
              {order.order_items.map((item: OrderItemWithProduct) => (
                <div key={item.id} className="flex gap-3 max-h-16">
                  <img
                    src={item.products.image_url || ""}
                    alt={item.products.name}
                    className="max-w-16 h-full rounded-md aspect-square object-cover"
                  />
                  <div>
                    <p>{item.products.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.products.categories?.name}
                    </p>
                    <p className="col-span-2 text-sm text-muted-foreground">
                      {item.quantity} x {formatToCurrency(item.products.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
