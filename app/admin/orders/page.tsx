import AdminOrdersList from "@/components/admin/AdminOrdersList";
import { createServer } from "@/lib/supabase/server";

export default async function AdminOrders() {
  const supabase = await createServer();

  const { error: error, data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products!inner(*, categories!inner(*)))");

  return (
    <div className="bg-card p-9 rounded-md">
      <AdminOrdersList orders={orders} />
    </div>
  );
}
