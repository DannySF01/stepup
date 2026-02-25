import { Button } from "@/components/ui/Button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground text-balance">
              No problem. Just let us know your email address and we will email
              you a password reset link that will allow you to choose a new one.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="text" placeholder="m@example.com" />
          </Field>
          <Field>
            <Button type="submit">Send Reset Link</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
