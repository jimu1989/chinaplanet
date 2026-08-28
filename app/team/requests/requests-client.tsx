"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

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

type FilterStatus = "all" | "new" | "contacted" | "completed" | "cancelled";

const statusLabels: Record<string, string> = {
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

function formatDate(value: string) {
  return new Date(value).toLocaleString("ar-SA", {
    calendar: "gregory",
    numberingSystem: "latn",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RequestsClient({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<FilterStatus>("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [notification, setNotification] =
    useState<ServiceRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const initializedRef = useRef(false);
  const knownIdsRef = useRef<Set<string>>(new Set());

  const loadRequests = useCallback(async (silent = false) => {
    try {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(
        "/api/team/service-requests",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("انتهت جلسة الفريق. أعد تسجيل الدخول.");
        }

        if (response.status === 403) {
          throw new Error("لا تملك صلاحية الوصول إلى الطلبات.");
        }

        throw new Error("تعذر تحميل الطلبات.");
      }

      const data = await response.json();
      const nextRequests: ServiceRequest[] =
        data.requests ?? [];

      if (!initializedRef.current) {
        knownIdsRef.current = new Set(
          nextRequests.map((request) => request.id)
        );

        initializedRef.current = true;
      } else {
        const newRequest = nextRequests.find(
          (request) =>
            !knownIdsRef.current.has(request.id) &&
            request.status === "new"
        );

        if (newRequest) {
          setNotification(newRequest);
        }

        knownIdsRef.current = new Set(
          nextRequests.map((request) => request.id)
        );
      }

      setRequests(nextRequests);
      setError("");
    } catch (err) {
      console.error("REQUESTS LOAD ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "تعذر تحميل الطلبات."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();

    const interval = window.setInterval(() => {
      loadRequests(true);
    }, 15000);

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

  const services = useMemo(() => {
    return Array.from(
      new Set(
        requests
          .map((request) => request.service)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "ar"));
  }, [requests]);

  const counts = useMemo(() => {
    return {
      all: requests.length,
      new: requests.filter(
        (request) => request.status === "new"
      ).length,
      contacted: requests.filter(
        (request) => request.status === "contacted"
      ).length,
      completed: requests.filter(
        (request) => request.status === "completed"
      ).length,
      cancelled: requests.filter(
        (request) => request.status === "cancelled"
      ).length,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "all" ||
        request.status === statusFilter;

      const matchesService =
        serviceFilter === "all" ||
        request.service === serviceFilter;

      const searchableText = [
        request.name,
        request.email,
        request.phone,
        request.service,
        request.details,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return (
        matchesStatus &&
        matchesService &&
        matchesSearch
      );
    });
  }, [
    requests,
    search,
    statusFilter,
    serviceFilter,
  ]);

  async function updateStatus(
    requestId: string,
    status: string
  ) {
    const previous = requests.find(
      (request) => request.id === requestId
    );

    if (!previous || previous.status === status) {
      return;
    }

    setUpdatingId(requestId);

    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );

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

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "الطلب غير موجود."
            : "تعذر تحديث حالة الطلب."
        );
      }
    } catch (err) {
      console.error("UPDATE REQUEST ERROR:", err);

      setRequests((current) =>
        current.map((request) =>
          request.id === requestId
            ? previous
            : request
        )
      );

      setError(
        err instanceof Error
          ? err.message
          : "تعذر تحديث حالة الطلب."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteRequest(requestId: string) {
    if (!isAdmin) {
      return;
    }

    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذه العملية."
    );

    if (!confirmed) {
      return;
    }

    const previous = requests;

    setRequests((current) =>
      current.filter(
        (request) => request.id !== requestId
      )
    );

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

      if (!response.ok) {
        throw new Error("تعذر حذف الطلب.");
      }
    } catch (err) {
      console.error("DELETE REQUEST ERROR:", err);

      setRequests(previous);

      setError(
        err instanceof Error
          ? err.message
          : "تعذر حذف الطلب."
      );
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] text-[#171717]"
    >
      {notification && (
        <div className="fixed inset-x-4 top-5 z-[100] mx-auto max-w-xl">
          <div className="rounded-[26px] border border-[#e4ddd5] bg-white p-5 shadow-[0_20px_70px_rgba(40,30,20,0.16)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c94a3d] text-xl font-bold text-white">
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
                    className="text-xl leading-none text-[#a69c93] transition hover:text-[#171717]"
                    aria-label="إغلاق التنبيه"
                  >
                    ×
                  </button>
                </div>

                <h3 className="mt-2 text-lg font-bold">
                  طلب جديد من {notification.name}
                </h3>

                <p className="mt-1 text-sm text-[#756c64]">
                  {notification.service}
                </p>

                {notification.phone && (
                  <a
                    href={`tel:${notification.phone}`}
                    dir="ltr"
                    className="mt-4 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46]"
                  >
                    {notification.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-[#e4ddd5] bg-white">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-5 px-5 py-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              CHINA PLANET
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              طلبات العملاء
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => loadRequests(true)}
              disabled={refreshing}
              className="rounded-full border border-[#e4ddd5] bg-[#f8f6f2] px-5 py-3 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white disabled:opacity-50"
            >
              {refreshing ? "جاري التحديث..." : "تحديث"}
            </button>

            <Link
              href="/team"
              className="rounded-full bg-[#171717] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#c94a3d]"
            >
              ← لوحة الفريق
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-5 pb-20">
        <section className="pt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(
              [
                ["all", "كل الطلبات"],
                ["new", "جديد"],
                ["contacted", "تم التواصل"],
                ["completed", "مكتمل"],
                ["cancelled", "ملغي"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key)}
                className={`rounded-[26px] border p-6 text-right transition ${
                  statusFilter === key
                    ? "border-[#171717] bg-[#171717] text-white"
                    : "border-[#e4ddd5] bg-white hover:-translate-y-0.5 hover:border-[#c94a3d]"
                }`}
              >
                <p
                  className={`text-xs font-semibold ${
                    statusFilter === key
                      ? "text-white/55"
                      : "text-[#a69c93]"
                  }`}
                >
                  {label}
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {counts[key]}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_auto]">
            <div>
              <label
                htmlFor="request-search"
                className="mb-2 block text-xs font-semibold text-[#756c64]"
              >
                البحث
              </label>

              <input
                id="request-search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="ابحث بالاسم، البريد، الجوال، الخدمة..."
                className="w-full rounded-2xl border border-[#e4ddd5] bg-[#f8f6f2] px-5 py-4 text-sm outline-none transition focus:border-[#c94a3d] focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="service-filter"
                className="mb-2 block text-xs font-semibold text-[#756c64]"
              >
                الخدمة
              </label>

              <select
                id="service-filter"
                value={serviceFilter}
                onChange={(event) =>
                  setServiceFilter(event.target.value)
                }
                className="w-full rounded-2xl border border-[#e4ddd5] bg-[#f8f6f2] px-5 py-4 text-sm outline-none focus:border-[#c94a3d]"
              >
                <option value="all">كل الخدمات</option>

                {services.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setServiceFilter("all");
                }}
                className="w-full rounded-2xl bg-[#f8f6f2] px-5 py-4 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white lg:w-auto"
              >
                مسح الفلاتر
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eee8e2] pt-5">
            <p className="text-xs text-[#8a8179]">
              عرض{" "}
              <span className="font-bold text-[#171717]">
                {filteredRequests.length}
              </span>{" "}
              من{" "}
              <span className="font-bold text-[#171717]">
                {requests.length}
              </span>{" "}
              طلب
            </p>

            {updatingId && (
              <p className="text-xs font-semibold text-[#2563eb]">
                جاري حفظ التغيير...
              </p>
            )}
          </div>
        </section>

        {error && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#f0d0cb] bg-[#fff7f5] px-5 py-4">
            <p className="text-sm text-[#c0392b]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-lg text-[#c0392b]"
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>
        )}

        <section className="mt-8">
          {loading ? (
            <div className="rounded-[32px] border border-[#e4ddd5] bg-white p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e4ddd5] border-t-[#c94a3d]" />
              <p className="mt-5 text-sm text-[#8a8179]">
                جاري تحميل الطلبات...
              </p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="rounded-[32px] border border-[#e4ddd5] bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f6f2] text-2xl">
                ✓
              </div>

              <h2 className="mt-5 text-xl font-bold">
                لا توجد طلبات مطابقة
              </h2>

              <p className="mt-3 text-sm text-[#8a8179]">
                جرّب تغيير البحث أو الفلاتر.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredRequests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-[32px] border border-[#e4ddd5] bg-white p-6 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:shadow-[0_20px_60px_rgba(40,30,20,0.07)] lg:p-8"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold">
                          {request.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                            statusClasses[request.status] ??
                            "bg-[#f8f6f2] text-[#756c64]"
                          }`}
                        >
                          {statusLabels[request.status] ??
                            request.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold text-[#554d46]">
                        {request.service}
                      </p>

                      <p className="mt-2 text-xs text-[#a69c93]">
                        {formatDate(request.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {request.phone && (
                        <a
                          href={`tel:${request.phone}`}
                          dir="ltr"
                          className="rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white"
                        >
                          ☎ {request.phone}
                        </a>
                      )}

                      {request.email && (
                        <a
                          href={`mailto:${request.email}`}
                          dir="ltr"
                          className="max-w-[260px] truncate rounded-full bg-[#f8f6f2] px-4 py-2 text-xs font-semibold text-[#554d46] transition hover:bg-[#171717] hover:text-white"
                        >
                          ✉ {request.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-[#eee8e2] pt-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#a69c93]">
                        SERVICE
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#171717]">
                        {request.service || "غير محدد"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#a69c93]">
                        LANGUAGE
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#171717]">
                        {(request.language || "—").toUpperCase()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#a69c93]">
                        REQUEST ID
                      </p>

                      <p
                        dir="ltr"
                        className="mt-2 truncate text-xs font-semibold text-[#171717]"
                      >
                        {request.id}
                      </p>
                    </div>
                  </div>

                  {request.details && (
                    <div className="mt-4 rounded-2xl border border-[#eee8e2] bg-white px-5 py-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#a69c93]">
                        CUSTOMER MESSAGE
                      </p>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#756c64]">
                        {request.details}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#eee8e2] pt-5">
                    <label className="text-xs font-semibold text-[#756c64]">
                      الحالة:
                    </label>

                    <select
                      value={request.status}
                      disabled={updatingId === request.id}
                      onChange={(event) =>
                        updateStatus(
                          request.id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-4 py-2 text-xs font-bold outline-none ${
                        statusClasses[request.status] ??
                        "bg-[#f8f6f2] text-[#756c64]"
                      } disabled:opacity-50`}
                    >
                      <option value="new">جديد</option>
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

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() =>
                          deleteRequest(request.id)
                        }
                        className="rounded-full bg-[#c94a3d] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#a9362b]"
                      >
                        حذف الطلب
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
