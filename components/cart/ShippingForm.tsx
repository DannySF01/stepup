"use client";
import { useActionState, useEffect, useState } from "react";
import Checkbox from "../ui/Checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/Field";
import { Input } from "../ui/Input";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { createAddress } from "@/actions/createAddress";
import { useToast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import { Address } from "@/lib/types/cart.types";
import { Button } from "../ui/Button";
import { Trash } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ShippingFormProps {
  addresses: Address[] | null;
}
export default function ShippingForm({ addresses }: ShippingFormProps) {
  const [state, formAction, pending] = useActionState(createAddress, null);

  const [showForm, setShowForm] = useState(addresses?.length === 0);
  const [selectedAddress, setSelectedAddress] = useState(addresses?.[0]?.id);

  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (state?.success) {
      setShowForm(false);
      router.refresh();
    }

    if (!state?.message) return;

    toast({
      description: state.message,
    });
  }, [state]);

  const removeAddress = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) return console.error(error.message);
    setShowForm(false);
    router.refresh();
  };

  function handleShippingSubmit() {
    if (!selectedAddress) return toast({ description: "Selecione uma morada" });
    router.push("/cart/shipping/payment");
  }

  return (
    <div className="space-y-6 px-6">
      <form id="shipping-form" action={handleShippingSubmit}>
        {addresses && addresses.length > 0 && (
          <FieldSet>
            <FieldLegend>Moradas ({addresses?.length})</FieldLegend>
            <RadioGroup
              onValueChange={setSelectedAddress}
              defaultValue={selectedAddress}
            >
              {addresses?.map((address: Address) => (
                <FieldLabel key={address.id} htmlFor={address.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>
                        {address.name} {address.surname}
                      </FieldTitle>
                      <FieldDescription>
                        {address.address}, {address.city}, {address.district},{" "}
                        {address.country}
                      </FieldDescription>
                    </FieldContent>
                    <div className="flex flex-col gap-3">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <Trash
                        onClick={() => removeAddress(address.id)}
                        className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors duration-200"
                      />
                    </div>
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? "Cancelar" : "Adicionar Morada"}
            </Button>
            <FieldSeparator />
          </FieldSet>
        )}
      </form>
      <form id="address-form" action={formAction}>
        <FieldGroup>
          {(addresses?.length === 0 || showForm) && (
            <FieldSet>
              <FieldLegend>Morada de entrega</FieldLegend>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-name">Nome*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-name"
                      id="checkout-name"
                      required
                    />
                    <FieldError>{state?.errors?.name}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-surname">Apelido*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-surname"
                      id="checkout-surname"
                      required
                    />
                    <FieldError>{state?.errors?.surname}</FieldError>
                  </Field>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-email">Email*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-email"
                      id="checkout-email"
                      placeholder="example@email.com"
                      required
                    />
                    <FieldError>{state?.errors?.email}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-phone">Telefone*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-phone"
                      id="checkout-phone"
                      required
                    />
                    <FieldError>{state?.errors?.phone}</FieldError>
                  </Field>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-tax">NIF*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-tax"
                      id="checkout-tax"
                      required
                    />
                    <FieldError>{state?.errors?.tax}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-address">
                      Endereço*
                    </FieldLabel>
                    <Input
                      type="text"
                      name="checkout-address"
                      id="checkout-address"
                      placeholder="Apartamento, casa, etc"
                      required
                    />
                    <FieldError>{state?.errors?.address}</FieldError>
                  </Field>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-country">País*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-country"
                      id="checkout-country"
                      required
                    />
                    <FieldError>{state?.errors?.country}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-district">
                      Distrito*
                    </FieldLabel>
                    <Input
                      type="text"
                      name="checkout-district"
                      id="checkout-district"
                      required
                    />
                    <FieldError>{state?.errors?.district}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-city">Cidade*</FieldLabel>
                    <Input
                      type="text"
                      name="checkout-city"
                      id="checkout-city"
                      placeholder="Introduz a tua cidade"
                      required
                    />
                    <FieldError>{state?.errors?.city}</FieldError>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel htmlFor="checkout-postalCode">
                      Código Postal*
                    </FieldLabel>
                    <Input
                      type="text"
                      name="checkout-postalCode"
                      id="checkout-postalCode"
                      required
                    />
                    <FieldError>{state?.errors?.postal_code}</FieldError>
                  </Field>
                </Field>
              </FieldGroup>
              <Button form="address-form" type="submit">
                Guardar Morada
              </Button>
            </FieldSet>
          )}
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
      </form>
    </div>
  );
}
