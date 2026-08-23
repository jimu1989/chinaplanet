import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getCurrentTeamUser,
  hasTeamPermission,
} from "../../../../lib/team-permissions";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const allowedRoles = [
  "executive",
  "admin",
  "developer",
  "designer",
  "editor",
  "support",
  "member",
];

function createAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function requireManageTeamPermission() {
  const { user, profile } = await getCurrentTeamUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: "يجب تسجيل الدخول أولًا." },
        { status: 401 }
      ),
      user: null,
      profile: null,
    };
  }

  if (!profile?.role) {
    return {
      error: NextResponse.json(
        { error: "لا يوجد دور مرتبط بحسابك." },
        { status: 403 }
      ),
      user,
      profile,
    };
  }

  const allowed = await hasTeamPermission("manage_team");

  if (!allowed) {
    return {
      error: NextResponse.json(
        { error: "ليس لديك صلاحية إدارة الفريق." },
        { status: 403 }
      ),
      user,
      profile,
    };
  }

  return {
    error: null,
    user,
    profile,
  };
}

export async function GET() {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const authorization = await requireManageTeamPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const { data: profiles, error: profilesError } =
      await admin
        .from("profiles")
        .select(
          "id, full_name, phone, role, created_at, updated_at"
        )
        .order("created_at", { ascending: false });

    if (profilesError) {
      console.error(
        "TEAM MEMBERS PROFILE ERROR:",
        profilesError
      );

      return NextResponse.json(
        { error: "تعذر تحميل أعضاء الفريق." },
        { status: 500 }
      );
    }

    const { data: usersData, error: usersError } =
      await admin.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });

    if (usersError) {
      console.error(
        "TEAM MEMBERS AUTH ERROR:",
        usersError
      );

      return NextResponse.json(
        { error: "تعذر تحميل حسابات الفريق." },
        { status: 500 }
      );
    }

    const emailById = new Map(
      usersData.users.map((authUser) => [
        authUser.id,
        authUser.email || null,
      ])
    );

    const members = (profiles || []).map((profile) => ({
      ...profile,
      email: emailById.get(profile.id) || null,
    }));

    return NextResponse.json({ members });
  } catch (error) {
    console.error("TEAM MEMBERS GET ERROR:", error);

    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const authorization = await requireManageTeamPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const currentRole = authorization.profile?.role;

    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    const fullName = String(body.full_name || "").trim();

    const phone = String(body.phone || "").trim();

    const role = String(body.role || "member").trim();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        {
          error:
            "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "كلمة المرور يجب أن تكون 8 أحرف على الأقل.",
        },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "الدور غير صالح." },
        { status: 400 }
      );
    }

    /*
     * مدير النظام لا يستطيع إنشاء مدير نظام آخر
     * ولا يستطيع إنشاء مدير تنفيذي.
     *
     * المدير التنفيذي يستطيع إنشاء أي دور.
     */
    if (
      currentRole === "admin" &&
      (role === "executive" || role === "admin")
    ) {
      return NextResponse.json(
        {
          error:
            "لا يمكن لمدير النظام إنشاء مدير نظام أو مدير تنفيذي.",
        },
        { status: 403 }
      );
    }

    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const { data: createdUser, error: authError } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !createdUser.user) {
      console.error("AUTH CREATE ERROR:", authError);

      return NextResponse.json(
        {
          error:
            authError?.message ||
            "تعذر إنشاء حساب المستخدم.",
        },
        { status: 400 }
      );
    }

    const { error: profileError } = await admin
      .from("profiles")
      .upsert({
        id: createdUser.user.id,
        full_name: fullName,
        phone: phone || null,
        role,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error(
        "PROFILE CREATE ERROR:",
        profileError
      );

      await admin.auth.admin.deleteUser(
        createdUser.user.id
      );

      return NextResponse.json(
        {
          error:
            "تم إنشاء الحساب لكن تعذر إنشاء ملف الفريق: " +
            profileError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        member: {
          id: createdUser.user.id,
          email: createdUser.user.email || email,
          full_name: fullName,
          phone,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "TEAM MEMBER CREATE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const authorization = await requireManageTeamPermission();

    if (authorization.error) {
      return authorization.error;
    }

    const currentUserId = authorization.user?.id;

    const currentRole = authorization.profile?.role;

    const body = await request.json();

    const memberId = String(body.id || "").trim();

    if (!memberId) {
      return NextResponse.json(
        { error: "معرف العضو مطلوب." },
        { status: 400 }
      );
    }

    if (memberId === currentUserId) {
      return NextResponse.json(
        {
          error: "لا يمكنك حذف حسابك من هنا.",
        },
        { status: 403 }
      );
    }

    const admin = createAdminClient();

    if (!admin) {
      return NextResponse.json(
        {
          error: "Supabase server configuration is missing.",
        },
        { status: 500 }
      );
    }

    const { data: targetProfile, error: targetError } =
      await admin
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", memberId)
        .maybeSingle();

    if (targetError) {
      console.error(
        "TEAM MEMBER DELETE PROFILE ERROR:",
        targetError
      );

      return NextResponse.json(
        { error: "تعذر العثور على العضو." },
        { status: 500 }
      );
    }

    if (!targetProfile) {
      return NextResponse.json(
        { error: "العضو غير موجود." },
        { status: 404 }
      );
    }

    /*
     * مدير النظام لا يستطيع حذف مدير النظام
     * أو المدير التنفيذي.
     */
    if (
      currentRole === "admin" &&
      (targetProfile.role === "executive" ||
        targetProfile.role === "admin")
    ) {
      return NextResponse.json(
        {
          error:
            "لا يمكن لمدير النظام حذف مدير النظام أو المدير التنفيذي.",
        },
        { status: 403 }
      );
    }

    const { error: deleteAuthError } =
      await admin.auth.admin.deleteUser(memberId);

    if (deleteAuthError) {
      console.error(
        "TEAM MEMBER DELETE AUTH ERROR:",
        deleteAuthError
      );

      return NextResponse.json(
        {
          error:
            deleteAuthError.message ||
            "تعذر حذف حساب العضو.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف العضو بنجاح.",
      member_id: memberId,
    });
  } catch (error) {
    console.error(
      "TEAM MEMBER DELETE ERROR:",
      error
    );

    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
