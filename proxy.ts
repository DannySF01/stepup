// utils/supabase/middleware.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirecionar para a login se o utilizador nao estiver autenticado
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

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Aplica o middleware em todas as rotas exceto arquivos estáticos e imagens
    "/((?!_next/static|_next/image||.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
