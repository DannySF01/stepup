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

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-balance">
              Fill in the form below to create your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <Field className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required />
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
      </FieldSet>
    </div>
  );
}
