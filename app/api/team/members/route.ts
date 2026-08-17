import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "../../../lib/supabase-server";

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

async function getAuthorizedUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      user: null,
      profile: null,
      error: NextResponse.json(
        { error: "يجب تسجيل الدخول أولًا." },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("TEAM PROFILE ERROR:", profileError);

    return {
      supabase,
      user,
      profile: null,
      error: NextResponse.json(
        { error: "تعذر التحقق من صلاحيات الحساب." },
        { status: 500 }
      ),
    };
  }

  if (
    profile?.role !== "executive" &&
    profile?.role !== "admin"
  ) {
    return {
      supabase,
      user,
      profile,
      error: NextResponse.json(
        { error: "ليس لديك صلاحية إدارة الفريق." },
        { status: 403 }
      ),
    };
  }

  return {
    supabase,
    user,
    profile,
    error: null,
  };
}

export async function GET() {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Supabase server configuration is missing." },
        { status: 500 }
      );
    }

    const auth = await getAuthorizedUser();

    if (auth.error) {
      return auth.error;
    }

    const admin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: profiles, error: profilesError } = await admin
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
        { error: "Supabase server configuration is missing." },
        { status: 500 }
      );
    }

    const auth = await getAuthorizedUser();

    if (auth.error) {
      return auth.error;
    }

    const currentRole = auth.profile?.role;

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

    const admin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

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
