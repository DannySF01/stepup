"use server";

import { createServer } from "@/lib/supabase/server";
import { z } from "zod";

const profileSchema = z.object({
  avatar_url: z.url().optional(),
  name: z
    .string()
    .min(3, { message: "Nome dever ter pelo menos 3 caracteres" }),
  surname: z.string().optional(),
  phone: z
    .string()
    .regex(/^[0-9]{9}$/, {
      message: "O número deve ter exatamente 9 dígitos.",
    })
    .refine((val) => val.startsWith("9"), {
      message: "Números móveis devem começar por 9",
    })
    .optional()
    .or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  birthdate: z.coerce
    .date({
      message: "Formato de data inválido",
    })
    .min(new Date("1900-01-01"), { message: "Data muito antiga" })
    .max(new Date(), { message: "A data não pode ser no futuro" })
    .optional()
    .or(z.literal("")),
  gender: z
    .literal(["male", "female"], {
      message: "Gênero inválido",
    })
    .optional()
    .or(z.literal("")),
});

export default async function updateProfile(
  id: string | undefined,
  avatar_url: string,
  gender: string,
  prevState: any,
  formData: FormData | null,
) {
  const supabase = await createServer();

  if (!formData) return { success: false, message: "Dados inválidos" };

  if (!id) return { success: false, message: "Dados inválidos" };

  const parsed = profileSchema.safeParse({
    avatar_url: avatar_url,
    name: formData.get("name"),
    surname: formData.get("surname"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    birthdate: formData.get("birthdate"),
    gender: gender,
  });
  if (!parsed.success) {
    console.log("parsed", parsed);
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  console.log("parsed", parsed.data.birthdate);

  const updatedProfile = {
    ...parsed.data,
    phone: Number(parsed.data.phone),
    birthdate: new Date(parsed.data.birthdate || new Date()).toISOString(),
  };

  console.log("updatedProfile", updatedProfile);

  const { error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return { success: false, message: "Ocorreu um erro" };
  }

  return { success: true, message: "Perfil atualizado com sucesso" };
}
