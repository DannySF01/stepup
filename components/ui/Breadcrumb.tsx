"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex list-none items-center gap-3">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Home size={14} strokeWidth={2.5} />
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-3">
              <ChevronRight
                size={12}
                className="text-border/60"
                strokeWidth={3}
              />

              {isLast ? (
                <span
                  aria-current="page"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic"
                >
                  {segment.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {segment.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
