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

interface ShippingFormProps {
  addresses: Address[] | null;
}
export default function ShippingForm({ addresses }: ShippingFormProps) {
  const [selectedAddress, setSelectedAddress] = useState(addresses?.[0]?.id);

  const { toast } = useToast();
  const router = useRouter();

  function handleShippingSubmit() {
    if (!selectedAddress) return toast({ description: "Selecione uma morada" });
    router.push("/cart/shipping/payment");
  }

  return (
    <div className="space-y-6 px-6">
      <AddressForm
        addresses={addresses}
        handleSubmit={handleShippingSubmit}
        onChange={setSelectedAddress}
      />
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Endereço de faturação</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="checkout-same-as-shipping" defaultChecked />
              <FieldLabel
                htmlFor="checkout-same-as-shipping"
                className="font-normal"
              >
                Endereço de faturação igual ao endereço de entrega
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="checkout-additional-info">
                Informação adicional
              </FieldLabel>
              <textarea
                id="checkout-additional-info"
                name="checkout-additional-info"
                placeholder="Adicione informações adicionais para a sua encomenda"
                className="resize-none border p-3 rounded-md"
                rows={4}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Metodo de entrega</FieldLegend>
          <RadioGroup defaultValue="checkout-shipping-standard">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="checkout-shipping-standard">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Entrega standard</FieldTitle>
                    <FieldDescription>15-20 dias úteis</FieldDescription>
                    <FieldTitle>5€</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="checkout-shipping-standard"
                    id="checkout-shipping-standard"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="checkout-shipping-express">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Entrega rápida</FieldTitle>
                    <FieldDescription>3-5 dias úteis</FieldDescription>
                    <FieldTitle>10€</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="checkout-shipping-express"
                    id="checkout-shipping-express"
                  />
                </Field>
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
