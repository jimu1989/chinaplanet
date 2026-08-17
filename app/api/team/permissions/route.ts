import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("TEAM PERMISSIONS AUTH ERROR:", error);
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
    console.error(
      "TEAM PERMISSIONS PROFILE ERROR:",
      profileError
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

  if (
    profile.role !== "executive" &&
    profile.role !== "admin"
  ) {
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
      console.error(
        "ROLE PERMISSIONS GET ERROR:",
        error
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
    console.error(
      "TEAM PERMISSIONS GET ERROR:",
      error
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
      console.error(
        "ROLE PERMISSIONS UPDATE ERROR:",
        error
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
    console.error(
      "TEAM PERMISSIONS PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع.",
      },
      { status: 500 }
    );
  }
}
