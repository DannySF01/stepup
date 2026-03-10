"use client";
import { Address } from "@/lib/types/cart.types";
import { Trash } from "lucide-react";
import { Button } from "../ui/Button";
import {
  FieldSet,
  FieldLegend,
  FieldLabel,
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
  FieldGroup,
  FieldError,
} from "../ui/Field";
import { Input } from "../ui/Input";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { useActionState, useEffect, useState } from "react";
import { createAddress } from "@/actions/createAddress";
import { useToast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AddressFormProps {
  addresses: Address[] | null;
  onChange?: (id: string) => void;
  handleSubmit?: () => void;
}
export default function AddressForm({
  addresses,
  onChange,
  handleSubmit,
}: AddressFormProps) {
  const [showForm, setShowForm] = useState(addresses?.length === 0);

  const [state, formAction, pending] = useActionState(createAddress, null);

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

  async function removeAddress(id: string) {
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) return console.error(error.message);
    setShowForm(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <FieldGroup>
        <form id="shipping-form" action={handleSubmit}>
          <FieldSet>
            <FieldLegend>Moradas ({addresses?.length})</FieldLegend>
            {addresses && addresses.length > 0 && (
              <RadioGroup
                onValueChange={onChange}
                defaultValue={addresses?.[0]?.id}
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
                          className="h-4 w-4 hover:text-destructive"
                        />
                      </div>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            )}
            <Button
              className="rounded-md"
              size="lg"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? "Cancelar" : "Adicionar Morada"}
            </Button>
          </FieldSet>
        </form>

        {showForm && (
          <form id="address-form" action={formAction}>
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
              <Button
                form="address-form"
                className="rounded-md"
                size="lg"
                type="submit"
              >
                Guardar Morada
              </Button>
            </FieldSet>
          </form>
        )}
      </FieldGroup>
    </div>
  );
}
