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
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/services/authService";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(email, password, { name });
      if (error) {
        throw error;
      } else {
        alert("Verifique seu email para confirmar sua conta");
      }
    } catch (error: any) {
      setError(error.message);
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
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground text-balance">
                Fill in the form below to create your account
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <Field className="grid grid-cols-2 gap-4">
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
              </Field>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit">Create Account</Button>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/auth/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </FieldSet>
    </div>
  );
}
