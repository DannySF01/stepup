import OrdersList from "@/components/profile/OrdersList";
import { createServer } from "@/lib/supabase/server";
import { Truck } from "lucide-react";

export default async function MyOrders() {
  const supabase = await createServer();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products!inner(*, categories!inner(*)))")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <Truck size={14} strokeWidth={3} />
          <span>Histórico de Entregas</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          Os Meus Pedidos
        </h1>
        <div className="h-1.5 w-12 bg-primary rounded-full" />
      </header>

      <div className="p-8 md:p-12">
        {orders && orders.length > 0 ? (
          <OrdersList orders={orders} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="p-6 rounded-full bg-muted/20 text-muted-foreground/30 border border-dashed border-border">
              <Truck size={48} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                Ainda sem encomendas
              </h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                As tuas compras e detalhes de entrega aparecerão aqui.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
