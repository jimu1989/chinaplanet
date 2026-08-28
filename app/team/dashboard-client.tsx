"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  stats: {
    total: number;
    new: number;
    contacted: number;
    completed: number;
    cancelled: number;
    members: number;
  };
  services: {
    service: string;
    count: number;
  }[];
  recentRequests: {
    id: string;
    name: string;
    service: string;
    status: string;
    created_at: string;
  }[];
};

const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export default function TeamDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/team/dashboard", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "تعذر تحميل البيانات.");
        }

        setData(result);
      } catch (error) {
        console.error("DASHBOARD LOAD ERROR:", error);
        setError("تعذر تحميل بيانات لوحة التحكم.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="mt-10">
        <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-10 text-center">
          <p className="text-sm text-[#8a8179]">
            جاري تحميل لوحة التحكم...
          </p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="mt-10">
        <div className="rounded-[30px] border border-[#ead5d2] bg-white p-10 text-center">
          <p className="font-semibold text-[#c94a3d]">
            {error || "تعذر تحميل البيانات."}
          </p>
        </div>
      </section>
    );
  }

  const cards = [
    {
      label: "إجمالي الطلبات",
      value: data.stats.total,
      description: "آخر 50 طلبًا",
    },
    {
      label: "طلبات جديدة",
      value: data.stats.new,
      description: "تحتاج متابعة",
    },
    {
      label: "تم التواصل",
      value: data.stats.contacted,
      description: "طلبات تمت متابعتها",
    },
    {
      label: "مكتملة",
      value: data.stats.completed,
      description: "طلبات منتهية",
    },
    {
      label: "ملغاة",
      value: data.stats.cancelled,
      description: "طلبات ملغاة",
    },
    {
      label: "أعضاء الفريق",
      value: data.stats.members,
      description: "حسابات الفريق",
    },
  ];

  const maxServiceCount = Math.max(
    ...data.services.map((item) => item.count),
    1
  );

  return (
    <section className="mt-10">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[#c94a3d]" />
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
            DASHBOARD
          </span>
        </div>

        <h2 className="mt-5 text-3xl font-bold">
          نظرة سريعة
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
          ملخص مباشر لأهم أرقام وطلبات فريق كوكب الصين.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]"
          >
            <p className="text-xs font-semibold text-[#8a8179]">
              {card.label}
            </p>

            <p className="mt-4 text-4xl font-bold text-[#171717]">
              {card.value}
            </p>

            <p className="mt-3 text-[11px] text-[#a69c93]">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">
                أحدث الطلبات
              </h3>

              <p className="mt-2 text-xs text-[#a69c93]">
                آخر الطلبات الواردة
              </p>
            </div>

            <span className="rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#756c64]">
              {data.recentRequests.length} طلب
            </span>
          </div>

          <div className="mt-6 divide-y divide-[#eee8e2]">
            {data.recentRequests.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#8a8179]">
                لا توجد طلبات حتى الآن.
              </p>
            ) : (
              data.recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {request.name}
                    </p>

                    <p className="mt-1 text-xs text-[#8a8179]">
                      {request.service}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        request.status === "new"
                          ? "bg-[#fff3e0] text-[#c46a00]"
                          : request.status === "contacted"
                            ? "bg-[#e8f1ff] text-[#2563eb]"
                            : request.status === "completed"
                              ? "bg-[#e8f7ee] text-[#16834b]"
                              : "bg-[#fdeaea] text-[#c0392b]"
                      }`}
                    >
                      {statusLabels[request.status] || request.status}
                    </span>

                    <span className="text-[10px] text-[#a69c93]">
                      {new Date(request.created_at).toLocaleDateString(
                        "ar-SA",
                        {
                          calendar: "gregory",
                          numberingSystem: "latn",
                        }
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-7">
          <h3 className="text-xl font-bold">
            توزيع الخدمات
          </h3>

          <p className="mt-2 text-xs text-[#a69c93]">
            أكثر الخدمات طلبًا
          </p>

          <div className="mt-7 space-y-6">
            {data.services.length === 0 ? (
              <p className="text-sm text-[#8a8179]">
                لا توجد بيانات كافية.
              </p>
            ) : (
              data.services.map((item) => {
                const width =
                  (item.count / maxServiceCount) * 100;

                return (
                  <div key={item.service}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold">
                        {item.service}
                      </span>

                      <span className="text-xs text-[#8a8179]">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#f0ece7]">
                      <div
                        className="h-full rounded-full bg-[#171717] transition-all"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[30px] bg-[#171717] p-8 text-white">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#b5966c]">
          TEAM OVERVIEW
        </p>

        <h3 className="mt-4 text-2xl font-bold">
          لوحة التحكم جاهزة للعمل
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          البيانات المعروضة هنا مرتبطة مباشرة بطلبات العملاء
          وأعضاء الفريق في Supabase.
        </p>
      </div>
    </section>
  );
}
