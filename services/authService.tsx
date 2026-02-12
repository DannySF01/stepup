"use client";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function signUp(email: string, password: string, options: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...options,
      },
    },
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getProfile(userId: string) {
  return await supabase.from("profiles").select("*").eq("id", userId).single();
}
