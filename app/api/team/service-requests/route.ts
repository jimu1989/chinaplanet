import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

const allowedRoles = ["executive", "admin", "support"];

async function getTeamUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, role: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return { supabase, user, role: profile?.role ?? null };
}

export async function GET() {
  const { supabase, user, role } = await getTeamUser();

  if (!user) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  if (!role || !allowedRoles.includes(role)) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("service_requests")
    .select(
      "id, name, email, phone, service, details, language, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "تعذر تحميل طلبات الخدمة." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    requests: data ?? [],
  });
}

export async function PATCH(request: Request) {
  const { supabase, user, role } = await getTeamUser();

  if (!user) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  if (!role || !allowedRoles.includes(role)) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 403 });
  }

  let body: { id?: string; status?: string };

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

  const { error } = await supabase
    .from("service_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(
      "TEAM SERVICE REQUEST PATCH ERROR:",
      JSON.stringify({
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })
    );

    return NextResponse.json(
      {
        error: "تعذر تحديث الطلب.",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    id,
    status,
  });
}

export async function DELETE(request: Request) {
  const { supabase, user, role } = await getTeamUser();

  if (!user) {
    return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
  }

  if (role !== "admin" && role !== "executive") {
    return NextResponse.json(
      { error: "الحذف متاح للمدير فقط." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const id = String(body.id || "");

  if (!id) {
    return NextResponse.json({ error: "معرف الطلب مطلوب." }, { status: 400 });
  }

  const { error } = await supabase
    .from("service_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "تعذر حذف الطلب." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
