"use client";

import Image from "next/image";
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
        if (mounted) {
          setLoading(false);
        }

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

      if (!mounted) {
        return;
      }

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
        className="flex min-h-screen items-center justify-center bg-[#f7f4ee]"
      >
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c94a3d] border-t-transparent" />

          <p className="mt-4 text-xs text-[#756c64]">
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
      className="min-h-screen bg-[#f7f4ee] text-[#171717]"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#e4ddd5] bg-[#ffffff]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          {/* LOGO */}
          <Link
            href="/team"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/images/china-planet-logo.png"
              alt="China Planet"
              width={200}
              height={70}
              className="h-auto w-[150px] object-contain sm:w-[180px] lg:w-[200px]"
            />

            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-wide text-[#171717]">
                CHINA PLANET
              </div>

              <div className="mt-0.5 text-[9px] tracking-[0.2em] text-[#a69c93]">
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
                      : "text-[#756c64] hover:bg-[#f7f4ee] hover:text-[#171717]"
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
              <div className="text-xs font-semibold text-[#171717]">
                {userName}
              </div>

              <div className="mt-1 text-[9px] text-[#a69c93]">
                {roleNames[role] || role}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-[#e4ddd5] px-4 py-2 text-[10px] font-semibold text-[#756c64] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
            >
              خروج
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="border-t border-[#eee8e2] px-4 py-3 md:hidden">
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
                      : "bg-[#f7f4ee] text-[#756c64]"
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
      <div className="border-b border-[#e4ddd5] bg-[#ffffff]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#c94a3d]" />

            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#a69c93]">
              TEAM
            </span>

            <span className="text-[11px] text-[#a69c93]">
              /
            </span>

            <span className="text-xs font-semibold text-[#756c64]">
              {currentNavigation?.label ||
                "لوحة الفريق"}
            </span>
          </div>

          <div className="hidden text-[10px] text-[#a69c93] sm:block">
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