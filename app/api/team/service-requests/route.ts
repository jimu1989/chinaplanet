import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { hasTeamPermission } from "../../../../lib/team-permissions";

import { logError } from "../../../../lib/team-logs/store";
async function getTeamUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, role: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    supabase,
    user,
    role: profile?.role ?? null,
  };
}

async function requireServiceRequestsPermission() {
  const { supabase, user, role } = await getTeamUser();

  if (!user) {
    return {
      supabase,
      user: null,
      role: null,
      error: NextResponse.json(
        { error: "يجب تسجيل الدخول أولًا." },
        { status: 401 }
      ),
    };
  }

  if (!role) {
    return {
      supabase,
      user,
      role: null,
      error: NextResponse.json(
        { error: "لا يوجد دور مرتبط بحسابك." },
        { status: 403 }
      ),
    };
  }

  const allowed = await hasTeamPermission("manage_project");

  if (!allowed) {
    return {
      supabase,
      user,
      role,
      error: NextResponse.json(
        { error: "ليس لديك صلاحية إدارة طلبات العملاء." },
        { status: 403 }
      ),
    };
  }

  return {
    supabase,
    user,
    role,
    error: null,
  };
}

export async function GET() {
  try {
    const authorization = await requireServiceRequestsPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const { supabase } = authorization;

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        "id, name, email, phone, service, details, language, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      logError(
        "Team service requests GET failed",
        "/api/team/service-requests",
        {
          method: "GET",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

      return NextResponse.json(
        { error: "تعذر تحميل طلبات الخدمة." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      requests: data ?? [],
    });
  } catch (error) {
    logError(
        "Team service requests GET failed",
        "/api/team/service-requests",
        {
          method: "GET",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

    return NextResponse.json(
      { error: "حدث خطأ أثناء تحميل طلبات الخدمة." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authorization = await requireServiceRequestsPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const { supabase } = authorization;

    let body: {
      id?: string;
      status?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "بيانات الطلب غير صحيحة." },
        { status: 400 }
      );
    }

    const id = String(body.id || "").trim();
    const status = String(body.status || "").trim();

    const allowedStatuses = [
      "new",
      "contacted",
      "completed",
      "cancelled",
    ];

    if (!id || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "بيانات غير صحيحة." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", id)
      .select(
        "id, name, email, phone, service, details, language, status, created_at"
      )
      .maybeSingle();

    if (error) {
      logError(
        "Team service request PATCH failed",
        "/api/team/service-requests",
        {
          method: "PATCH",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

      return NextResponse.json(
        { error: "تعذر تحديث حالة الطلب." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "الطلب غير موجود." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: data,
    });
  } catch (error) {
    logError(
        "Team service request PATCH failed",
        "/api/team/service-requests",
        {
          method: "PATCH",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

    return NextResponse.json(
      { error: "حدث خطأ أثناء تحديث الطلب." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const authorization = await requireServiceRequestsPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const { supabase, role } = authorization;

    if (role !== "admin" && role !== "executive") {
      return NextResponse.json(
        { error: "ليس لديك صلاحية حذف طلبات العملاء." },
        { status: 403 }
      );
    }

    let body: {
      id?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "بيانات الطلب غير صحيحة." },
        { status: 400 }
      );
    }

    const id = String(body.id || "").trim();

    if (!id) {
      return NextResponse.json(
        { error: "معرف الطلب مطلوب." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("service_requests")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error) {
      logError(
        "Team service request DELETE failed",
        "/api/team/service-requests",
        {
          method: "DELETE",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

      return NextResponse.json(
        { error: "تعذر حذف طلب الخدمة." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "الطلب غير موجود." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف طلب الخدمة بنجاح.",
      request_id: data.id,
    });
  } catch (error) {
    logError(
        "Team service request DELETE failed",
        "/api/team/service-requests",
        {
          method: "DELETE",
          error: error instanceof Error ? error.message : "unknown error",
        },
      );

    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف طلب الخدمة." },
      { status: 500 }
    );
  }
}
