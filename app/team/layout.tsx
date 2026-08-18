"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

const supabase = createSupabaseBrowserClient();

type Permission =
  | "manage_team"
  | "manage_permissions"
  | "manage_project";

type Profile = {
  full_name: string | null;
  role: string | null;
};

const roleNames: Record<string, string> = {
  executive: "المدير التنفيذي",
  admin: "مدير النظام",
  developer: "المبرمج",
  designer: "المصمم",
  editor: "المحرر",
  support: "الدعم",
  member: "عضو الفريق",
};

const allNavigation = [
  {
    href: "/team",
    label: "الرئيسية",
    exact: true,
    permission: null,
  },
  {
    href: "/team/members",
    label: "إدارة الفريق",
    permission: "manage_team" as Permission,
  },
  {
    href: "/team/permissions",
    label: "إدارة الصلاحيات",
    permission: "manage_permissions" as Permission,
  },
];

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<
    Record<Permission, boolean>
  >({
    manage_team: false,
    manage_permissions: false,
    manage_project: false,
  });

  const isLoginPage = pathname === "/team/login";

  useEffect(() => {
    let mounted = true;

    const loadTeamSession = async () => {
      if (isLoginPage) {
        if (mounted) setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/team/login");
        return;
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .maybeSingle<Profile>();

      if (profileError || !profile) {
        console.error(
          "TEAM PROFILE ERROR:",
          profileError
        );

        await supabase.auth.signOut();
        router.replace("/team/login");
        return;
      }

      const currentRole = profile.role || "member";

      const nextPermissions: Record<
        Permission,
        boolean
      > = {
        manage_team: false,
        manage_permissions: false,
        manage_project: false,
      };

      try {
        const response = await fetch(
          "/api/team/permissions",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.ok) {
          const result = await response.json();

          for (const item of result.permissions || []) {
            if (
              item.role === currentRole &&
              item.permission in nextPermissions
            ) {
              nextPermissions[
                item.permission as Permission
              ] = item.enabled === true;
            }
          }
        } else {
          console.error(
            "TEAM PERMISSIONS API ERROR:",
            response.status
          );
        }
      } catch (permissionError) {
        console.error(
          "TEAM PERMISSIONS FETCH ERROR:",
          permissionError
        );
      }

      if (!mounted) return;

      setUserName(
        profile.full_name ||
          user.email?.split("@")[0] ||
          "عضو الفريق"
      );

      setRole(currentRole);
      setPermissions(nextPermissions);
      setLoading(false);
    };

    loadTeamSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && !isLoginPage) {
          router.replace("/team/login");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname, router, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f3f0eb]"
      >
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8795e] border-t-transparent" />

          <p className="mt-4 text-xs text-[#786e65]">
            جاري التحقق من الحساب...
          </p>
        </div>
      </main>
    );
  }

  const visibleNavigation = allNavigation.filter(
    (item) =>
      item.permission === null ||
      permissions[item.permission]
  );

  const currentNavigation = visibleNavigation.find(
    (item) => {
      if (item.exact) {
        return pathname === item.href;
      }

      return pathname.startsWith(item.href);
    }
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/team/login");
    router.refresh();
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f3f0eb] text-[#40372f]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#e2d9d1] bg-[#fffdf9]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          {/* LOGO */}
          <Link
            href="/team"
            className="flex shrink-0 items-center gap-3"
          >
            <img
              src="/images/china-planet-logo.png"
              alt="China Planet"
              className="h-auto w-[150px] object-contain sm:w-[180px] lg:w-[200px]"
            />

            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-wide text-[#40372f]">
                CHINA PLANET
              </div>

              <div className="mt-0.5 text-[9px] tracking-[0.2em] text-[#a3978e]">
                TEAM CONTROL
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            {visibleNavigation.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "bg-[#b5966c] text-white"
                      : "text-[#786e65] hover:bg-[#f3f0eb] hover:text-[#40372f]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* USER */}
          <div className="flex items-center gap-3">
            <div className="hidden text-left sm:block">
              <div className="text-xs font-semibold text-[#40372f]">
                {userName}
              </div>

              <div className="mt-1 text-[9px] text-[#a3978e]">
                {roleNames[role] || role}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-[#ddd3ca] px-4 py-2 text-[10px] font-semibold text-[#786e65] transition hover:border-[#c8102e] hover:text-[#c8102e]"
            >
              خروج
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="border-t border-[#eee7e1] px-4 py-3 md:hidden">
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {visibleNavigation.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "bg-[#b5966c] text-white"
                      : "bg-[#f3f0eb] text-[#786e65]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* PAGE BAR */}
      <div className="border-b border-[#e2d9d1] bg-[#fffdf9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#d8795e]" />

            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#a3978e]">
              TEAM
            </span>

            <span className="text-[11px] text-[#b2a69d]">
              /
            </span>

            <span className="text-xs font-semibold text-[#786e65]">
              {currentNavigation?.label ||
                "لوحة الفريق"}
            </span>
          </div>

          <div className="hidden text-[10px] text-[#a3978e] sm:block">
            السعودية · الصين
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="min-h-[calc(100vh-125px)]">
        {children}
      </div>
    </div>
  );
}
