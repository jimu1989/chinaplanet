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

const statusSelectStyles = `
  .status-select[data-status="new"] {
    background: #fff3e0;
    color: #c46a00;
  }
  .status-select[data-status="contacted"] {
    background: #e8f1ff;
    color: #2563eb;
  }
  .status-select[data-status="completed"] {
    background: #e8f7ee;
    color: #16834b;
  }
  .status-select[data-status="cancelled"] {
    background: #fdeaea;
    color: #c0392b;
  }
`;

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
      setError("تعذر تحميل طلبات العملاء.");
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
    if (!notification) {
      return;
    }

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

  return (
    <>
      <style>{statusSelectStyles}</style>
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

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#f8f6f2] px-5 py-3 text-xs font-semibold text-[#554d46]">
              إجمالي الطلبات: {requests.length}
            </div>

            <div className="rounded-full bg-[#171717] px-5 py-3 text-xs font-semibold text-white">
              جديد: {newRequests.length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 text-sm text-[#8a8179]">
            جاري تحميل الطلبات...
          </div>
        ) : error ? (
          <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 text-sm text-[#c94a3d]">
            {error}
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
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold">
                        {request.name}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                          request.status === "new"
                            ? "bg-[#fff3e0] text-[#c46a00]"
                            : request.status === "contacted"
                              ? "bg-[#e8f1ff] text-[#2563eb]"
                              : request.status === "completed"
                                ? "bg-[#e8f7ee] text-[#16834b]"
                                : request.status === "cancelled"
                                  ? "bg-[#fdeaea] text-[#c0392b]"
                                  : "bg-[#f8f6f2] text-[#756c64]"
                        }`}
                      >
                        {request.status === "new"
                          ? "جديد"
                          : request.status}
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
                    {new Date(request.created_at).toLocaleString("ar-SA", {
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
                    data-status={request.status}
                    value={request.status}
                    onChange={async (event) => {
                      const status = event.target.value;

                      const response = await fetch(
                        "/api/team/service-requests",
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            id: request.id,
                            status,
                          }),
                        }
                      );

                      if (response.ok) {
                        setRequests((current) =>
                          current.map((item) =>
                            item.id === request.id
                              ? { ...item, status }
                              : item
                          )
                        );
                      } else if (response.status === 404) {
                        setRequests((current) =>
                          current.filter((item) => item.id !== request.id)
                        );
                        setError("هذا الطلب لم يعد موجودًا.");
                      } else {
                        setError("تعذر تحديث حالة الطلب.");
                      }
                    }}
                    className="rounded-full px-4 py-2 text-xs font-semibold transition"
                    style={{
                      color:
                        request.status === "contacted"
                          ? "#2563eb"
                          : request.status === "completed"
                            ? "#16834b"
                            : request.status === "cancelled"
                              ? "#c0392b"
                              : "#c46a00",
                    }}
                  >
                    <option value="new" className="bg-[#fff3e0] text-[#c46a00]">
                      جديد
                    </option>
                    <option value="contacted" className="bg-[#e8f1ff] text-[#2563eb]">
                      تم التواصل
                    </option>
                    <option value="completed" className="bg-[#e8f7ee] text-[#16834b]">
                      مكتمل
                    </option>
                    <option value="cancelled" className="bg-[#fdeaea] text-[#c0392b]">
                      ملغي
                    </option>
                  </select>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm("هل تريد حذف هذا الطلب؟")) return;

                        const response = await fetch(
                          "/api/team/service-requests",
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id: request.id }),
                          }
                        );

                        if (response.ok) {
                          setRequests((current) =>
                            current.filter((item) => item.id !== request.id)
                          );
                        }
                      }}
                      className="rounded-full bg-[#c94a3d] px-4 py-2 text-xs font-semibold text-white"
                    >
                      حذف
                    </button>
                  )}
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
                      className="rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white"
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