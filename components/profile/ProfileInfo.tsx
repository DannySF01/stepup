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
import { UserCircleIcon, Camera, Save } from "lucide-react";
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
    <div className="relative group shrink-0">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background ring-1 ring-border/40 shadow-xl">
        {url ? (
          <img
            src={url}
            alt=""
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted/30 flex items-center justify-center text-muted-foreground/40">
            <UserCircleIcon size={80} strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-background">
        <Camera size={14} strokeWidth={3} />
      </div>
    </div>
  );

  useEffect(() => {
    if (state?.message) toast({ description: state.message });
  }, [state?.message, toast]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
          <span>Membro StepUp</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-foreground leading-none">
          Informações Pessoais
        </h1>
        <div className="h-1.5 w-12 bg-primary rounded-full" />
      </header>

      <form action={formAction} className=" p-8 md:p-12">
        <FieldSet className="space-y-10">
          <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-border/40">
            <UserAvatar url={imageUrl} />
            <Field className="flex-1 w-full space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                URL do Avatar
              </FieldLabel>
              <Input
                name="avatar_url"
                type="url"
                placeholder="https://..."
                defaultValue={imageUrl || ""}
                onChange={(e) => setImageUrl(e.target.value)}
                className="rounded-xl bg-muted/10 border-border/60 focus:border-primary/50"
              />
            </Field>
          </div>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Nome
              </FieldLabel>
              <Input
                name="name"
                defaultValue={profile?.name || ""}
                className="rounded-xl bg-background border-border/60 focus:border-primary/50 font-bold"
                required
              />
              <FieldError>{state?.errors?.name}</FieldError>
            </Field>
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Sobrenome
              </FieldLabel>
              <Input
                name="surname"
                defaultValue={profile?.surname || ""}
                className="rounded-xl bg-background border-border/60 focus:border-primary/50 font-bold"
              />
              <FieldError>{state?.errors?.surname}</FieldError>
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Email
              </FieldLabel>
              <Input
                defaultValue={profile?.email || ""}
                disabled
                className="rounded-xl bg-muted/20 border-border/40 opacity-60 font-bold"
              />
            </Field>
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Telefone
              </FieldLabel>
              <Input
                name="phone"
                type="tel"
                placeholder="912 345 678"
                defaultValue={profile?.phone || ""}
                className="rounded-xl bg-background border-border/60 focus:border-primary/50 font-bold"
              />
              <FieldError>{state?.errors?.phone}</FieldError>
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                País
              </FieldLabel>
              <Input
                name="country"
                defaultValue={profile?.country || ""}
                className="rounded-xl bg-background border-border/60 focus:border-primary/50 font-bold"
              />
            </Field>
            <Field className="space-y-2">
              <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Nascimento
              </FieldLabel>
              <Input
                name="birthdate"
                type="date"
                className="rounded-xl bg-background border-border/60 focus:border-primary/50 font-bold"
                defaultValue={
                  profile?.birthdate
                    ? new Date(profile.birthdate).toISOString().split("T")[0]
                    : undefined
                }
              />
            </Field>
          </FieldGroup>

          <div className="space-y-4">
            <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Gênero
            </FieldLabel>
            <RadioGroup
              name="gender"
              defaultValue={gender || ""}
              onValueChange={setGender}
              className="grid grid-cols-2 gap-4"
            >
              {["male", "female"].map((g) => (
                <label key={g} className="cursor-pointer group">
                  <div
                    className={`relative flex items-center justify-between p-4 rounded-xl border border-border/60 transition-all ${gender === g ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/40"}`}
                  >
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${gender === g ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {g === "male" ? "Masculino" : "Feminino"}
                    </span>
                    <RadioGroupItem value={g} id={g} className="text-primary" />
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          <Button
            disabled={pending}
            className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest bg-foreground text-background hover:bg-primary shadow-xl shadow-primary/10 transition-all active:scale-95 gap-3"
          >
            {pending ? (
              "A Guardar..."
            ) : (
              <>
                <Save size={18} strokeWidth={3} /> Guardar Alterações
              </>
            )}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
