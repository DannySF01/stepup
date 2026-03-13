import AddressForm from "@/components/cart/AddressForm";
import { createServer } from "@/lib/supabase/server";

export default async function MyAddresses() {
  const supabase = await createServer();

  const { data: addresses, error } = await supabase
    .from("addresses")
    .select("*");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">As Minhas Moradas</h1>
      <AddressForm addresses={addresses} />
    </div>
  );
}
