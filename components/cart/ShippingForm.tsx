"use client";
import Checkbox from "../ui/Checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/Field";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { useToast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import { Address } from "@/lib/types/cart.types";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { Truck, ReceiptText, Info } from "lucide-react";

interface ShippingFormProps {
  addresses: Address[] | null;
}

export default function ShippingForm({ addresses }: ShippingFormProps) {
  const [selectedAddress, setSelectedAddress] = useState(addresses?.[0]?.id);
  const { toast } = useToast();
  const router = useRouter();

  function handleShippingSubmit() {
    if (!selectedAddress)
      return toast({
        description: "Por favor, selecione uma morada",
        variant: "error",
      });
    router.push("/cart/shipping/payment");
  }

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <AddressForm
          addresses={addresses}
          handleSubmit={handleShippingSubmit}
          onChange={setSelectedAddress}
        />
      </section>

      <FieldGroup className="space-y-10">
        <FieldSet>
          <div className="flex items-center gap-2 mb-6">
            <ReceiptText size={16} className="text-primary" />
            <FieldLegend className="text-sm font-black uppercase tracking-widest text-foreground italic mb-0">
              Faturação
            </FieldLegend>
          </div>

          <Field
            orientation="horizontal"
            className="bg-background p-4 rounded-xl border border-border/60"
          >
            <Checkbox id="checkout-same-as-shipping" defaultChecked />
            <FieldLabel
              htmlFor="checkout-same-as-shipping"
              className="text-xs font-bold text-muted-foreground cursor-pointer select-none"
            >
              Endereço de faturação igual ao endereço de entrega
            </FieldLabel>
          </Field>
        </FieldSet>

        <FieldSet className="space-y-6">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-primary" />
            <FieldLegend className="text-sm font-black uppercase tracking-widest text-foreground italic mb-0">
              Método de Entrega
            </FieldLegend>
          </div>

          <RadioGroup
            defaultValue="checkout-shipping-standard"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FieldLabel
              htmlFor="checkout-shipping-standard"
              className="cursor-pointer"
            >
              <div className="relative flex items-center justify-between p-5 rounded-2xl border border-border/60 bg-background transition-all hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary/20">
                <FieldContent className="space-y-1">
                  <FieldTitle className="text-xs font-black uppercase tracking-tight text-foreground">
                    Standard
                  </FieldTitle>
                  <FieldDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    15-20 dias úteis
                  </FieldDescription>
                  <p className="text-sm font-black text-primary italic">
                    5,00€
                  </p>
                </FieldContent>
                <RadioGroupItem
                  value="checkout-shipping-standard"
                  id="checkout-shipping-standard"
                  className="text-primary"
                />
              </div>
            </FieldLabel>

            <FieldLabel
              htmlFor="checkout-shipping-express"
              className="cursor-pointer"
            >
              <div className="relative flex items-center justify-between p-5 rounded-2xl border border-border/60 bg-background transition-all hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary/20">
                <FieldContent className="space-y-1">
                  <FieldTitle className="text-xs font-black uppercase tracking-tight text-foreground">
                    Express
                  </FieldTitle>
                  <FieldDescription className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    3-5 dias úteis
                  </FieldDescription>
                  <p className="text-sm font-black text-primary italic">
                    10,00€
                  </p>
                </FieldContent>
                <RadioGroupItem
                  value="checkout-shipping-express"
                  id="checkout-shipping-express"
                  className="text-primary"
                />
              </div>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>

        <FieldSet className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-primary" />
            <FieldLabel
              htmlFor="checkout-additional-info"
              className="text-sm font-black uppercase tracking-widest text-foreground italic"
            >
              Notas da Encomenda
            </FieldLabel>
          </div>
          <textarea
            id="checkout-additional-info"
            name="checkout-additional-info"
            placeholder="Alguma instrução especial para a entrega?"
            className="w-full min-h-30 resize-none bg-muted/20 border border-border/40 p-4 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-muted-foreground/50"
            rows={4}
          />
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
