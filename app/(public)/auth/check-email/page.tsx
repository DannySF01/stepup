import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function CheckEmail() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Mail className="text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-3">Check your email</h1>
          <p className="text-muted-foreground">
            We sent an email to your email address.
          </p>
          <p className="text-muted-foreground">
            If you don&apos;t receive an email, check your spam folder.
          </p>
        </div>
        <Button>
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  );
}
