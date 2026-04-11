"use client";
import { useActionState, useEffect } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/Field";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { createOrder } from "@/actions/createOrder";
import { Address } from "@/lib/types/cart.types";
import { useToast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import {
  Wallet,
  CreditCard,
  Landmark,
  Smartphone,
  Truck,
  MapPin,
} from "lucide-react";

interface PaymentFormProps {
  address: Address | null;
}

export default function PaymentForm({ address }: PaymentFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  if (!address) {
    router.back();
  }

  const [state, formAction, pending] = useActionState(createOrder, null);

  useEffect(() => {
    if (!state?.message) return;

    toast({
      description: state.message,
    });
  }, [state]);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/40 pb-4">
          <MapPin size={18} className="text-primary" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground italic">
            Confirmar Destino
          </h2>
        </div>

        <div className="p-6 rounded-2xl border border-primary bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <div className="bg-primary text-background p-1 rounded-full">
              <Truck size={12} strokeWidth={3} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-tight text-foreground">
              {address?.name} {address?.surname}
            </p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed max-w-xs">
              {address?.address}, {address?.city}, {address?.district},{" "}
              {address?.country}
            </p>
          </div>
        </div>
      </section>

      <form id="payment-form" action={formAction}>
        <FieldGroup className="space-y-10">
          <FieldSet className="space-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-primary" />
                <FieldLegend className="text-sm font-black uppercase tracking-widest text-foreground italic mb-0">
                  Método de Pagamento
                </FieldLegend>
              </div>
              <FieldDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-7">
                Escolha a sua opção preferencial para concluir a reserva
              </FieldDescription>
            </div>

            <RadioGroup
              defaultValue="payment-on-delivery"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <PaymentOption
                id="payment-by-mbway"
                value="payment-by-mbway"
                title="MBWay"
                description="Pagamento instantâneo"
                icon={<Smartphone size={18} />}
              />

              <PaymentOption
                id="payment-by-card"
                value="payment-by-card"
                title="Cartão"
                description="Visa, Mastercard, AMEX"
                icon={<CreditCard size={18} />}
              />

              <PaymentOption
                id="payment-by-paypal"
                value="payment-by-paypal"
                title="PayPal"
                description="Conta PayPal segura"
                icon={<Wallet size={18} />}
              />

              <PaymentOption
                id="payment-by-bank-transfer"
                value="payment-by-bank-transfer"
                title="Transferência"
                description="Multibanco ou IBAN"
                icon={<Landmark size={18} />}
              />

              <PaymentOption
                id="payment-on-delivery"
                value="payment-on-delivery"
                title="Pagar na Entrega"
                description="Pagamento no ato da receção"
                icon={<Truck size={18} />}
              />
            </RadioGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}

function PaymentOption({ id, value, title, description, icon }: any) {
  return (
    <FieldLabel htmlFor={id} className="cursor-pointer">
      <div className="relative flex items-center justify-between p-5 rounded-2xl border border-border/60 bg-background transition-all hover:border-primary/40 has-checked:border-primary has-[:checked]:bg-primary/[0.02] has-[:checked]:ring-1 has-[:checked]:ring-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-muted/20 text-muted-foreground group-has-checked:bg-primary/10 group-has-checked:text-primary transition-colors">
            {icon}
          </div>
          <FieldContent className="space-y-0.5">
            <FieldTitle className="text-xs font-black uppercase tracking-tight text-foreground">
              {title}
            </FieldTitle>
            <FieldDescription className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
              {description}
            </FieldDescription>
          </FieldContent>
        </div>
        <RadioGroupItem value={value} id={id} className="text-primary" />
      </div>
    </FieldLabel>
  );
}
