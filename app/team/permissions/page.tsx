"use client";

import { useEffect, useState } from "react";

type Permission = {
  id: number;
  role: string;
  permission: string;
  enabled: boolean;
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

const permissionNames: Record<string, string> = {
  manage_team: "إدارة الفريق",
  manage_permissions: "إدارة الصلاحيات",
  manage_project: "إدارة المشروع",
};

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [error, setError] = useState("");

  const loadPermissions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/team/permissions", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "تعذر تحميل الصلاحيات."
        );
      }

      setPermissions(data.permissions || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "تعذر تحميل الصلاحيات."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await loadPermissions();
    };

    void load();
  }, []);

  const togglePermission = async (permission: Permission) => {
    try {
      setSaving(permission.id);
      setError("");

      const response = await fetch(
        "/api/team/permissions",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: permission.id,
            enabled: !permission.enabled,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "تعذر تحديث الصلاحية."
        );
      }

      setPermissions((current) =>
        current.map((item) =>
          item.id === permission.id
            ? { ...item, enabled: !item.enabled }
            : item
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "تعذر تحديث الصلاحية."
      );
    } finally {
      setSaving(null);
    }
  };

  const groupedPermissions = Object.keys(roleNames).map(
    (role) => ({
      role,
      name: roleNames[role],
      permissions: permissions.filter(
        (item) => item.role === role
      ),
    })
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-[#171717] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#c94a3d]" />

            <span className="text-[10px] font-semibold tracking-[0.22em] text-[#a69c93]">
              TEAM PERMISSIONS
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
            إدارة الصلاحيات
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#756c64]">
            تحكم في الصلاحيات الممنوحة لكل دور داخل فريق
            كوكب الصين من مكان واحد.
          </p>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-[#e8c7bd] bg-[#fff8f5] px-5 py-4 text-sm text-[#a9362b]">
            {error}
          </div>
        )}

        {/* CONTENT */}
        <section className="overflow-hidden rounded-3xl border border-[#e4ddd5] bg-[#ffffff] shadow-[0_20px_60px_rgba(64,55,47,0.06)]">
          <div className="border-b border-[#e4ddd5] px-6 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-medium">
                  صلاحيات أعضاء الفريق
                </h2>

                <p className="mt-2 text-xs leading-6 text-[#8a8179]">
                  فعّل أو عطّل الصلاحيات حسب الدور الوظيفي.
                </p>
              </div>

              <button
                type="button"
                onClick={loadPermissions}
                className="rounded-full border border-[#e4ddd5] px-5 py-2.5 text-xs font-semibold text-[#171717] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
              >
                تحديث
              </button>
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-sm text-[#8a8179]">
              جاري تحميل الصلاحيات...
            </div>
          ) : (
            <div className="divide-y divide-[#e4ddd5]">
              {groupedPermissions.map((group) => (
                <div
                  key={group.role}
                  className="px-6 py-7 sm:px-8"
                >
                  <div className="mb-5">
                    <h3 className="text-base font-semibold">
                      {group.name}
                    </h3>

                    <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[#a69c93]">
                      {group.role}
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {Object.entries(permissionNames).map(
                      ([permissionKey, permissionName]) => {
                        const item =
                          group.permissions.find(
                            (permission) =>
                              permission.permission ===
                              permissionKey
                          );

                        if (!item) {
                          return (
                            <div
                              key={permissionKey}
                              className="rounded-2xl border border-dashed border-[#e4ddd5] px-4 py-4 opacity-50"
                            >
                              <span className="text-sm">
                                {permissionName}
                              </span>

                              <span className="mt-1 block text-[10px] text-[#a69c93]">
                                غير مضافة
                              </span>
                            </div>
                          );
                        }

                        return (
                          <button
                            key={permissionKey}
                            type="button"
                            disabled={saving === item.id}
                            onClick={() =>
                              togglePermission(item)
                            }
                            className={`group flex items-center justify-between rounded-2xl border px-4 py-4 text-right transition-all ${
                              item.enabled
                                ? "border-[#e5c8bd] bg-[#fff8f5]"
                                : "border-[#e4ddd5] bg-transparent hover:border-[#cfc3b9]"
                            }`}
                          >
                            <div>
                              <span className="block text-sm font-medium">
                                {permissionName}
                              </span>

                              <span className="mt-1 block text-[10px] text-[#8a8179]">
                                {item.enabled
                                  ? "مفعلة"
                                  : "غير مفعلة"}
                              </span>
                            </div>

                            <span
                              className={`relative h-6 w-11 rounded-full transition ${
                                item.enabled
                                  ? "bg-[#c94a3d]"
                                  : "bg-[#e4ddd5]"
                              }`}
                            >
                              <span
                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                                  item.enabled
                                    ? "right-1"
                                    : "right-6"
                                }`}
                              />
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-[10px] text-[#a69c93]">
          CHINA PLANET · TEAM CONTROL
        </p>
      </div>
    </main>
  );
}
