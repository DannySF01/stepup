import AddressForm from "@/components/cart/AddressForm";
import { createServer } from "@/lib/supabase/server";
import { MapPin } from "lucide-react";

export default async function MyAddresses() {
  const supabase = await createServer();

  const { data: addresses, error } = await supabase
    .from("addresses")
    .select("*");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <MapPin size={14} strokeWidth={3} />
          <span>Gestão de Logística</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          As Minhas Moradas
        </h1>
        <div className="h-1.5 w-12 bg-primary rounded-full" />
      </header>

      <div className="p-8 md:p-12 ">
        <div className="max-w-3xl">
          <AddressForm addresses={addresses} />
        </div>
      </div>

      {!addresses?.length && (
        <div className="p-6 rounded-2xl bg-muted/20 border border-dashed border-border/60 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Ainda não tens moradas guardadas. Adiciona uma para acelerar o teu
            checkout.
          </p>
        </div>
      )}
    </div>
  );
}
