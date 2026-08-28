import { createSupabaseServerClient } from "./supabase-server";

export const TEAM_ROLES = [
  "executive",
  "developer",
  "admin",
  "designer",
  "editor",
  "support",
  "member",
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

export const TEAM_PERMISSIONS = [
  "manage_team",
  "manage_permissions",
  "manage_project",
] as const;

export type TeamPermission = (typeof TEAM_PERMISSIONS)[number];

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

  // المدير التنفيذي هو أعلى مستوى.
  if (profile.role === "executive") {
    return true;
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

export async function requireTeamPermission(
  permission: TeamPermission
) {
  const { user, profile } =
    await getCurrentTeamUser();

  if (!user) {
    return {
      allowed: false,
      status: 401,
      error: "يجب تسجيل الدخول أولًا.",
      user: null,
      profile: null,
    };
  }

  if (!profile?.role) {
    return {
      allowed: false,
      status: 403,
      error: "لا يوجد دور مرتبط بحسابك.",
      user,
      profile,
    };
  }

  const allowed = await hasTeamPermission(permission);

  if (!allowed) {
    return {
      allowed: false,
      status: 403,
      error: "ليس لديك الصلاحية المطلوبة.",
      user,
      profile,
    };
  }

  return {
    allowed: true,
    status: 200,
    error: null,
    user,
    profile,
  };
}
