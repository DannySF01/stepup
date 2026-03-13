import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // ATENÇÃO: Forçar o domínio para partilhar o cookie
            request.cookies.set(name, value);
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const url = request.nextUrl;
  const hostname = request.headers.get("host");

  const isAdminSubdomain = hostname?.startsWith("admin.localhost:3000");

  if (isAdminSubdomain) {
    if (!url.pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${url.pathname}`, url));
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminSubdomain && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!user && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/favorites")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/cart")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirecionar para a home se o utilizador estiver autenticado
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (user && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
