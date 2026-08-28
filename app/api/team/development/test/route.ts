import { NextResponse } from "next/server";

import { hasTeamPermission } from "../../../../../lib/team-permissions";
import { logError, logInfo } from "../../../../../lib/team-logs/store";

const ALLOWED_ENDPOINTS = new Set([
  "/api/team/dashboard",
  "/api/team/api-catalog",
  "/api/team/system-health",
  "/api/team/service-requests",
]);

const REQUEST_TIMEOUT_MS = 10000;

export async function POST(request: Request) {
  try {
    const allowed = await hasTeamPermission("manage_project");

    if (!allowed) {
      return NextResponse.json(
        { error: "لا تملك صلاحية استخدام أداة اختبار API." },
        { status: 403 },
      );
    }

    let body: {
      path?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "بيانات الطلب غير صحيحة." },
        { status: 400 },
      );
    }

    const path = typeof body.path === "string"
      ? body.path.trim()
      : "";

    if (!ALLOWED_ENDPOINTS.has(path)) {
      return NextResponse.json(
        { error: "واجهة API غير مسموح باختبارها." },
        { status: 400 },
      );
    }

    logInfo(
      "API test started",
      path,
      {
        method: "GET",
      },
    );

    const origin = new URL(request.url).origin;
    const target = new URL(path, origin);

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS,
    );

    const started = performance.now();

    try {
      const response = await fetch(target, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      const duration = Math.round(
        performance.now() - started,
      );

      const contentType =
        response.headers.get("content-type") || "";

      let responseBody: unknown;

      if (contentType.includes("application/json")) {
        try {
          responseBody = await response.json();
        } catch {
          responseBody = await response.text();
        }
      } else {
        responseBody = await response.text();
      }

      logInfo(
        response.ok
          ? "API test completed"
          : "API test returned error status",
        path,
        {
          method: "GET",
          status: response.status,
          duration_ms: duration,
        },
      );

      return NextResponse.json({
        success: response.ok,
        status: response.status,
        duration_ms: duration,
        content_type: contentType,
        response: responseBody,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return NextResponse.json(
        {
          error: "انتهت مهلة اختبار API بعد 10 ثوانٍ.",
        },
        { status: 504 },
      );
    }

    logError(
      "API test failed",
      undefined,
      {
        method: "GET",
        error:
          error instanceof Error
            ? error.message
            : "Unknown API test error",
      },
    );


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "تعذر تنفيذ اختبار API.",
      },
      { status: 500 },
    );
  }
}
