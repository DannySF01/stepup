"use client";
import { Address } from "@/lib/types/cart.types";
import { Trash, Plus, X, MapPin } from "lucide-react";
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
    if (state?.message) toast({ description: state.message });
  }, [state]);

  async function removeAddress(id: string) {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) return console.error(error.message);
    setShowForm(false);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <form id="shipping-form" action={handleSubmit} className="space-y-6">
        <FieldSet className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <FieldLegend className="text-sm font-black uppercase tracking-[0.2em] text-foreground italic mb-0">
                Moradas Guardadas ({addresses?.length || 0})
              </FieldLegend>
            </div>
            <Button
              size="sm"
              variant={showForm ? "ghost" : "outline"}
              className="rounded-xl text-[10px] font-black uppercase tracking-widest gap-2"
              onClick={(e) => {
                e.preventDefault();
                setShowForm(!showForm);
              }}
            >
              {showForm ? (
                <>
                  <X size={14} /> Cancelar
                </>
              ) : (
                <>
                  <Plus size={14} /> Nova Morada
                </>
              )}
            </Button>
          </div>

          {addresses && addresses.length > 0 && !showForm && (
            <RadioGroup
              onValueChange={onChange}
              defaultValue={addresses?.[0]?.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {addresses?.map((address: Address) => (
                <FieldLabel
                  key={address.id}
                  htmlFor={address.id}
                  className="cursor-pointer group"
                >
                  <div className="relative flex items-start justify-between p-5 rounded-2xl border border-border/60 bg-background transition-all hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary/20">
                    <FieldContent className="space-y-1">
                      <FieldTitle className="text-xs font-black uppercase tracking-tight text-foreground">
                        {address.name} {address.surname}
                      </FieldTitle>
                      <FieldDescription className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-wide">
                        {address.address}, {address.city}
                        <br />
                        {address.district}, {address.country}
                      </FieldDescription>
                    </FieldContent>
                    <div className="flex flex-col items-end gap-4">
                      <RadioGroupItem
                        value={address.id}
                        id={address.id}
                        className="text-primary"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeAddress(address.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </FieldLabel>
              ))}
            </RadioGroup>
          )}
        </FieldSet>
      </form>

      {showForm && (
        <form
          action={formAction}
          className="animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <FieldSet className="bg-muted/10 p-8 rounded-4xl border border-border/40 space-y-8">
            <div className="space-y-1">
              <FieldLegend className="text-sm font-black uppercase tracking-widest text-foreground italic">
                Nova Morada de Entrega
              </FieldLegend>
            </div>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Nome*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-name"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
                <FieldError className="text-[10px] font-bold text-destructive">
                  {state?.errors?.name}
                </FieldError>
              </Field>
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Apelido*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-surname"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
                <FieldError className="text-[10px] font-bold text-destructive">
                  {state?.errors?.surname}
                </FieldError>
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Email*
                </FieldLabel>
                <Input
                  type="email"
                  name="checkout-email"
                  placeholder="example@email.com"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
                <FieldError className="text-[10px] font-bold text-destructive">
                  {state?.errors?.email}
                </FieldError>
              </Field>
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Telefone*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-phone"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
                <FieldError className="text-[10px] font-bold text-destructive">
                  {state?.errors?.phone}
                </FieldError>
              </Field>
            </FieldGroup>

            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Endereço*
              </FieldLabel>
              <Input
                type="text"
                name="checkout-address"
                placeholder="Rua, Apartamento, porta..."
                className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                required
              />
              <FieldError className="text-[10px] font-bold text-destructive">
                {state?.errors?.address}
              </FieldError>
            </Field>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Cidade*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-city"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
              </Field>
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Distrito*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-district"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
              </Field>
              <Field className="space-y-2">
                <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  País*
                </FieldLabel>
                <Input
                  type="text"
                  name="checkout-country"
                  className="rounded-xl bg-background border-border/60 focus:border-primary/50"
                  required
                />
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-foreground text-background hover:bg-primary shadow-xl shadow-primary/10"
            >
              {pending ? "A Guardar..." : "Guardar Morada"}
            </Button>
          </FieldSet>
        </form>
      )}
    </div>
  );
}
