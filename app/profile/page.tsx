import ProfileInfo from "@/components/profile/ProfileInfo";
import { createServer } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return <ProfileInfo profile={profile} />;
}
