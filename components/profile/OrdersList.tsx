import { OrderItemWithProduct, OrderWithItems } from "@/lib/types/cart.types";
import { formatToCurrency } from "@/lib/utils/formatPrice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/Collapsible";
import { ChevronDown, Package, MapPin, Calendar } from "lucide-react";

interface OrdersListProps {
  orders: OrderWithItems[] | null;
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="w-full">
      <div className="hidden sm:grid grid-cols-7 items-center border-b border-border/40 pb-4 mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
        <div className="col-span-2">ID do Pedido</div>
        <div className="col-span-2 text-center">Estado</div>
        <div className="col-span-2 text-center">Total</div>
        <div className="text-right pr-4">Detalhes</div>
      </div>

      <div className="flex flex-col">
        {orders?.map((order: OrderWithItems) => (
          <Collapsible
            key={order.id}
            className="group border-b border-border/20 last:border-0"
          >
            <CollapsibleTrigger className="w-full grid grid-cols-7 items-center gap-3 py-8 hover:bg-muted/5 transition-all -mx-4 px-4 rounded-2xl group text-left">
              <p className="text-xs font-black tracking-tighter text-foreground col-span-2 uppercase">
                #{order.id.slice(0, 8)}
              </p>

              <div className="col-span-2 flex justify-center">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20 italic">
                  {order.status}
                </span>
              </div>

              <p className="col-span-2 text-center font-black tracking-tighter tabular-nums italic text-foreground">
                {formatToCurrency(order.total)}
              </p>

              <div className="flex justify-end pr-4">
                <ChevronDown
                  size={16}
                  className="text-muted-foreground transition-transform duration-500 group-data-[state=open]:rotate-180"
                />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-muted/10 rounded-4xl p-6 mt-2 border border-border/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-border/40 pb-6">
                  <div className="flex items-start gap-3">
                    <Calendar size={14} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Data da Compra
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {new Date(order.created_at).toLocaleDateString(
                          "pt-PT",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Morada de Entrega
                      </p>
                      <p className="text-xs font-bold text-foreground leading-relaxed">
                        {order.shipping_address}, {order.shipping_city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Package size={14} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                      Manifesto de Artigos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.order_items.map((item: OrderItemWithProduct) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-background p-3 rounded-2xl border border-border/60"
                      >
                        <img
                          src={item.products.image_url || ""}
                          alt={item.products.name}
                          className="w-14 h-14 rounded-xl aspect-square object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-tight text-foreground truncate italic">
                            {item.products.name}
                          </p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                            Qtd: {item.quantity} •{" "}
                            {formatToCurrency(item.products.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
