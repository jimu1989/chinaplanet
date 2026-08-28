import { NextResponse } from "next/server";

import { hasTeamPermission } from "../../../../lib/team-permissions";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { logError, logInfo, logWarn } from "../../../../lib/team-logs/store";

type CheckResult = {
  name: string;
  status: "operational" | "warning" | "error";
  latency_ms: number;
  message: string;
};

async function timedCheck(
  name: string,
  check: () => Promise<void>,
): Promise<CheckResult> {
  const started = performance.now();

  try {
    await check();

    const latency = Math.round(performance.now() - started);

    logInfo(
      "System health check completed",
      "/api/team/system-health",
      {
        check: name,
        status: "operational",
        duration_ms: latency,
      },
    );

    return {
      name,
      status: "operational",
      latency_ms: latency,
      message: "الخدمة تعمل بشكل طبيعي.",
    };
  } catch (error) {
    const latency = Math.round(performance.now() - started);

    logWarn(
      "System health check failed",
      "/api/team/system-health",
      {
        check: name,
        status: "error",
        duration_ms: latency,
      },
    );

    return {
      name,
      status: "error",
      latency_ms: latency,
      message:
        error instanceof Error
          ? error.message
          : "تعذر فحص الخدمة.",
    };
  }
}

export async function GET() {
  const started = performance.now();

  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول." },
        { status: 401 },
      );
    }

    const allowed = await hasTeamPermission("manage_project");

    if (!allowed) {
      return NextResponse.json(
        { error: "لا تملك صلاحية الوصول إلى أدوات التطوير." },
        { status: 403 },
      );
    }
    logInfo(
      "System health check started",
      "/api/team/system-health",
      {
        method: "GET",
      },
    );

    const checks: CheckResult[] = [];

    checks.push({
      name: "Next.js",
      status: "operational",
      latency_ms: Math.round(performance.now() - started),
      message: "الخادم يعمل ويستجيب.",
    });

    checks.push(
      await timedCheck("Supabase", async () => {
        const { error } = await supabase
          .from("profiles")
          .select("id")
          .limit(1);

        if (error) throw error;
      }),
    );

    checks.push(
      await timedCheck("Database", async () => {
        const { error } = await supabase
          .from("profiles")
          .select("id")
          .limit(1);

        if (error) throw error;
      }),
    );

    const errors = checks.filter((check) => check.status === "error").length;

    const totalLatency = Math.round(performance.now() - started);
    const overallStatus =
      errors === 0 ? "operational" : "degraded";

    if (errors === 0) {
      logInfo(
        "System health check completed",
        "/api/team/system-health",
        {
          status: overallStatus,
          checks: checks.length,
          errors,
          duration_ms: totalLatency,
        },
      );
    } else {
      logWarn(
        "System health check completed with errors",
        "/api/team/system-health",
        {
          status: overallStatus,
          checks: checks.length,
          errors,
          duration_ms: totalLatency,
        },
      );
    }

    return NextResponse.json({
      status: overallStatus,
      checked_at: new Date().toISOString(),
      total_latency_ms: totalLatency,
      checks,
    });
  } catch (error) {
    logError(
      "System health request failed",
      "/api/team/system-health",
      {
        method: "GET",
        duration_ms: Math.round(performance.now() - started),
      },
    );

    return NextResponse.json(
      {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء فحص النظام.",
      },
      { status: 500 },
    );
  }
}
