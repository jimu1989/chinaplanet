import { createSupabaseServerClient } from "./supabase-server";

export type TeamPermission =
  | "manage_team"
  | "manage_permissions"
  | "manage_project";

type Profile = {
  id: string;
  role: string | null;
};

type PermissionRow = {
  enabled: boolean;
};

export async function getCurrentTeamUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      supabase,
      user: null,
      profile: null,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      supabase,
      user,
      profile: null,
    };
  }

  return {
    supabase,
    user,
    profile: profile as Profile,
  };
}

export async function hasTeamPermission(
  permission: TeamPermission
) {
  const { supabase, user, profile } =
    await getCurrentTeamUser();

  if (!user || !profile?.role) {
    return false;
  }

  const { data, error } = await supabase
    .from("role_permissions")
    .select("enabled")
    .eq("role", profile.role)
    .eq("permission", permission)
    .maybeSingle();

  if (error) {
    console.error(
      "TEAM PERMISSION CHECK ERROR:",
      error
    );

    return false;
  }

  const permissionRow = data as PermissionRow | null;

  return permissionRow?.enabled === true;
}
