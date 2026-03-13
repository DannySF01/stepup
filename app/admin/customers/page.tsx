import CustomersTable from "@/components/admin/CustomersTable";
import { createServer } from "@/lib/supabase/server";

export default async function AdminCustomers() {
  const supabase = await createServer();

  const { data: profiles } = await supabase.from("profiles").select("*");

  return (
    <div className="space-y-6">
      <h1 className="text-xl">Customers</h1>
      <CustomersTable profiles={profiles} />
    </div>
  );
}
