"use server";

import { createServer } from "@/lib/supabase/server";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  surname: z.string().min(2, "Sobrenome obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  tax: z.string().min(2, "Taxa obrigatória"),
  address: z.string().min(5, "Morada obrigatória"),
  city: z.string().min(2, "Cidade obrigatória"),
  postal_code: z.string().regex(/^\d{4}-\d{3}$/, "Código postal inválido"),
  country: z.string().min(2, "Pais obrigatório"),
  district: z.string().min(2, "Distrito obrigatório"),
});

export async function createAddress(prevState: any, formData: FormData) {
  const supabase = await createServer();

  const parsed = checkoutSchema.safeParse({
    name: formData.get("checkout-name"),
    surname: formData.get("checkout-surname"),
    email: formData.get("checkout-email"),
    phone: formData.get("checkout-phone"),
    tax: formData.get("checkout-tax"),
    address: formData.get("checkout-address"),
    city: formData.get("checkout-city"),
    postal_code: formData.get("checkout-postalCode"),
    country: formData.get("checkout-country"),
    district: formData.get("checkout-district"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const shipping = parsed.data;

  const newAddress = {
    ...shipping,
    is_default: true,
  };

  const { error } = await supabase.from("addresses").insert(newAddress);

  if (error) {
    console.error(error.message);
    return { success: false, message: "Ocorreu um erro" };
  }

  return { success: true };
}
