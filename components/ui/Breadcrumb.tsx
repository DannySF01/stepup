"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  // Split the path and filter out empty strings
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex list-none gap-2">
        <li className="flex cursor-pointer items-center text-sm text-foreground transition-colors duration-300 hover:text-accent-foreground">
          <Link href="/">Home</Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex gap-2">
              <span>/</span>
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold capitalize flex cursor-pointer items-center text-sm text-foreground transition-colors duration-300 hover:text-accent-foreground"
                >
                  {segment.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="capitalize flex cursor-pointer items-center text-sm text-foreground transition-colors duration-300 hover:text-accent-foreground"
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
