/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ServiceRequest = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string;
  details: string | null;
  language: string;
  status: string;
  created_at: string;
};

const statusLabel: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const statusClasses: Record<string, string> = {
  new: "bg-[#fff3e0] text-[#c46a00]",
  contacted: "bg-[#e8f1ff] text-[#2563eb]",
  completed: "bg-[#e8f7ee] text-[#16834b]",
  cancelled: "bg-[#fdeaea] text-[#c0392b]",
};

export default function TeamRequests({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] =
    useState<ServiceRequest | null>(null);

  const initializedRef = useRef(false);
  const knownRequestIdsRef = useRef<Set<string>>(new Set());

  const loadRequests = useCallback(async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/team/service-requests", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load requests");
      }

      const data = await response.json();
      const nextRequests: ServiceRequest[] = data.requests ?? [];

      if (!initializedRef.current) {
        knownRequestIdsRef.current = new Set(
          nextRequests.map((request) => request.id)
        );

        initializedRef.current = true;
      } else {
        const newRequest = nextRequests.find(
          (request) =>
            !knownRequestIdsRef.current.has(request.id) &&
            request.status === "new"
        );

        if (newRequest) {
          setNotification(newRequest);
        }

        knownRequestIdsRef.current = new Set(
          nextRequests.map((request) => request.id)
        );
      }

      setRequests(nextRequests);
      setError("");
    } catch (error) {
      console.error("TEAM REQUESTS LOAD ERROR:", error);
      setError("تعذر تحميل طلبات العملاء. أعد تسجيل الدخول.");
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadRequests();

    const interval = window.setInterval(loadRequests, 15000);

    return () => window.clearInterval(interval);
  }, [loadRequests]);

  useEffect(() => {
    if (!notification) return;

    const timeout = window.setTimeout(() => {
      setNotification(null);
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, [notification]);

  if (!isAdmin) {
    return null;
  }

  const newRequests = requests.filter(
    (request) => request.status === "new"
  );

  const contactedRequests = requests.filter(
    (request) => request.status === "contacted"
  );

  const completedRequests = requests.filter(
    (request) => request.status === "completed"
  );

  const cancelledRequests = requests.filter(
    (request) => request.status === "cancelled"
  );

  const completionRate =
    requests.length > 0
      ? Math.round(
          (completedRequests.length / requests.length) * 100
        )
      : 0;

  const recentRequests = requests.slice(0, 5);

  const serviceCounts = requests.reduce<Record<string, number>>(
    (acc, request) => {
      const service = request.service || "غير محدد";
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    },
    {}
  );

  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxServiceCount =
    topServices.length > 0
      ? Math.max(...topServices.map(([, count]) => count))
      : 1;

  async function updateStatus(
    requestId: string,
    status: string
  ) {
    try {
      const response = await fetch(
        "/api/team/service-requests",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: requestId,
            status,
          }),
        }
      );

      if (response.ok) {
        setRequests((current) =>
          current.map((item) =>
            item.id === requestId
              ? { ...item, status }
              : item
          )
        );

        setError("");
      } else if (response.status === 404) {
        setRequests((current) =>
          current.filter((item) => item.id !== requestId)
        );

        setError("هذا الطلب لم يعد موجودًا.");
      } else {
        setError("تعذر تحديث حالة الطلب.");
      }
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);
      setError("حدث خطأ أثناء تحديث حالة الطلب.");
    }
  }

  async function deleteRequest(requestId: string) {
    if (!confirm("هل تريد حذف هذا الطلب؟")) {
      return;
    }

    try {
      const response = await fetch(
        "/api/team/service-requests",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: requestId,
          }),
        }
      );

      if (response.ok) {
        setRequests((current) =>
          current.filter((item) => item.id !== requestId)
        );

        setError("");
      } else {
        const data = await response.json().catch(() => null);

        setError(
          data?.error || "تعذر حذف الطلب."
        );
      }
    } catch (error) {
      console.error("DELETE REQUEST ERROR:", error);
      setError("حدث خطأ أثناء حذف الطلب.");
    }
  }

  return (
    <>
      {notification && (
        <div className="fixed inset-x-4 top-5 z-[100] mx-auto max-w-xl">
          <div className="rounded-[24px] border border-[#e4ddd5] bg-white p-5 shadow-[0_20px_70px_rgba(40,30,20,0.16)]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#c94a3d] text-lg text-white">
                !
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#a69c93]">
                    NEW SERVICE REQUEST
                  </p>

                  <button
                    type="button"
                    onClick={() => setNotification(null)}
                    className="text-lg leading-none text-[#a69c93] transition hover:text-[#171717]"
                    aria-label="إغلاق التنبيه"
                  >
                    ×
                  </button>
                </div>

                <h3 className="mt-2 text-lg font-bold text-[#171717]">
                  طلب جديد من {notification.name}
                </h3>

                <p className="mt-1 text-sm text-[#756c64]">
                  {notification.service}
                </p>

                <p className="mt-3 text-xs leading-6 text-[#9a9087]">
                  وصل طلب جديد من نموذج التواصل.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#c94a3d]" />

            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              OVERVIEW
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            نظرة سريعة
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
            ملخص مباشر لحالة طلبات العملاء داخل كوكب الصين.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 text-sm text-[#8a8179]">
            جاري تحميل بيانات لوحة التحكم...
          </div>
        ) : error && requests.length === 0 ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 text-sm text-[#c94a3d]">
            {error}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-xs text-[#8a8179]">
                  إجمالي الطلبات
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {requests.length}
                </p>

                <p className="mt-2 text-xs text-[#a69c93]">
                  جميع الطلبات
                </p>
              </div>

              <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-xs text-[#8a8179]">
                  طلبات جديدة
                </p>

                <p className="mt-4 text-4xl font-bold text-[#c46a00]">
                  {newRequests.length}
                </p>

                <p className="mt-2 text-xs text-[#a69c93]">
                  تحتاج متابعة
                </p>
              </div>

              <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-xs text-[#8a8179]">
                  تم التواصل
                </p>

                <p className="mt-4 text-4xl font-bold text-[#2563eb]">
                  {contactedRequests.length}
                </p>

                <p className="mt-2 text-xs text-[#a69c93]">
                  قيد المتابعة
                </p>
              </div>

              <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-xs text-[#8a8179]">
                  مكتملة
                </p>

                <p className="mt-4 text-4xl font-bold text-[#16834b]">
                  {completedRequests.length}
                </p>

                <p className="mt-2 text-xs text-[#a69c93]">
                  طلبات منجزة
                </p>
              </div>

              <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-xs text-[#8a8179]">
                  نسبة الإنجاز
                </p>

                <p className="mt-4 text-4xl font-bold">
                  {completionRate}%
                </p>

                <p className="mt-2 text-xs text-[#a69c93]">
                  {cancelledRequests.length} طلب ملغي
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a69c93]">
                      RECENT
                    </p>

                    <h3 className="mt-3 text-xl font-bold">
                      آخر الطلبات
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#756c64]">
                    {recentRequests.length}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {recentRequests.length === 0 ? (
                    <p className="py-5 text-sm text-[#8a8179]">
                      لا توجد طلبات حتى الآن.
                    </p>
                  ) : (
                    recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8f6f2] px-4 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#40372f]">
                            {request.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-[#8a8179]">
                            {request.service}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold ${
                            statusClasses[request.status] ||
                            "bg-[#f1efeb] text-[#756c64]"
                          }`}
                        >
                          {statusLabel[request.status] ||
                            request.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a69c93]">
                  SERVICES
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  توزيع الخدمات
                </h3>

                <div className="mt-7 space-y-5">
                  {topServices.length === 0 ? (
                    <p className="text-sm text-[#8a8179]">
                      لا توجد بيانات كافية.
                    </p>
                  ) : (
                    topServices.map(([service, count]) => {
                      const percentage = Math.round(
                        (count / maxServiceCount) * 100
                      );

                      return (
                        <div key={service}>
                          <div className="mb-2 flex items-center justify-between gap-4">
                            <span className="truncate text-sm font-semibold text-[#554d46]">
                              {service}
                            </span>

                            <span className="text-xs font-bold text-[#8a8179]">
                              {count}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-[#eee8e2]">
                            <div
                              className="h-full rounded-full bg-[#171717] transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mt-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#c94a3d]" />

              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                SERVICE REQUESTS
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              طلبات العملاء
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
              أحدث الطلبات الواردة من نموذج التواصل في الموقع.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-[#f8f6f2] px-5 py-3 text-xs font-semibold text-[#554d46]">
              إجمالي الطلبات: {requests.length}
            </div>

            <div className="rounded-full bg-[#171717] px-5 py-3 text-xs font-semibold text-white">
              جديد: {newRequests.length}
            </div>
          </div>
        </div>

        {error && requests.length > 0 && (
          <div className="mb-5 rounded-2xl border border-[#f0d0ca] bg-[#fff7f5] p-4 text-sm text-[#c94a3d]">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 text-sm text-[#8a8179]">
            جاري تحميل الطلبات...
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-10 text-center">
            <p className="text-lg font-bold">
              لا توجد طلبات حتى الآن
            </p>

            <p className="mt-3 text-sm text-[#8a8179]">
              ستظهر هنا طلبات العملاء الجديدة تلقائيًا.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-[30px] border border-[#e4ddd5] bg-white p-7 shadow-[0_15px_50px_rgba(40,30,20,0.04)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">
                        {request.name}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                          statusClasses[request.status] ||
                          "bg-[#f8f6f2] text-[#756c64]"
                        }`}
                      >
                        {statusLabel[request.status] ||
                          request.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#554d46]">
                      {request.service}
                    </p>

                    {request.details && (
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#8a8179]">
                        {request.details}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 rounded-2xl bg-[#f8f6f2] px-5 py-4 text-xs text-[#756c64]">
                    {new Date(
                      request.created_at
                    ).toLocaleString("ar-SA", {
                      calendar: "gregory",
                      numberingSystem: "latn",
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-[#eee8e2] pt-5">
                  <select
                    value={request.status}
                    onChange={(event) =>
                      updateStatus(
                        request.id,
                        event.target.value
                      )
                    }
                    className={`rounded-full px-4 py-2 text-xs font-semibold outline-none ${
                      statusClasses[request.status] ||
                      "bg-[#f8f6f2] text-[#756c64]"
                    }`}
                  >
                    <option value="new">
                      جديد
                    </option>

                    <option value="contacted">
                      تم التواصل
                    </option>

                    <option value="completed">
                      مكتمل
                    </option>

                    <option value="cancelled">
                      ملغي
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      deleteRequest(request.id)
                    }
                    className="rounded-full bg-[#c94a3d] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    حذف
                  </button>

                  {request.phone && (
                    <a
                      href={`tel:${request.phone}`}
                      dir="ltr"
                      className="rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white"
                    >
                      {request.phone}
                    </a>
                  )}

                  {request.email && (
                    <a
                      href={`mailto:${request.email}`}
                      dir="ltr"
                      className="max-w-full truncate rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white"
                    >
                      {request.email}
                    </a>
                  )}

                  <span className="rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#756c64]">
                    {request.language.toUpperCase()}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
