"use client";
import { Button } from "@/components/ui/Button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { resetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast({ variant: "error", description: "An error occurred" });
        throw error;
      }
      router.push("/auth/check-email");
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forgot your password?</h1>
                <p className="text-muted-foreground text-balance">
                  No problem. Just let us know your email address and we will
                  email you a password reset link that will allow you to choose
                  a new one.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Send Reset Link</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}
