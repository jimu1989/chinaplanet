import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

import { logError } from "../../../../lib/team-logs/store";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    logError(
      "Team permissions authorization check failed",
      "/api/team/permissions",
      {
        error: error instanceof Error
          ? error.message
          : "unknown error",
      },
    );
  }

  return {
    supabase,
    user,
  };
}

async function authorize() {
  const { supabase, user } = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json(
        {
          error:
            "لم يتم العثور على جلسة تسجيل الدخول. سجّل الخروج ثم ادخل إلى حساب المدير التنفيذي مرة أخرى.",
        },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    logError(
      "TEAM PERMISSIONS PROFILE ERROR:",
      "/api/team/permissions",
      {
        method: "UNKNOWN",
        error:
          profileError instanceof Error
            ? profileError.message
            : "unknown error",
      },
    );

    return {
      error: NextResponse.json(
        {
          error:
            "تم تسجيل الدخول، لكن تعذر قراءة صلاحيات الحساب.",
        },
        { status: 500 }
      ),
    };
  }

  if (!profile) {
    return {
      error: NextResponse.json(
        {
          error:
            "الحساب مسجل الدخول، لكن لا يوجد له ملف في profiles.",
        },
        { status: 403 }
      ),
    };
  }

  const { hasTeamPermission } = await import(
    "../../../../lib/team-permissions"
  );

  const allowed = await hasTeamPermission(
    "manage_permissions"
  );

  if (!allowed) {
    return {
      error: NextResponse.json(
        {
          error:
            "هذا الحساب لا يملك صلاحية إدارة الصلاحيات.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    error: null,
    user,
    profile,
  };
}

function createAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function GET() {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const authorization = await authorize();

    if (authorization.error) {
      return authorization.error;
    }

    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await admin
      .from("role_permissions")
      .select(
        "id, role, permission, enabled"
      )
      .order("role")
      .order("permission");

    if (error) {
      logError(
      "ROLE PERMISSIONS GET ERROR:",
      "/api/team/permissions",
      {
        method: "UNKNOWN",
        error:
          error instanceof Error
            ? error.message
            : "unknown error",
      },
    );

      return NextResponse.json(
        {
          error:
            "تعذر قراءة جدول role_permissions.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      permissions: data ?? [],
    });
  } catch (error) {
    logError(
      "TEAM PERMISSIONS GET ERROR:",
      "/api/team/permissions",
      {
        method: "UNKNOWN",
        error:
          error instanceof Error
            ? error.message
            : "unknown error",
      },
    );

    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const authorization = await authorize();

    if (authorization.error) {
      return authorization.error;
    }

    const body = await request.json();

    const id = Number(body.id);
    const enabled = body.enabled === true;

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          error: "معرف الصلاحية غير صالح.",
        },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await admin
      .from("role_permissions")
      .update({
        enabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        "id, role, permission, enabled"
      )
      .single();

    if (error) {
      logError(
      "ROLE PERMISSIONS UPDATE ERROR:",
      "/api/team/permissions",
      {
        method: "UNKNOWN",
        error:
          error instanceof Error
            ? error.message
            : "unknown error",
      },
    );

      return NextResponse.json(
        {
          error:
            "تعذر تحديث الصلاحية.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      permission: data,
    });
  } catch (error) {
    logError(
      "TEAM PERMISSIONS PATCH ERROR:",
      "/api/team/permissions",
      {
        method: "UNKNOWN",
        error:
          error instanceof Error
            ? error.message
            : "unknown error",
      },
    );

    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع.",
      },
      { status: 500 }
    );
  }
}
