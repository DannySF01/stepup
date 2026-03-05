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
    <div>
      <form id="payment-form" action={formAction} className="space-y-6 px-6">
        <FieldSet>
          <RadioGroup>
            <FieldLabel key={address?.id} htmlFor={address?.id}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>
                    A entregar a {address?.name} {address?.surname}
                  </FieldTitle>
                  <FieldDescription>
                    {address?.address}, {address?.city}, {address?.district},{" "}
                    {address?.country}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Metodo de Pagamento</FieldLegend>
            <FieldDescription>
              Escolha uma das opções abaixo para efetuar o pagamento
            </FieldDescription>
            <RadioGroup defaultValue="payment-on-delivery">
              <FieldLabel htmlFor="payment-on-delivery">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Pagar na Entrega</FieldTitle>
                    <FieldDescription>
                      Pagamento na entrega da encomenda
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="payment-on-delivery"
                    id="payment-on-delivery"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="payment-by-mbway">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>MBWay</FieldTitle>
                    <FieldDescription>Pagamento via MBWay</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="payment-by-mbway"
                    id="payment-by-mbway"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="payment-by-paypal">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>PayPal</FieldTitle>
                    <FieldDescription>Pagamento via PayPal</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="payment-by-paypal"
                    id="payment-by-paypal"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="payment-by-card">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Cartão de Crédito / Débito</FieldTitle>
                    <FieldDescription>
                      Pagamento via cartão. Visa, Mastercard, etc...
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="payment-by-card"
                    id="payment-by-card"
                  />
                </Field>
              </FieldLabel>

              <FieldLabel htmlFor="payment-by-bank-transfer">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Transferência Bancária</FieldTitle>
                    <FieldDescription>
                      Pagamento via transferência bancária
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value="payment-by-bank-transfer"
                    id="payment-by-bank-transfer"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
