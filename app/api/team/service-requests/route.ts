import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

const allowedRoles = ["executive", "admin", "support"];

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "غير مصرح." }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("TEAM SERVICE REQUEST PROFILE ERROR:", profileError);
      return NextResponse.json(
        { error: "تعذر التحقق من الصلاحية." },
        { status: 500 }
      );
    }

    if (!profile?.role || !allowedRoles.includes(profile.role)) {
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
      console.error("TEAM SERVICE REQUESTS ERROR:", error);
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
    console.error("TEAM SERVICE REQUESTS API ERROR:", error);

    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
