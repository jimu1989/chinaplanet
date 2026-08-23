"use client";

import { useCallback, useEffect, useState } from "react";

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

export default function TeamRequests({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setRequests(data.requests ?? []);
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

  if (!isAdmin) {
    return null;
  }

  const newRequests = requests.filter(
    (request) => request.status === "new"
  );

  return (
    <section className="mt-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#c94a3d]" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              SERVICE REQUESTS
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">طلبات العملاء</h2>

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
          <p className="text-lg font-bold">لا توجد طلبات حتى الآن</p>
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
                    <h3 className="text-xl font-bold">{request.name}</h3>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        request.status === "new"
                          ? "bg-[#c94a3d] text-white"
                          : "bg-[#f8f6f2] text-[#756c64]"
                      }`}
                    >
                      {request.status === "new" ? "جديد" : request.status}
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
                  {new Date(request.created_at).toLocaleString("ar-SA")}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-[#eee8e2] pt-5">
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
  );
}
