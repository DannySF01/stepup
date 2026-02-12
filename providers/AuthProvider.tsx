"use client";

import { createContext, useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import { Profile } from "@/lib/types/database.types";
import { createClient } from "@/lib/supabase/client";
import { getProfile } from "@/services/authService";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  initialUser,
  initialProfile,
  children,
}: {
  initialUser: User | null;
  initialProfile: Profile | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [profile, setProfile] = useState(initialProfile || null);

  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id).then(({ data: profile }) =>
            setProfile(profile),
          );
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile }}>
      {children}
    </AuthContext.Provider>
  );
}
