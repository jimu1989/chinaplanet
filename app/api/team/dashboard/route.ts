import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { hasTeamPermission } from "../../../../lib/team-permissions";


import { logError } from "../../../../lib/team-logs/store";
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "غير مصرح." },
        { status: 401 }
      );
    }

    const allowed = await hasTeamPermission("manage_project");

    if (!allowed) {
      return NextResponse.json(
        { error: "هذا الحساب لا يملك صلاحية إدارة المشروع." },
        { status: 403 }
      );
    }

    const { data: requests, error: requestsError } = await supabase
      .from("service_requests")
      .select(
        "id, name, email, phone, service, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (requestsError) {
      logError(
        "Dashboard requests query failed",
        "/api/team/dashboard",
        {
          source: "requests",
          error: requestsError instanceof Error
            ? requestsError.message
            : "unknown error",
        },
      );

      return NextResponse.json(
        { error: "تعذر تحميل إحصائيات الطلبات." },
        { status: 500 }
      );
    }

    const allRequests = requests ?? [];

    const total = allRequests.length;

    const newRequests = allRequests.filter(
      (request) => request.status === "new"
    ).length;

    const contacted = allRequests.filter(
      (request) => request.status === "contacted"
    ).length;

    const completed = allRequests.filter(
      (request) => request.status === "completed"
    ).length;

    const cancelled = allRequests.filter(
      (request) => request.status === "cancelled"
    ).length;

    const serviceCounts: Record<string, number> = {};

    for (const request of allRequests) {
      const service = request.service || "غير محدد";
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    }

    const services = Object.entries(serviceCounts)
      .map(([service, count]) => ({
        service,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recentRequests = allRequests.slice(0, 5);

    const { count: membersCount, error: membersError } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });

    if (membersError) {
      logError(
        "Dashboard members query failed",
        "/api/team/dashboard",
        {
          source: "members",
          error: membersError instanceof Error
            ? membersError.message
            : "unknown error",
        },
      );
    }

    return NextResponse.json({
      success: true,
      stats: {
        total,
        new: newRequests,
        contacted,
        completed,
        cancelled,
        members: membersCount ?? 0,
      },
      services,
      recentRequests,
    });
  } catch (error) {
    logError(
      "Team dashboard request failed",
      "/api/team/dashboard",
      {
        error: error instanceof Error
          ? error.message
          : "unknown error",
      },
    );

    return NextResponse.json(
      { error: "حدث خطأ أثناء تحميل لوحة التحكم." },
      { status: 500 }
    );
  }
}
