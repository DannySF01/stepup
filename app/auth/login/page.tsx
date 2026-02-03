"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your StepUp account
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="text" placeholder="m@example.com" />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </Field>
            <Field>
              <Button type="submit">Login</Button>
            </Field>
          </FieldGroup>
          <FieldDescription>
            Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
          </FieldDescription>
        </FieldSet>
      </form>
    </div>
  );
}
