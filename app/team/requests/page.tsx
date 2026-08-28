import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabase-server";
import RequestsClient from "./requests-client";

const allowedRoles = ["executive", "admin", "support"];

export default async function TeamRequestsPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/team/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? null;

  if (!role || !allowedRoles.includes(role)) {
    redirect("/team");
  }

  return (
    <RequestsClient
      isAdmin={role === "admin" || role === "executive"}
    />
  );
}
