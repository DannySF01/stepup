"use client";
import { Button } from "@/components/ui/Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { updatePassword } from "@/services/authService";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "error",
        description: "Passwords must match",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "error",
        description: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await updatePassword(password);
      if (error) throw error;
      toast({ variant: "info", description: "Password updated successfully" });
      router.push("/auth/login");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <FieldSet className="w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <p className="text-muted-foreground text-balance">
                Enter your new password below.
              </p>
            </div>
            <Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit">Reset Password</Button>
            </Field>
          </FieldGroup>
        </form>
      </FieldSet>
    </div>
  );
}
