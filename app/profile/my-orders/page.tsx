import OrdersList from "@/components/profile/OrdersList";
import { createServer } from "@/lib/supabase/server";

export default async function MyOrders() {
  const supabase = await createServer();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products!inner(*, categories!inner(*)))");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Os Meus Pedidos</h1>
      <OrdersList orders={orders} />
    </div>
  );
}
