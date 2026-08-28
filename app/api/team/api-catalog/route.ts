import { NextResponse } from "next/server";

import { hasTeamPermission } from "../../../../lib/team-permissions";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";

const apis = [
  {
    id: "team-dashboard",
    name: "Team Dashboard",
    path: "/api/team/dashboard",
    methods: ["GET"],
    description: "بيانات وإحصائيات لوحة الفريق.",
  },
  {
    id: "team-members",
    name: "Team Members",
    path: "/api/team/members",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    description: "إدارة أعضاء الفريق.",
  },
  {
    id: "team-permissions",
    name: "Team Permissions",
    path: "/api/team/permissions",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    description: "إدارة صلاحيات الفريق.",
  },
  {
    id: "team-service-requests",
    name: "Team Service Requests",
    path: "/api/team/service-requests",
    methods: ["GET", "PATCH"],
    description: "متابعة وتحديث طلبات الخدمات.",
  },
  {
    id: "service-requests",
    name: "Service Requests",
    path: "/api/service-requests",
    methods: ["GET", "POST", "PATCH"],
    description: "طلبات الخدمات العامة.",
  },
  {
    id: "exchange-rate",
    name: "Exchange Rate",
    path: "/api/exchange-rate",
    methods: ["GET"],
    description: "أسعار الصرف.",
  },
  {
    id: "ai-chat",
    name: "AI Chat",
    path: "/api/ai/chat",
    methods: ["POST"],
    description: "واجهة المحادثة مع الذكاء الاصطناعي.",
  },
  {
    id: "whatsapp-webhook",
    name: "WhatsApp Webhook",
    path: "/api/whatsapp/webhook",
    methods: ["GET", "POST"],
    description: "Webhook الخاص بواتساب.",
  },
  {
    id: "system-health",
    name: "System Health",
    path: "/api/team/system-health",
    methods: ["GET"],
    description: "فحص حالة الخدمات الأساسية.",
  },
];

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
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
    return NextResponse.json({
      apis,
      count: apis.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "تعذر تحميل قائمة APIs.",
      },
      { status: 500 },
    );
  }
}
