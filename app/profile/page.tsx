import ProfileInfo from "@/components/profile/ProfileInfo";
import { createServer } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = await createServer();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .single();

  return <ProfileInfo profile={profile} />;
}
