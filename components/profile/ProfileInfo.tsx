"use client";
import { Profile } from "@/lib/types/auth.types";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../ui/Field";
import { Input } from "../ui/Input";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { UserCircleIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { useActionState, useEffect, useState } from "react";
import updateProfile from "@/actions/updateProfile";
import { useToast } from "../ui/Toast";

interface ProfileInfoProps {
  profile: Profile | null;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const [gender, setGender] = useState(profile?.gender || "");
  const [imageUrl, setImageUrl] = useState(profile?.avatar_url || "");

  const boundAction = updateProfile.bind(null, profile?.id, imageUrl, gender);
  const [state, formAction, pending] = useActionState(boundAction, null);
  const { toast } = useToast();

  const UserAvatar = ({ url }: { url?: string | null }) => (
    <div className="">
      {url ? (
        <img
          src={url}
          alt=""
          className="w-32 aspect-square rounded-full object-cover"
        />
      ) : (
        <UserCircleIcon className="w-32 aspect-square rounded-full object-cover" />
      )}
    </div>
  );

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
      });
    }
  }, [state?.message]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Informações pessoais</h1>
      <form action={formAction}>
        <FieldSet>
          <FieldGroup>
            <Field orientation="horizontal" className="space-x-3">
              <UserAvatar url={imageUrl} />
              <Field>
                <FieldLabel>URL da imagem</FieldLabel>
                <Input
                  name="avatar_url"
                  type="url"
                  defaultValue={imageUrl || ""}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Field>
            </Field>
            <Field orientation="horizontal">
              <Field>
                <FieldLabel>Nome</FieldLabel>
                <Input
                  name="name"
                  defaultValue={profile?.name || ""}
                  required
                />
                <FieldError>{state?.errors?.name}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Sobrenome</FieldLabel>
                <Input name="surname" defaultValue={profile?.surname || ""} />
                <FieldError>{state?.errors?.surname}</FieldError>
              </Field>
            </Field>
            <Field orientation="horizontal">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input defaultValue={profile?.email || ""} disabled required />
              </Field>
              <Field>
                <FieldLabel>Telefone</FieldLabel>
                <Input
                  name="phone"
                  type="tel"
                  pattern="[0-9]{9}"
                  placeholder="(+351) 000 000 000"
                  defaultValue={profile?.phone || ""}
                />
                <FieldError>{state?.errors?.phone}</FieldError>
              </Field>
            </Field>
            <Field orientation="horizontal">
              <Field>
                <FieldLabel>País</FieldLabel>
                <Input
                  name="country"
                  type="text"
                  defaultValue={profile?.country || ""}
                />
                <FieldError>{state?.errors?.country}</FieldError>
              </Field>
              <Field>
                <FieldLabel>Data de nascimento</FieldLabel>
                <Input
                  name="birthdate"
                  type="date"
                  defaultValue={
                    profile?.birthdate
                      ? new Date(profile.birthdate).toISOString().split("T")[0]
                      : undefined
                  }
                  min="1900-01-01"
                  max={new Date().toISOString().split("T")[0]}
                />
                <FieldError>{state?.errors?.birthdate}</FieldError>
              </Field>
            </Field>
            <RadioGroup
              name="gender"
              defaultValue={gender || ""}
              onValueChange={setGender}
            >
              <FieldLabel>Genero</FieldLabel>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="data-[state=checked]:border-blue-500"
                />
                <FieldLabel htmlFor="male" className="font-normal">
                  Masculino
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="data-[state=checked]:border-blue-500"
                />
                <FieldLabel htmlFor="female" className="font-normal">
                  Feminino
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldGroup>
          <Button disabled={pending} className="max-w-24 cursor-pointer">
            Guardar
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
